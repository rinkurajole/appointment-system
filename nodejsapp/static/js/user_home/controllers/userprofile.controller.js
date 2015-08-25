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
	$scope.editTab=1;
	$scope.EditTab= function(editTab)
	{
	    if(editTab==1){
		$scope.editTab=2;
	    }
	    else if(editTab==2){
		$scope.editTab=3;
	    }
	    else{
		$scope.editTab=1;
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
