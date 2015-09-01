(function () {
    'use strict';
    angular
	.module('forgot.password')
	.factory('UpdatePassword', UpdatePassword);

     UpdatePassword.$inject = ['$http'];

    function  UpdatePassword($http){
	var  UpdatePassword = {
	    update: update
	}

	return  UpdatePassword;

	function update(id,password){
	    return $http({
		url: 'http://localhost:8000/user/'+id+"/",
		datatype: 'json',
		method : 'PATCH',
		data:{
		    password: password
		}
	    }).then(updateSuccess,updateError);
	    function updateSuccess(data, status, headers, config) {
		console.log(data.data)
		alert("password updated successfully..");
		window.location = '/login'
	    }
	}
	function updateError(data, status, headers, config) {
	    console.log('failed')

	}
    }
})();
