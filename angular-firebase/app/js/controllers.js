
var chatControllers = angular.module('chatControllers',["firebase"]);

chatControllers.factory("simpleLogin", ["$firebaseSimpleLogin", function($firebaseSimpleLogin) {
  var ref = new Firebase("https://glaring-heat-5049.firebaseio.com/");
  return $firebaseSimpleLogin(ref);
}]);
chatControllers.controller("AuthCtrl", ["$scope", "simpleLogin", function($scope, simpleLogin) {
    $scope.auth = simpleLogin;
  }])