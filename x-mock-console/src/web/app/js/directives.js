define(['angular', 'services'], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('myApp.directives', ['myApp.services'])
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
		};
	}]).directive('setFocus', function($timeout) {
		return {
			link : function(scope, element, attrs, model) {
				$timeout(function() {
				element[0].focus();
			});
		}
	}});
});
