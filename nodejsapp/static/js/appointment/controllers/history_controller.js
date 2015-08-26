/**
* AppointmentController
* @namespace user.authentication
*/
(function () {
    'use strict';

    angular
        .module('user.appointment')
        .controller('appointmentHistoryController', appointmentHistoryController)


      /**
  * @namespace AppointmentController
  */
    function appointmentHistoryController(UserAppointment, $cookies) {
	var vm=this;
	vm.UserAppointment = UserAppointment;
    }
})();
