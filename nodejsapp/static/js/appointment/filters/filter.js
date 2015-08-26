
(function () {
    'use strict';
    angular
	.module('user.appointment')
	.filter('passedDate', function(){
	    
	    return function(appointments){
		var passed_appointments= [];
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		var j=0;
		today = mm+'/'+dd+'/'+yyyy;
		for(var i=0;i<appointments.length;i++){
		    if(new Date(appointments[i].date)< new Date(today))
			passed_appointments[j++]=appointments[i]
		}
		return passed_appointments
	    }
	})
})()

