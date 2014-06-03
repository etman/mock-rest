define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularResource',
    'angularStrapTpl'
	], function (angular, filters, services, directives, controllers) {
		'use strict';

		// Declare app level module which depends on filters, and services
		return angular.module('myApp', [
			'ngRoute',
			'ngResource',
			'myApp.controllers',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'mgcrea.ngStrap',
			'mgcrea.ngStrap.modal', 
			'mgcrea.ngStrap.aside', 
			'mgcrea.ngStrap.tooltip'
		]);
});
