/**
* LoginController
* @namespace user.authentication.controllers
*/
(function () {
    'use strict';

    angular
        .module('user.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

      /**
  * @namespace LoginController
  */
    function LoginController($location, $scope, Authentication) {
	console.log("hiii")
	var vm = this;
	vm.login = login;
	$scope.login_error_message="* Username and password not matching"
	$scope.Authentication=Authentication
	activate();
	console.log("logincontroller end")

	    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
	function activate() {
	    // If the user is authenticated, they should not be here.
	    if (Authentication.isAuthenticated()) {
		$location.url('/');
	    }
	    else{
	
	    }
	}

	    /**
    * @name login

    * @desc Log the user in if not then show login error 
    * @memberOf thinkster.authentication.controllers.LoginController
    */
	function login() {
	    Authentication.login(vm.email, vm.password);
	}
    }
})();
