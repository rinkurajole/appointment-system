/**
 * HomeController
 * @namespace user.organisation_home.controllers
 */
(function () {
    'use strict';

    angular
        .module('user.organisation_home.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Representation'];

    /**
     * @namespace HomeController
     */
    function HomeController($scope, Representation) {

	$scope.Representation=Representation;
	$scope.Representation.getBranch("2");
	if(!angular.isDefined($scope.selectedbranch))
	    $scope.selectedbranch="";
	$scope.getservice = function(branch){
	    if(branch!=null){
		Representation.getService(branch.id);
		Representation.getContacts(branch.id);
		//Representation.change_visibility()
	    }
	}
	$scope.getschedule =function (location){
	    console.log("Inside get Schedule:",location)
	    if(location!=null){
		Representation.getSchedule(location.id);
		
	    }

	} 
	
    }
})();
