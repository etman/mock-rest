define([ 'angular', 'angularResource' ], function(angular) {
	'use strict';

	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', [ 'ngResource' ]).factory('MockApi',
			[ '$resource', function($resource) {
				return $resource('api/mocks', {}, {
					'save' : {
						method : 'POST'
					},
					'list' : {
						method : 'GET',
						isArray : true
					}
				});
			} ]).value('version', '0.1');
});
