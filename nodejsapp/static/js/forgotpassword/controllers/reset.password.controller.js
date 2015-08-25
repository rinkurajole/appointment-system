(function () {
    'use strict';

    angular
        .module('forgot.password')
        .controller('ResetPasswordController', ResetPasswordController);
          /**
  * @namespace ForgotPasswordController
  */
    function ResetPasswordController(UpdatePassword) {
	var vm = this;
	vm.resetPassword = function(){
	    console.log("in reset password", "new_password : ", vm.password, "confirm_pasword : ", vm.confirm_password)
	    var id=3;
	    UpdatePassword.update(id,vm.password);

	}
    }
})();
