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

	    var params = {};
	    if (location.search) {
		var parts = location.search.substring(1).split('&');

		for (var i = 0; i < parts.length; i++) {
		    var nv = parts[i].split('=');
		    if (!nv[0]) continue;
		    params[nv[0]] = nv[1] || true;
		}
	    }
	    
	    var id=params.id;
	    UpdatePassword.update(id,vm.password);

	}
    }
})();
