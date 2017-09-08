(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            /*UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });*/
            var Indata = 
		            { 
		                "name": vm.user.firstName,
		                "email":vm.user.username,
		                "address":"abc",
		                "phoneNo":"1234",
		                "password":vm.user.username
		            };
        	console.log(username,password)
        	
            $http.post('http://18.220.138.212:8080/csignup/',Indata)
  		   .then(function (response) {
  		    var data = response.data;
  		    FlashService.Success('Registration successful', true);
            $location.path('/login');
  		    console.log(data);
  		 }).catch(function (err) {
  			FlashService.Error(response.message);
            vm.dataLoading = false;
  			 console.log(err);
  			 });
        }
    }

})();
