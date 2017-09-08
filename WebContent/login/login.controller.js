(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$http'];
    function LoginController($location, AuthenticationService, FlashService, $http) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            /*AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });*/
            var Indata = {'email': vm.username, 'password': vm.password };
        	console.log(vm.username,vm.password)
        	
            $http.post('http://localhost:8080/clogin/',Indata)
  		   .then(function (response) {
  		    var data = response.data;
  		    AuthenticationService.SetCredentials(data.userDetails.username, data.userDetails.password, data.userDetails.email);
  		    $location.path('/');
  		    console.log(data);
  		 }).catch(function (err) {console.log(err)});
        };
    }

})();
