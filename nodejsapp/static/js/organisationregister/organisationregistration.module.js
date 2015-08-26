(function () {
    'use strict';

    angular
        .module('organisationregistration', [
	    'organisationregistration.controllers',
	    'organisationregistration.services'
	]);

    angular
        .module('organisationregistration.controllers', []);

    angular
        .module('organisationregistration.services', ['ngCookies']);
})();
