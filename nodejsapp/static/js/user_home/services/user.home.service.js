(function () {
    'use strict';
    angular
	.module('user.home.services')
	.factory('UserDetails', UserDetails);

    UserDetails.$inject = ['$cookies', '$http'];

    function UserDetails($cookies, $http){
	var UserDetails = {
	    getDetails : getDetails,
	    editProfile:editProfile,
	    profile:{},
	}

	return UserDetails;

	function getDetails(user_id){
	    var request = $http({
		url: 'http://localhost:8000/user/'+user_id+'/',
		datatype: 'json',
		method : 'GET',
	
	    });
	    request.then(fetchDetailSuccess,fetchDetailError);

	    function fetchDetailSuccess(response){
		console.log("fetch details success",response.data)
		UserDetails.profile=response.data;
	    }

	    function fetchDetailError(data, status, headers, config){
		console.log("fetch details failed")
	    }
	}
	function editProfile(userdetails){
	    var request = $http({
		url: 'http://localhost:8000/user/'+userdetails.id+'/',
		datatype: 'json',
		method : 'PUT',
		data:userdetails,
	
	    });
	    request.then(editProfileSuccess,editProfileError);

	    function editProfileSuccess(response){
		console.log("Update Successful",response.data)
	    }

	    function editProfileError(data, status, headers, config){
		console.log("update failed")
	    }
	}
    }
}
)();
