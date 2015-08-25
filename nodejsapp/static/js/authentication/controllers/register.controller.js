/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
(function () {
    'use strict';

    angular
        .module('user.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication','$cookies'];

      /**
  * @namespace RegisterController
  */
    function RegisterController($location, $scope, Authentication, $cookies) {
	if($cookies.getObject("authenticatedAccount"))
	    $location.url('/user/home');
	 console.log("Register");
	 $scope.Authentication=Authentication
	 $scope.flag=true
	 console.log("calling flag value by getflag() : ", Authentication.getFlag())
	 $scope.test= function()
	 {
	     console.log("test");
	 }
	$scope.register = function() {
		Authentication.register($scope.firstname, $scope.lastname,  $scope.contact, $scope.email, $scope.password, false, false);
	    activate();
	}
	

	/**
	 * @name activate
	 * @desc Actions to be performed when this controller is instantiated
	 * @memberOf thinkster.authentication.controllers.RegisterController
	 */
	function activate() {
		
	    // If the user is authenticated, they should not be here.
	    if (Authentication.isAuthenticated()) {
		console.log("activated User")
		$location.url('/home');
	    }
	}
	
	 
     }
})();
	

	    /**
    * @name register
    * @desc Register a new user
    * @memberOf thinkster.authentication.controllers.RegisterController
      
   	function register() {
	    alert("okokokok")
	    console.log("okokokokok")
	    Authentication.register(rc.firstname, rc.lastname, rc.email, rc.password);
	  }*/ 
	
