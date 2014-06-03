define([], function() {
	return [ '$scope', '$http', '$log', '$location', 'SpaceApi', function($scope, $http, $log, $location, SpaceApi) {

        $scope.spaceDropDown = [];
        
        $scope.loadSpaceList = function() {
            SpaceApi.list().$promise.then(function(spaceProfiles) {
            	var dropDownList = $.map(spaceProfiles, function(profile) {
            	       return {
            	    	   "text": profile.displayName,
            	    	   "href": "#/spaces/" + profile.displayName
            	       };
            	});
                $scope.spaceDropDown = dropDownList;
                $log.info(spaceProfiles);
            });
        };
        
        
        $scope.open = function(profile) {
			$log.info(profile);
        };
        
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		};
		
        $scope.loadSpaceList();
		$scope.$apply();
	} ];
});