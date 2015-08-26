(function () {
    'use strict';
    angular
	.module('user.appointment')
	.factory('UserAppointment', UserAppointment);

    UserAppointment.$inject = ['$cookies', '$http'];

    function UserAppointment($cookies, $http){
	var UserAppointment = {
	    getDetails : getDetails,
	    appointmentlist: [],
	    cancelAppointment: cancelAppointment
	}

	return UserAppointment;

	function getDetails(user_id){
	    return $http({
		url: 'http://localhost:8000/user/appointment',
		datatype: 'json',
		method : 'GET',
		params:{data:user_id}
	    }).then(appointmentDetailSuccess,appointmentDetailError);
	}
	function appointmentDetailSuccess(data, status, headers, config) {
	    for(var i=0;i<data.data.length;i++){
		UserAppointment.appointmentstatus= true
		UserAppointment.appointmentlist[i]={id:data.data[i].id, branch:data.data[i].branch.name, service: data.data[i].service, time_slot: data.data[i].timeslot, date: data.data[i].date}//data.data[i].branch.name
	    }	    
	}
	function appointmentDetailError(data, status, headers, config) {
	    console.log('failed')

	}
	function cancelAppointment(appointment_id){
	    console.log("hiii there", appointment_id)
	    var conf = confirm("Are u sure to cancel appointment??");
	    if(conf)
		return $http({
		    url: 'http://localhost:8000/user/appointment/'+appointment_id,
		    datatype: 'json',
		    method : 'DELETE',
		}).then(cancellationSuccess, cancellationError);
	    
	    function cancellationSuccess(data, status, headers, config){
		console.log(data.data.message)

		for(var i=0;i<UserAppointment.appointmentlist.length;i++)
		    if(UserAppointment.appointmentlist[i].id==data.data.id)
			break;
		UserAppointment.appointmentlist.splice(i,1);
	    }
	    function cancellationError(data, status, headers, config){
		console.log("Not Done")
	    }
	    
	}
    }
}
)();
