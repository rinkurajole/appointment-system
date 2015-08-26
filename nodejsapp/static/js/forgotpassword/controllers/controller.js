
(function () {
    'use strict';

    angular
        .module('forgot.password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$http']

    /**
     * @namespace ForgotPasswordController
     */
    function ForgotPasswordController($http) {
	var vm = this;
	var id;
	
	vm.sendEmail = function(){

	    $http({
		url: 'http://localhost:8000/user/me/'+vm.email,
		dataType: 'json',
		method: 'GET',
		headers: {
		    "Content-Type": "application/json"
		}
	    }).then(userDetailsSuccessFn, UserDetailsErrorFn);

	    /**
	     * @name userDetailsSuccessFn
	     * @desc fetch userid for resetting password
	     */
	    function userDetailsSuccessFn(response) {
		console.log("Data : ", response.data ,"Status :" ,response.status , "headers : ",response.headers, "config : ", response.config)
		id = response.data.id;
		var to = vm.email
		var rand=Math.random().toString(36).slice(2);
		var link = '/reset_password?id='+id+'&pat='+rand;
		var subject = "Link for resetting password";
		var body = "Hello,<br> To reset your password, Please Click on the given link."
		vm.message = "Sending E-mail...Please wait";
		$http({
	    	    url: '/send',
	    	    method: 'get',
	    	    params: {to: to, link: link, id: id, rand: rand, subject: subject, body: body}
		}).then(mailSuccessFn, mailErrorFn);

		/**
		 * @name mailSuccessFn
		 * @desc Log Server Response to the console
		 */
		function mailSuccessFn(response) {
	    	    console.log("Data : ", response.data ,"Status :" ,response.status , "headers : ",response.headers, "config : ", response.config)
	    	    if(response.data=="sent")
	    	    {
	    		vm.message = "Email is been sent at "+to+" . Please check inbox !";
	    	    }
	    	    else if(response.data=="error")
	    	    {
	    		vm.message = "Error while sending mail.Please check E-mail Id or network and try again.";
	    	    }
		}

		/**
		 * @name mailErrorFn
		 * @desc Log Server Response to the console
		 */
		function mailErrorFn(data, status, headers, config) {
	    	    vm.message = "please enter valid email id!!!";
	    	    console.log("Server failure message- "+data.data.name);
		}
		
	    }

	    /**
	     * @name userDetailsErrorFn
	     * @desc log server response to the console
	     */
	    function UserDetailsErrorFn(response) {
		console.log("Failed to fetch user details.");
		console.log("Status :" ,response.status , "headers : ",response.headers, "config : ", response.config);
		vm.message = "Please register before password reset."
	    }
	    
	}
    }
})();
