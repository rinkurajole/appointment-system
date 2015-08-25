/**
 * Representation
 * @namespace user.representation.services
 */
(function () {
    'use strict';

    angular
        .module('user.organisation_home.services')
        .factory('Representation', Representation);

    Representation.$inject = ['$cookies', '$http', '$q'];    
    /**
     * @namespace Representation
     * @returns {Factory}
     */
    function Representation($cookies, $http, $rootScope,$q) {
	/**
	 * @name Representation
	 * @desc The Factory to be returned
	 */
	var Representation = {
	    getService : getService,
	    getBranch: getBranch,
	    addBranch: addBranch,
	    editBranch: editBranch,
	    removeBranch:removeBranch,
	    removeService: removeService,
	    branches:[],
	    services:[],
	    timeslots:[],
	    Locationcontact:{},
	    addService: addService,
	    getContacts: getContacts,
	    getSchedule:getSchedule,
	    addSchedule:addSchedule,
	    removeSchedule:removeSchedule,
	    editSchedule:editSchedule,
	};

	return Representation;

	function getBranch(organisation_id){
	    var request = $http({
		url: 'http://localhost:8000/organisation/'+organisation_id+'/locations',
		dataType: 'json',
		method: 'GET',
		//	data:{organisation:organisation_id},
	    });
	    return ( request.then(fetchBranchSuccess,fetchBranchError));

	    function fetchBranchSuccess(response){
		for(var i=0;i<response.data.length;i++)
		    Representation.branches[i]=response.data[i]
		console.log(Representation.branches)
	    }
	    
	    function fetchBranchError(response){
		alert('error in fetch');
		return ($q.reject(response.data.message ));
	    }
	}

	


	function getService(location_id){
	    console.log("Inside get Service");
	    Representation.services=[];
	    var request = $http({
		url: 'http://localhost:8000/organisationlocation/'+location_id+'/services',
		dataType: 'json',
		method: 'GET',
		//	data:{organisation:organisation_id},
	    });
	    return ( request.then(fetchServiceSuccess,fetchServiceError));
	    
	    function fetchServiceSuccess(response){
		for(var i=0;i<response.data.length;i++)
		    Representation.services[i]=response.data[i]
	    }

	    function fetchServiceError(response){
		alert('error in fetch');
		return ($q.reject(response.data.message ));
	    }
	}

	function addBranch(organisation_id, name, no_of_services,services){
	    console.log("Inside Add Branch")
	    $http({
		url: 'http://localhost:8000/organisationlocation/',
		dataType: 'json',
		method: 'POST',
		data:{organisation:organisation_id,name : name , no_of_services : no_of_services},
		headers:{
		    "Content-Type" : "application/json"
		}
	    }).then(addBranchSuccess, addBranchError);

	    function addBranchSuccess(response){
		console.log("Branch Added Successfully",response.data.name);
		Representation.branches[Representation.branches.length]=response.data
		$cookies.putObject("branch_id", response.data.id)
		
	    }
	    function addBranchError(response){
		console.log("Error",response.data);
	    }
	}


	function addBranchDetails(branch_id){

	    console.log("Inside AddBranchDetails Service");
	    $http({
		url: 'http://localhost:8000/addbranch/',
		dataType: 'json',
		method: 'POST',
		data:{} ,
		headers:{
		    "Content-Type" : "application/json"
		},
	    }).then(addBranchDetailsSuccess, addBranchDetailsError);

	    function addBranchDetailsSuccess(response){
		//	
	    }

	    function addBranchDetailsError(response){
		//
	    }
	}

	function editBranch(locationdetails){
	    var request = $http({
		url: 'http://localhost:8000/organisationcontact/'+locationdetails.id+'/',
		dataType: 'json',
		method: 'PUT',
		data:{location:locationdetails.location,
		      office_contact:locationdetails.office_contact,
		      office_email:locationdetails.office_email,
		      personal_contact:locationdetails.personal_contact,
		      personal_email:locationdetails.personal_email,
		      address:locationdetails.address,
		     }
	    });
	    return ( request.then(editBranchSuccess,editBranchError));
	    
	    function editBranchSuccess(response){
		console.log("edited successfully:",response.data)
	    }

	    function editBranchError(response){
		alert('error in fetch');
	    }
	    
	}


	
	function editSchedule(timeslot_id,schedule,service_id){
	    console.log("Inside edit schedule service")
	    var request = $http({
		url: 'http://localhost:8000/timeslot/'+timeslot_id+'/',
		dataType: 'json',
		method: 'PUT',
		data:{ id:timeslot_id,
		       service:service_id,
		       start_time:schedule.start_time,
		       end_time:schedule.end_time,
		       capacity:schedule.capacity,
		       active:schedule.active
		     }
	    });
	    return ( request.then(editScheduleSuccess,editScheduleError));
	    
	    function editScheduleSuccess(response){
		console.log("Schedule edited successfully:",response.data)
	    }

	    function editScheduleError(response){
		alert('error in editing Schedule');
	    }
	    
	}
	
	
	function removeBranch(location_id){
	    var request = $http({
		url: 'http://localhost:8000/organisationlocation/'+location_id+'/',
		dataType: 'json',
		method: 'DELETE',
	    });
	    return ( request.then(removeBranchSuccess,removeBranchError));
	    
	    function removeBranchSuccess(response){
		console.log("Branch Removed successfully:",response.data)
		for(var i=0;i<Representation.branches.length;i++)
		    if(Representation.branches[i].id==location_id)
			break;
		Representation.branches.splice(i,1)
	    }

	    function removeBranchError(response){
		alert('Error while Removing Branch');
	    }
	    
	}



	
	function addService(location_id,service){
	    console.log("Inside Add Branch")
	    var request = $http({
		url: 'http://localhost:8000/service/',
		dataType: 'json',
		method: 'POST',
		data:{location:location_id,name:service },
		headers:{
		    "Content-Type" : "application/json"
		}
	    });
	    return(request.then(addServiceSuccess, addServiceError) );
	    
	    function addServiceSuccess(response){
		Representation.services[Representation.services.length]=response.data
		console.log("Service(s) Added Successfully",response.data)
	    }
	    function addServiceError(response){
		console.log("Error in service ",response.data);
	    }

	}



	function removeService(service_id){
	    var request = $http({
		url: 'http://localhost:8000/service/'+service_id+'/',
		dataType: 'json',
		method: 'DELETE',
	    });
	    return ( request.then(removeServiceSuccess,removeServiceError));
	    
	    function removeServiceSuccess(response){
		console.log("Branch Removed successfully:",response.data)
		for(var i=0;i<Representation.services.length;i++)
		    if(Representation.services[i].id==service_id)
			break;
		Representation.services.splice(i,1)
	    }

	    function removeServiceError(response){
		alert('Error while Removing Service');
	    }

	}



	function getSchedule(service_id){

	    var request = $http({
		url: 'http://localhost:8000/service/'+service_id+'/timeslot/',
		dataType: 'json',
		method: 'GET',
	    });
	    return( request.then(getScheduleSuccess, getScheduleError));

	    function getScheduleSuccess(response){
		console.log("Inside get Schedule Success");
		for(var i=0; i<response.data.length;i++)
		    Representation.timeslots[i]=response.data[i]

	    }
	    function getScheduleError(response){
		alert('Error while Retriving Schedule data');
	    }

	}


	function addSchedule(service_id,schedule){
	    console.log("inside addSchedule")
	    var request = $http({
		url: 'http://localhost:8000/timeslot/',
		dataType: 'json',
		method: 'POST',
		data:{ service:service_id,
		       capacity:schedule.capacity,
		       active:schedule.active,
		       start_time:schedule.start_time,
		       end_time:schedule.end_time
		     },
	    });
	    return( request.then(addScheduleSuccess, addScheduleError));

	    function addScheduleSuccess(response){
		console.log("Schedule Added Successfully");
	    }

	    function addScheduleError(response){
		alert("Error while adding schedule");
	    }

	}

	function removeSchedule(timeslot_id){
	    console.log("Inside remove schedule");
	    var request = $http({
		url: 'http://localhost:8000/timeslot/'+timeslot_id+'/',
		dataType: 'json',
		method: 'DELETE',
	    });
	    return ( request.then(removeScheduleSuccess,removeScheduleError));
	    
	    function removeScheduleSuccess(response){
		console.log("Schedule Removed Successfully:",response.data)
		for(var i=0;i<Representation.timeslots.length;i++)
		    if(Representation.timeslots[i].id==timeslot_id)
			break;
		Representation.timeslots.splice(i,1)
	    }

	    function removeScheduleError(response){
		alert('Error while Removing Schedule');
	    }
	}





	function getContacts(location_id){
	    console.log("Inside get Service");
	    var request = $http({
		url: 'http://localhost:8000/organisationlocation/'+location_id+'/contacts/',
		dataType: 'json',
		method: 'GET',
	    });
	    return ( request.then(fetchContactsSuccess,fetchContactsError));
	    
	    function fetchContactsSuccess(response){
		console.log("response",response.data)
		Representation.LocationContact=response.data[0];
		console.log("contact details:",Representation.LocationContact)
	    }

	    function fetchContactsError(response){
		alert('error in fetch');
		return ($q.reject(response.data.message ));
	    }
	}


	/*function change_visibility(){
	    visibility=!visibility


	}*/
    }	
})();
