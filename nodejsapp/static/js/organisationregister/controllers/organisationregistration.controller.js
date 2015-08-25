/**
 * Organisation Register controller
 * @namespace appointmentapp.controllers
 */
(function () {
    'use strict';

    angular
        .module('organisationregistration.controllers')
        .controller('OrganisationRegisterController', ['$http', '$scope', 'OrganisationRegistration', function($http, $scope, OrganisationRegistration) {
	    console.log("Organisation Register Controller");

	    $scope.OrganisationRegistration = OrganisationRegistration
	    
	    $scope.organisationregister = function(){
		OrganisationRegistration.organisationregister($scope.orgname);
	    }

	    $scope.organisationuserregister = function(){
		if($scope.password != $scope.confirmpswrd)
		{
		    $scope.ismatched = true;
		}
		else
		{
		    $scope.ismatched = false;
		    OrganisationRegistration.organisationuserregister($scope.firstname, $scope.lastname, $scope.contact, $scope.email, $scope.password);
		}
	    }
	}])
})();
