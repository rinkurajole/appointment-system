(function (){
    'use strict';

    angular
        .module('user.organisation_home.controllers')
        .controller('BranchController', BranchController);

    BranchController.$inject = ['$location', '$scope', 'Representation','$cookies'];

    /**
     * @namespace HomeController
     */
    function BranchController($location, $scope, Representation, $cookies) {
	$scope.ServiceTab = false;
	$scope.Representation=Representation;

	
	$scope.ShowServiceTab = function(){
	    console.log("$scope.ServiceTab")
	    $scope.ServiceTab=true;
	    Representation.addBranch("2",$scope.name,$scope.no_of_services,$scope.services);
	    
	}
	$scope.schedule=[];
	$scope.start_hour=[];
	$scope.start_minute=[];
	$scope.end_hour=[];
	$scope.end_minute=[];
	$scope.start_AMPM=[];
	$scope.end_AMPM=[];
	
	$scope.ShowScheduleTab = function(){
	    $scope.ScheduleTab=true;
	    
	}


	$scope.addschedule = function(service_id,schedule){
	    for(var i=0;i<schedule.length;i++){
		console.log("inside addschedule controller:" ,service_id) 
		schedule[i].start_time=$scope.start_hour[i] + ":" + $scope.start_minute[i] + $scope.start_AMPM[i]
		schedule[i].end_time=$scope.end_hour[i] + ':' + $scope.end_minute[i] + $scope.end_AMPM[i]
		console.log("adding schedule:" ,schedule[i].start_time, schedule[i].end_time)
		Representation.addSchedule(service_id,schedule[i])
	    }
	    
	    //Representation.addSchedule(service_id,schedule[i]);
	}
	
	
	$scope.getNum = function(no_of_services){
	    return new Array(no_of_services);
	}

	$scope.services=new Array( )


	$scope.addBranchDetails= function(){
	    branch_id = $cookies.getObject("branch_id")
	    Representation.addBranchDetails(branch_id)
	    

	}
	$scope.addservices = function(services){	    
	    
	    var branch_id = $cookies.getObject("branch_id")
	    for(var i=0;i<services.length;i++)
		Representation.addService(branch_id,services[i]);
	    
	}


	$scope.EditBranch = function(){

	    console.log("Inside EditBranch Controller")
	    Representation.editBranch(Representation.LocationContact)


	}


	$scope.addServices = function(branch_id){
	    for(var i=0;i<$scope.services.length;i++)
		Representation.addService(branch_id,$scope.services[i]);
	}

	$scope.editschedule = function(timeslot_id,schedule,service_id){
	    console.log("Inside edit schedule controller")
	    schedule.start_time=$scope.start_hour + ":" + $scope.start_minute + $scope.start_AMPM
	    schedule.end_time=$scope.end_hour + ':' + $scope.end_minute + $scope.end_AMPM
	    console.log("time",schedule.start_time,schedule.end_time)
	    Representation.editSchedule(timeslot_id,schedule,service_id)
	    
	}


	
    }
}
)();
