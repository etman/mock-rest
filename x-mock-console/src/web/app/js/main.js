require.config({
	paths: {
		angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min',
		angularRoute: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.min',
		angularMocks: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-mocks',
		angularResource: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-resource',
		text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min',
		bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularResource' : ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
