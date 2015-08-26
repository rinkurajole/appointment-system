/**
* Userprofile controller
*/
(function () {
    'use strict';

    angular
        .module('user.home.controllers')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = [ '$scope', 'UserDetails', '$cookies'];
      /**
  * @namespace UserProfileController
  */
    function UserProfileController( $scope, UserDetails, $cookies) {
	console.log("user details");
	$scope.UserDetails=UserDetails
	$scope.editTab=false;
	$scope.EditTab= function()
	{
	    if($scope.editTab==false){
		$scope.editTab=true;
	    }
	    else{
		$scope.editTab=false;
	    }
	}
	var user_id=$cookies.getObject('authenticatedAccount')['id'];
	console.log("user id",user_id)
	UserDetails.getDetails(user_id)
	$scope.edit=function(){
	    UserDetails.editProfile(UserDetails.profile);
	    $scope.EditTab();
	}
     }
})();
