define([], function() {
        return ['$scope', '$http', '$log', 'SpaceApi', function($scope, $http, $log, SpaceApi) {

            $scope.spaceProfiles = [];

            $scope.loadSpaceList = function() {
                SpaceApi.list().$promise.then(function(spaceProfiles) {
                        $scope.spaceProfiles = spaceProfiles;
                    });
            };


            $scope.spaceProfileForm = {
                
            };

            $scope.open = function(spaceProfile) {
                angular.copy(spaceProfile, $scope.spaceProfileForm);
            };

            $scope.save = function() {
                $log.info($scope.spaceProfileForm);
                SpaceApi.save($scope.spaceProfileForm, function(){
                	var refresh = function() {
                		$scope.loadSpaceList();
                		var loaded = $scope.spaceProfiles.some(function(profile){
                			return ($scope.spaceProfileForm.displayName == profile.displayName);
                		});
                		if (!loaded) setTimeout(refresh, 1000);
                	};
                	setTimeout(refresh, 200);
                });
            };

            $scope.loadSpaceList();
            $scope.$apply();
        }];
    });