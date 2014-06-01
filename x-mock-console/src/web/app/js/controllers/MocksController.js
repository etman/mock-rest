define([], function() {
	return [ '$scope', '$http', function($scope, $http) {

		$scope.mock = {
			verb : "GET",
			headers : {
				contentEncoding : "UTF-8"
			},
			response : {
				status : "200",
				body : '{ "test" : "Response" }'
			}
		};

		$scope.save = function() {
			console.log($scope.mock);
		};

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller
		// constructor
		$scope.$apply();
	} ];
});