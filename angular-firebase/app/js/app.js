'use strict';

var chatApp = angular.module('chatApp',['ngRoute','chatControllers','chatDirectives']);

chatApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when("/",{
        templateUrl:'partials/home.html',
        controller:'HomeCtrl',
      }).
      when('/chat/:roomid',{
        templateUrl:'partials/chat.html',
        controller:'ChatCtrl'
      }).
      otherwise({
        redirectTo:'/'
      });
}])

