define([], function() {
        return ['$scope', '$http', '$log', '$location', 'SpaceApi', function($scope, $http, $log, $location, SpaceApi) {

            $scope.spaceProfiles = [];

            $scope.loadSpaceList = function() {
                SpaceApi.list().$promise.then(function(spaceProfiles) {
                        $scope.spaceProfiles = spaceProfiles;
                });
            };

            $scope.spaceProfileForm = {};
            
            $scope.cancel = function() {
            	$scope.spaceProfileForm = {};
            }

            $scope.openSpace = function(spaceProfile) {
            	$location.path('/spaces/' + spaceProfile.displayName);
            };

            $scope.save = function() {
                $log.info($scope.spaceProfileForm);
                SpaceApi.save($scope.spaceProfileForm, function(){
                	$('#newSpaceModal').modal('hide');
                	var newName = $scope.spaceProfileForm.displayName;
                	$scope.spaceProfileForm = {};
                	var refresh = function() {
                		$scope.loadSpaceList();
                		var loaded = $scope.spaceProfiles.some(function(profile){
                			return (newName == profile.displayName);
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