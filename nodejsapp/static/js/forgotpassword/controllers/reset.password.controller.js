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
	var req_url, decrypt_url, split_params, split_id;
	vm.resetPassword = function(){
	    console.log("in reset password", "new_password : ", vm.password, "confirm_pasword : ", vm.confirm_password)

	    var params = {};
	    if (location.search) {
		req_url = location.search.substring(1);
		var decrypted = CryptoJS.AES.decrypt(req_url, "d6F3Efeq");
		decrypt_url = CryptoJS.enc.Utf8.stringify(decrypted);
		console.log("Decrypted URLLLLLLL =>"+decrypt_url.id);
		split_params = decrypt_url.split("&");
		split_id = split_params[0].split("=");
	    }
	    
	    var id = split_id[1];
	    UpdatePassword.update(id,vm.password);

	}
    }
})();
