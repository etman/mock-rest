define([], function() {
        return ['$scope', '$routeParams', '$http', '$log', 'MockApi', function($scope, $routeParams, $http, $log, MockApi) {
        	$scope.spaceName = $routeParams.spaceName;
            $scope.apiMocks = [];

            $scope.loadMockList = function() {
                MockApi.list({"spaceName" : $scope.spaceName}).$promise.then(function(mockProfiles) {
                	$scope.apiMocks = mockProfiles;
                });
            };


            $scope.mock = {
                verb: "GET",
                headers: {
                	Content_Type: "application/json"
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
                MockApi.save({"spaceName" : $scope.spaceName}, $scope.mock, function(){
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