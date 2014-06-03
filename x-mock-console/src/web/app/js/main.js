require.config({
	paths: {
		angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular',
		angularRoute: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route',
		angularMocks: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-mocks',
		angularResource: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-resource',
		angularAnimate: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-animate',
		text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text',
		angularStrap: '//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.0.0/angular-strap',
		angularStrapTpl: '//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.0.0/angular-strap.tpl',
		jquery: '//code.jquery.com/jquery-1.11.0'
	},
	shim: {
		'angular' : {deps:['jquery'], 'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularResource' : ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'angularAnimate' : {
	        deps : [ 'angular' ]
		},
		'angularStrap' : {
	        deps : [ 'angular', 'angularAnimate' ] 
	    },
		'angularStrapTpl' : {
	        deps : [ 'angularStrap' ]
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
