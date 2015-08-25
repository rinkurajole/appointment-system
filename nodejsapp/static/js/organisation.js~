(function(){
    'use strict';
    var mainApp = angular.module('organisationApp', ['ui.router',
						     'ngCookies',
						     'user.authentication',
						     'appointment.config',
						     'user.authentication.controllers',
						     'user.authentication',
						     'user.authentication.services',
						     'user.appointment',
						     'user.home.controllers',
						     'user.home',
						     'user.home.services',
						     'organisationregistration',
						     'organisationregistration.controllers',
						     'organisationregistration.services',
						     'user.organisation_home.controllers',
						     'user.organisation_home',
						     'user.organisation_home.services',
						     'user.appointment',
						     'forgot.password'
						    ]);
    

    mainApp.config(function($stateProvider) {
	$stateProvider
	    .state('organisationregister',{
		url:'/org_register',
		controller:'OrganisationRegisterController',
		templateUrl:"views/OrganisationRegistration.html"
	    })
	    .state('login', {
		url: "/login",
		controller:'LoginController',
		controllerAs:'vm',
		templateUrl:"views/login.html"
	    })
	    .state('register', {
		url: "/user/register",
		controller:'RegisterController',
		templateUrl:"views/register.html"
	    })
	    .state(' ', {
		url: "/",
		controller:'navController'
	    })
	    .state('home', {
		url: "/home",
		controller:'HomeController',
		templateUrl:"views/home.html"
	    })
	    .state('home.addbranch', {
		url: "/addbranch",
		controller:'BranchController',
		templateUrl:"views/add_branch.html",
	    })
	    .state('home.editbranch', {
		url: "/editbranch",
		controller:'BranchController',
		templateUrl:"views/edit_branch.html"
	    })

	    .state('home.addService',{ 
		url: "/addservice",
		controller:'BranchController',
		templateUrl:"views/add_service.html"
	    })

	    .state('home.addSchedule', {
		url:"/addschedule",
		controller:'BranchController',
		templateUrl:"views/add_schedule.html"
	    })
	    .state('home.editSchedule', {
		url:"/editschedule",
		controller:'BranchController',
		templateUrl:"views/edit_schedule.html"
	    })
	    .state('appointment', {
		url: "/user",
		controller:"AppointmentController",
		controllerAs:'vm',
		templateUrl:"views/appointment.html",
	    })
	    .state('history', {
		url: "/appointment/history",
		controller:"appointmentHistoryController",
		controllerAs:'vm',
		templateUrl:"views/appointment_history.html",
	    })
	    .state('userProfile', {
		url: "/user/profile",
		controller:"UserProfileController",
		templateUrl:"views/userprofile.html",


	    })
	    .state('takeAppointment', {
		url: "/user/takeappointment",
		//controller:"UserProfileController",
		templateUrl:"views/take_appointment.html",
	    })
	    .state('lost_password', {
		url: "/lost_password",
		controller:"ForgotPasswordController",
		controllerAs:'vm',
		templateUrl:"views/emailVarification.html",
	    })
	    .state('reset_password', {
		url: "/reset_password",
		controller:"ResetPasswordController",
		controllerAs:'vm',
		templateUrl:"views/resetpassword.html",
	    })
	
	
    });
    /* mainApp.config(config);
       config.$inject = ['$locationProvider'];
       function config($locationProvider) {
       $locationProvider.html5Mode(true);
       $locationProvider.hashPrefix('!');
       }
    */		   
    // angular
    //	.module('appointment.config', []);
    mainApp.run(run);
    mainApp.controller('navController', ['$rootScope' ,'$scope', 'Authentication', function($rootScope, $scope, Authentication){
	$scope.Authentication=Authentication;
	$scope.IsLogin=true
	$scope.logout=Authentication.logout
    }]);
    run.$inject = ['$http'];
    
    
    mainApp.controller('organisation_nameController', ['$scope', function($scope){
	$scope.organisation_name= 'Amazatic';
	$scope.organisation_tagLine= 'Thinking beyond ....';
	
    }]);
    
    function run($http) {
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';
    }
    
})();

