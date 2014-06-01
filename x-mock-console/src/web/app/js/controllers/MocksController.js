define([], function() {
	return [ '$scope', '$http', '$log', 'MockApi', function($scope, $http, $log, MockApi) {

		$scope.apiMocks = [];
		MockApi.list().$promise.then(function(mockProfiles) {
			$scope.apiMocks = mockProfiles;
		});


		$scope.mock = {
			verb : "GET",
			headers : {
				content_encoding : "UTF-8"
			},
			response : {
				status : "200",
				body : '{ "test" : "Response" }'
			}
		};

		$scope.open = function(apiMock) {
			$scope.mock = apiMock;
		};

		$scope.save = function() {
			$log.info($scope.mock);
			$http.post("/api/mocks", $scope.mock);
		};

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller
		// constructor
		$scope.$apply();
	} ];
});