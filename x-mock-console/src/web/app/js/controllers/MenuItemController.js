define([], function() {
	return [ '$scope', '$http', '$log', '$location', 'SpaceApi', function($scope, $http, $log, $location, SpaceApi) {
		$scope.spaces = [];
        $scope.loadSpaceList = function() {
            SpaceApi.list().$promise.then(function(spaceProfiles) {
                $scope.spaces = spaceProfiles;
            });
        };
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		};
		
        $scope.loadSpaceList();
		$scope.$apply();
	} ];
});