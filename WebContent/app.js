(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ngDragDrop' , 'ngDraggable',
        	'ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 
        	'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 
        	'ui.grid.importer', 'ui.grid.grouping', 'ng-fusioncharts', 'ui.bootstrap',
        	'ngSanitize', 'ui.select', 'ui.bootstrap.modal'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/transfer', {
                controller: 'TransferController',
                templateUrl: 'transfer/transfer.view.html',
                controllerAs: 'vm'
            })
            .when('/accounts', {
                controller: 'AccountsController',
                templateUrl: 'accounts/accounts.view.html',
                controllerAs: 'vm'
            })
            .when('/makeTransfer', {
            	 controller: 'TransferController',
                 templateUrl: 'transfer/transferMoney.view.html',
                controllerAs: 'vm'
            })
            
            .when('/profile', {
                controller: 'HomeController',
                templateUrl: 'home/profile.view.html',
                controllerAs: 'vm'
            })

            
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();