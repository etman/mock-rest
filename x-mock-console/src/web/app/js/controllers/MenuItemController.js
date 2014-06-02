define([], function() {
	return [ '$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) {
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		};
		$scope.$apply();
	} ];
});