(function () {
    'use strict';

    angular
        .module('user.authentication', [
	    'user.authentication.controllers',
	    'user.authentication.services'
	]);

    angular
        .module('user.authentication.controllers', []);

    angular
        .module('user.authentication.services', ['ngCookies']);
})();
