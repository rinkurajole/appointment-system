/**
* AppointmentController
* @namespace user.authentication
*/
(function () {
    'use strict';

    angular
        .module('user.appointment')
        .controller('AppointmentController', AppointmentController);
/**
  * @namespace AppointmentController
  */
    function AppointmentController(UserAppointment, $cookies) {
	var vm=this;
	vm.UserAppointment = UserAppointment
	UserAppointment.getDetails($cookies.getObject("authenticatedAccount").id);
    }
    
})();
