(function () {
    'use strict';

    angular
        .module('user.home', [
	    'user.home.controllers',
	    'user.home.services'
	]);

    angular
        .module('user.home.controllers', []);

    angular
        .module('user.home.services', ['ngCookies']);
})();
