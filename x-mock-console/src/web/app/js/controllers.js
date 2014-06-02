define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */
	return angular.module('myApp.controllers', ['myApp.services'])
		.controller('MocksController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/MocksController'], function(ctrl) {
				$injector.invoke(ctrl, this, {'$scope': $scope});
			});
		}])
		.controller('MenuItemController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/MenuItemController'], function(ctrl) {
				$injector.invoke(ctrl, this, {'$scope': $scope});
			});
		}])
		.controller('SpacesController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/SpacesController'], function(ctrl) {
				$injector.invoke(ctrl, this, {'$scope': $scope});
			});
		}]);
});