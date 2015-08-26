/**
 * Authentication
 * @namespace user.authentication.services
 */
(function () {
    'use strict';

    angular
        .module('user.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];    
    /**
     * @namespace Authentication
     * @returns {Factory}
     */
    function Authentication($cookies, $http, $rootScope) {
	/**
	 * @name Authentication
	 * @desc The Factory to be returned
	 */
	var flag=true
	var Authentication = {
	    register: register,
	    getAuthenticatedAccount: getAuthenticatedAccount,
	    isAuthenticated: isAuthenticated,
	    login: login,
	    logout: logout,
	    isAuthenticated: isAuthenticated,
	    unauthenticate: unauthenticate,
	    getFlag: getFlag,
	    setAuthenticatedAccount: setAuthenticatedAccount,
	    login_error:false,
	    getStaff: getStaff,
	};


	return Authentication;


	function getFlag(){
	    return flag
	}
	////////////////////
	
	/**
	 * @name register
	 * @desc Try to register a new user
	 * @param {string} email The email entered by the user
	 * @param {string} password The password entered by the user
	 * @param {string} username The username entered by the user
	 * @returns {Promise}
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function register(firstname,lastname, contact, email, password, is_superuser, is_staff) {
	    return $http({
		url: 'http://localhost:8000/user/',
		dataType: 'json',
		method: 'POST',
		data: {first_name: firstname,last_name: lastname, contact: contact, email: email, password: password, is_staff: is_staff, is_superuser: is_superuser, is_active: true},
		headers: {
		    "Content-Type": "application/json"
		}
	    }).then(registerSuccessFn, registerErrorFn);
	    /*   return $http.post('http://localhost:8000/user/', {
		 firstname: firstname,
		lastname: lastname,
		email: email,
		password: password,
		}).*/
	    
	    /**
	     * @name registerSuccessFn
	     * @desc Log the new user in
	     */
	    function registerSuccessFn(data, status, headers, config) {
		//Authentication.login(email, password);
		flag=true
		console.log("registration success from register service")
		console.log("data: ",data.data)
		window.location = '/login';
		}
	    
	    /**
	     * @name registerErrorFn
	     * @desc Log "Epic failure!" to the console
	     */
	    function registerErrorFn(data, status, headers, config) {
		
		console.log("data: ",data.data.contact)
		console.log("cmplt data: ",data)
		if(data.data.email=="This field must be unique.")
		{
		    console.log("registration error from register service")
		    flag=false
		}
	    }
	}

	/**
	 * @name getAuthenticatedAccount
	 * @desc Return the currently authenticated account
	 * @returns {object|undefined} Account if authenticated, else `undefined`
	 * @memberOf user.authentication.services.Authentication
	 */
	function getAuthenticatedAccount() {
	    if (!$cookies.getObject('authenticatedAccount')) {
		return;
	    }
	    return $cookies.getObject('authenticatedAccount')['email'];
	}
	

	function getStaff() {
	    if (!$cookies.getObject('authenticatedAccount')) {
		return;
	    }
	    if($cookies.getObject('authenticatedAccount')['is_staff'])
		return true;
	    else
		return false;
	}

	/**
	 * @name isAuthenticated
	 * @desc Check if the current user is authenticated
	 * @returns {boolean} True is user is authenticated, else false.
	 * @memberOf user.authentication.services.Authentication
	 */
	function isAuthenticated() {
	    return !!$cookies.getObject('authenticatedAccount');
	}

	/**
	 * @name setAuthenticatedAccount
	 * @desc Stringify the account object and store it in a cookie
	 * @param {Object} user The account object to be stored
	 * @returns {undefined}
	 * @memberOf user.authentication.services.Authentication
	 */
	function setAuthenticatedAccount(account) {
	    $cookies.putObject('authenticatedAccount', account);
	}

	/**
	 * @name unauthenticate
	 * @desc Delete the cookie where the user object is stored
	 * @returns {undefined}
	 * @memberOf user.authentication.services.Authentication
	 */
	function unauthenticate() {
	    $cookies.remove('authenticatedAccount')
	}
	/**
	 * @name login
	 * @desc Try to log in with email `email` and password `password`
	 * @param {string} email The email entered by the user
	 * @param {string} password The password entered by the user
	 * @returns {Promise}
	 * @memberOf user.authentication.services.Authentication
	 */
	function login(email, password) {
	    console.log("Login call", email, password)
	    
	    return $http({
		url: 'http://localhost:8000/user/auth/',
		dataType: 'json',
		method: 'POST',
		data: {email: email, password: password},
		headers: {
		    "Content-Type": "application/json"
		}
	    }).then(loginSuccessFn, loginErrorFn);
	    
	    /**
	     * @name loginSuccessFn
	     * @desc Set the authenticated account and redirect to index
	     */
	    function loginSuccessFn(data, status, headers, config) {
		console.log("Data : ", data.data ,"Status :" ,status , "headers : ",headers, "config : ", config);
		Authentication.setAuthenticatedAccount(data.data);
		console.log("Inside login success")
		Authentication.login_error=false
		var is_staff = $cookies.getObject("authenticatedAccount")["is_staff"]
		console.log("is_staff is ",is_staff)
		if(is_staff == true)
		    window.location = '/home';
		else
		    window.location = '/user';
		

	    }
	    
	    /**
	     * @name loginErrorFn
	     * @desc Log "login failure!" to the console
	     */
	    function loginErrorFn(data, status, headers, config) {
		Authentication.login_error=true
		console.error('login  failure!',data);
	    }
	}
	/**
	 * @name logout
	 * @desc Try to log the user out11
	 * @returns {Promise}
	 * @memberOf user.authentication.services.Authentication
	 */
	function logout() {
	    console.log("inside logout")
	    return $http.delete('http://localhost:8000/user/auth/')
	        .then(logoutSuccessFn, logoutErrorFn);
	    
	    /**
	     * @name logoutSuccessFn
	     * @desc Unauthenticate and redirect to index with page reload
	     */
	    function logoutSuccessFn(data, status, headers, config) {
		Authentication.unauthenticate();
		window.location = '/login';
	    }
	    
	    /**
	     * @name logoutErrorFn
	     * @desc Log "logout failure!" to the console
	     */
	    function logoutErrorFn(data, status, headers, config) {
		console.error('logout failure!');
	    }
	}

    }
})();
