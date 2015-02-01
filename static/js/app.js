"use strict";

var app = angular.module('MyWeb', [
    'ngRoute',
    'ngAnimate',
    'MyWebControllers',
    'MyWebServices',
    'ui.bootstrap',
    'uiGmapgoogle-maps'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'static/partials/main.html',
        controller: 'MainController'
      }).
      when('/cn', {
        templateUrl: 'static/partials/main.html',
        controller: 'MainController'
      }).
      when('/notes', {
        templateUrl: 'static/partials/notes.html',
        controller: 'NotesController'
      }).
      when('/about', {
        templateUrl: 'static/partials/about.html',
        controller: 'AboutController'
      }).
      when('/cn/about', {
        templateUrl: 'static/partials/about.html',
        controller: 'AboutController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAIlukEKeQ9vJHNF7F89_IPvrD5Fa5Zi3A',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

