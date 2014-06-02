define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/spaces', {
			templateUrl: 'app/partials/spaces.html',
			controller: 'SpacesController'
		})
		.when('/mocks', {
			templateUrl: 'app/partials/mocks.html',
			controller: 'MocksController'
		})
		.when("/about", {
			templateUrl: 'app/partials/about.html'
		});
		$routeProvider.otherwise({redirectTo: '/spaces'});
	}]);

});