define([], function() {
        return ['$scope', '$http', '$log', 'MockApi', function($scope, $http, $log, MockApi) {

            $scope.apiMocks = [];

            $scope.loadMockList = function() {
                MockApi.list().$promise.then(function(mockProfiles) {
                        $scope.apiMocks = mockProfiles;
                    });
            };


            $scope.mock = {
                verb: "GET",
                headers: {
                },
                response: {
                    status: "200",
                    body: '{ "test" : "Response" }'
                }
            };

            $scope.open = function(apiMock) {
                angular.copy(apiMock, $scope.mock);
            };

            $scope.save = function() {
                $log.info($scope.mock);
                MockApi.save($scope.mock, function(){
                	var refresh = function() {
                		$scope.loadMockList();
                		var loaded = $scope.apiMocks.some(function(mock){
                			return ($scope.mock.displayName == mock.displayName);
                		});
                		if (!loaded) setTimeout(refresh, 1000);
                	};
                	setTimeout(refresh, 200);
                });
            };

            $scope.loadMockList();
            // because this has happened asynchroneusly we've missed
            // Angular's initial call to $apply after the controller has been loaded
            // hence we need to explicityly call it at the end of our Controller
            // constructor
            $scope.$apply();
        }];
    });