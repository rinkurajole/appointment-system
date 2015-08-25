/**
 * Organisation Register Service
 * @namespace organisationregistration.services
 */
(function () {
    'use strict';

    angular
        .module('organisationregistration.services')
        .factory('OrganisationRegistration', organisationRegistration);

    organisationRegistration.$inject = ['$cookies', '$http'];
    /**
     * @namespace organisationRegistration
     * @returns {Factory}
     */
    function organisationRegistration($cookies, $http) {
	/**
	 * @name organisationRegistration
	 * @desc The Factory to be returned
	 */
	var organisationRegistration = {
	    organisationregister: organisationregister,
	    organisationuserregister: organisationuserregister,
	    isalready_registered:false,
	    isemail_registered:false,
	    issubmitform1:true,
	    issubmitform2:false,
	    message:""
	};


	return organisationRegistration;
	
	/**
	 * @name organisationregister
	 * @desc Try to register a new organisation
	 * @param {string} orgname The organisation name entered by the user
	 * @returns {Promise}
	 * @memberOf appointmentapp.services.OrganisationRegistration
	 */
	function organisationregister(orgname) {
	    
	    $http({
		url: 'http://localhost:8000/organisation/',
		dataType: 'json',
		method: 'POST',
		data: {name: orgname},
		headers: {
		    "Content-Type": "application/json"
		}
	    }).then(organisationRegisterSuccessFn, organisationRegisterErrorFn);
	    
	    /**
	     * @name organisationRegisterSuccessFn
	     * @desc Log the new organisation in
	     */
	    function organisationRegisterSuccessFn(response) { 
		console.log("Data : ", response.data ,"Status :" ,response.status , "headers : ",response.headers, "config : ", response.config)
		alert("Organisation Registered Successfully");
		organisationRegistration.isalready_registered=false;
		organisationRegistration.issubmitform1=false;
		organisationRegistration.issubmitform2=true;
	    }
	    /**
	     * @name organisationRegisterErrorFn
	     * @desc Log Server Response to the console
	     */
	    function organisationRegisterErrorFn(data, status, headers, config) {
		if(data.data.name = "This field must be unique.") {
		    organisationRegistration.isalready_registered=true;
		}
		organisationRegistration.issubmitform1=true;
		organisationRegistration.issubmitform2=false;
	    }
	}
	
	/**
	 * @name organisationuserregister
	 * @desc Try to register admin for organisation
	 * @returns {Promise}
	 * @memberOf organisationregistration.services.OrganisationRegistration
	 */
	function organisationuserregister(firstname, lastname, contact, email, password) {   

	    var to = email;
	    var rand=Math.floor((Math.random() * 100) + 54);
	    var link = "/verify?id="+rand;
	    var subject = "Please confirm your organisation admin account";
	    var body = "Hello,<br> Thank you for sign up. <br> Please Click on the link to verify your email."
	    organisationRegistration.message = "Sending E-mail...Please wait";

	    $http({
		url: '/send',
		method: 'get',
		params: {to: to, link: link, id: rand, subject: subject, body: body}
	    }).then(mailSuccessFn, mailErrorFn);

	    /**
	     * @name mailSuccessFn
	     * @desc Log Server Response to the console also send user registeration request.
	     */
	    function mailSuccessFn(response) {
		console.log("Data : ", response.data ,"Status :" ,response.status , "headers : ",response.headers, "config : ", response.config)
		if(response.data=="sent")
		{
		    organisationRegistration.message = "Email is been sent at "+to+" . Please check inbox !";
		    
		    $http({
	    		url: 'http://localhost:8000/user/',
	    		dataType: 'json',
	    		method: 'POST',
	    		data: {first_name: firstname, last_name: lastname, contact: contact, email: email, password: password, is_staff: true, is_superuser: true},
	    		headers: {
	    		    "Content-Type": "application/json"
	    		}
		    }).then(registerSuccessFn, registerErrorFn);
		    
		    /**
		     * @name registerSuccessFn
		     * @desc Log the new user in
		     */
		    function registerSuccessFn(response) {
	    		console.log("Data : ", response.data ,"Status :" ,response.status , "headers : ",response.headers, "config : ", response.config)
			if(response.status == 201)
			{
			    alert("User Registered Successfully");
			}
			else
			{
			    alert("Error while creating User");
			}
			organisationRegistration.isemail_registered=false;
		    }
		    /**
		     * @name registerErrorFn
		     * @desc Log Server Response to the console
		     */
		    function registerErrorFn(data, status, headers, config) {
			if(data.data.name = "This field must be unique.") {
			    organisationRegistration.isemail_registered=true;  }
		    }
		}
		else if(response.data=="error")
		{
		    organisationRegistration.message = "Error while sending mail.Please check E-mail Id.";
		}
	    }

	    /**
	     * @name mailErrorFn
	     * @desc Log Server Response to the console
	     */
	    function mailErrorFn(data, status, headers, config) {
		organisationRegistration.message = "Something goes wrong!!!";
		console.log("Server failure message- "+data.data.name);
	    }
	}
    }
})();
