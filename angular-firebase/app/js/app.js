
'use strict';

var chatApp = angular.module('chatApp',['ngRoute','chatControllers']);

chatApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when("/",{
        templateUrl:'partials/auth.html',
        controller:'AuthCtrl'
      }).
      when("/home",{
        templateUrl:'partials/home.html',
        controller:'HomeCtrl'
      }).
      when('/chat/:roomid',{
        templateUrl:'partials/chat.html',
        controller:'ChatCtrl'
      }).
      otherwise({
        redirectTo:'/'
      });
}])

