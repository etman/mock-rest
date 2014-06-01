define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/mocks', {
			templateUrl: 'app/partials/mocks.html',
			controller: 'MocksController'
		})
		.when("/about", {
			templateUrl: 'app/partials/about.html'
		});
		$routeProvider.otherwise({redirectTo: '/mocks'});
	}]);

});