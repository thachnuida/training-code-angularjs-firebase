
var chatControllers = angular.module('chatControllers',["firebase"]);

chatControllers.factory("simpleLogin", ["$firebaseSimpleLogin", "$rootScope", function($firebaseSimpleLogin, $rootScope) {

  var ref = new Firebase("https://glaring-heat-5049.firebaseio.com/");
  $rootScope.$broadcast("login", [$firebaseSimpleLogin(ref)]);
  return $firebaseSimpleLogin(ref);
}]);

chatControllers.controller("HomeCtrl", ["$scope", "$rootScope", "simpleLogin","$firebase", "$location",
  function($scope, $rootScope, simpleLogin,$firebase,$location) {
  $rootScope.auth = simpleLogin;

  var ref= new Firebase("https://glaring-heat-5049.firebaseio.com/chatrooms"); 
  var sync = $firebase(ref);
    $scope.rooms= sync.$asArray();
    $scope.newRoom = function(){
      sync.$push({
        createdby:$rootScope.auth.user.displayName,
        roomName:$scope.roomName,
        createddate: Date.now()
      });
    $scope.isNew = false;
    };
    $scope.deleteRoom=function(index){
      sync.$remove($scope.rooms[index].$id);
    };
    $scope.joinChat=function(index){
      $location.path('chat/' + $scope.rooms[index].$id);
    };
}]);

chatControllers.controller("ChatCtrl",["$scope","$rootScope","$routeParams","$firebase","simpleLogin",
  function($scope,$rootScope,$routeParams,$firebase,simpleLogin){
    var chatRoom = new Firebase("https://glaring-heat-5049.firebaseio.com/chatrooms/"+$routeParams.roomid);
    if (!$rootScope.auth) {
      $rootScope.auth = simpleLogin;
    }
    var roomSync = $firebase(chatRoom);
    $scope.roomInfo = roomSync.$asObject();

    var msgSync = $firebase(chatRoom.child('chatMessages'));
    $scope.chatMessages=msgSync.$asArray();

    $scope.sendMessage=function(){
      $scope.url = null;
      if($scope.message.indexOf("https://www.youtube.com/watch?v=")==-1){
      }else{
        var number = $scope.message.indexOf("https://www.youtube.com/watch?v=");
        var start=number+32, end= number+43;

        $scope.message.substring(start,end);
        $scope.url=$scope.message.substring(start,end);
      };
      if ($scope.message.length == 0) return;
      msgSync.$push({
        postedby:$rootScope.auth.user.displayName,
        message:$scope.message,
        posteddate:Date.now(),
        userimg:$rootScope.auth.user.thirdPartyUserData.picture.data.url,
        url : $scope.url
      });
      $scope.message="";
    }
}]);

