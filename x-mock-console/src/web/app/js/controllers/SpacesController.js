define([], function() {
        return ['$scope', '$http', '$log', '$location', 'SpaceApi', function($scope, $http, $log, $location, SpaceApi) {

            $scope.spaceProfiles = [];

            $scope.loadSpaceList = function() {
                SpaceApi.list().$promise.then(function(spaceProfiles) {
                        $scope.spaceProfiles = spaceProfiles;
                });
            };
            
            $scope.modal = {
            	spaceProfileForm : {},
            	reset : function() {
                	this.spaceProfileForm = {};
            	},
            	cancel : function() {
                	this.$hide();
                	this.reset();
                },
                save : function() {
                    var newSpaceForm = this.spaceProfileForm;
                	var thisModal = this;
                    $log.info(newSpaceForm);
                    SpaceApi.save(newSpaceForm, function(){
                    	var newName = newSpaceForm.displayName;
                    	var refresh = function() {
                    		$scope.loadSpaceList();
                    		var loaded = $scope.spaceProfiles.some(function(profile){
                    			return (newName == profile.displayName);
                    		});
                    		if (!loaded) setTimeout(refresh, 1000);
                    		else {
                            	thisModal.$hide();
                            	thisModal.reset();
                    		}
                    	};
                    	setTimeout(refresh, 200);
                    });
                }
            };

            $scope.openSpace = function(spaceProfile) {
            	$location.path('/spaces/' + spaceProfile.displayName);
            };

            $scope.loadSpaceList();
            $scope.$apply();
        }];
    });