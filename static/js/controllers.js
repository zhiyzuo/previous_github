"use strict";

var controllers = angular.module('MyWebControllers', []);

controllers.controller('NavController', ['$scope','$location', 'QueryService', function($scope, $location, QueryService) {
// {{{ Navigation bar controller

    if($location.path().indexOf('cn') > -1) {
        $scope.navTerms = QueryService.query_navbar_cn();
        console.log("cn");
    } else {
        $scope.navTerms = QueryService.query_navbar();
    }

    $scope.isActive = function(navLoc) {
        var currLoc = $location.path();
        var cnIndex = currLoc.indexOf('cn');
        if ( cnIndex > -1) {
            currLoc = currLoc.substring(cnIndex+1, currLoc.length);
        }

        return currLoc == navLoc;
    };

    $scope.goTo = function(loc) {
        var currLoc = $location.path();

       if (currLoc.indexOf('cn') > -1) {
            var toLoc = "/cn/" + loc;
        } else {
            var toLoc = loc;
        }
        $location.path(toLoc); 
    };
// }}}
}]); 

controllers.controller('NotesController', ['$scope','$location', 'QueryService', function($scope, $location, QueryService) {
// {{{ Notes controller
//TODO
// }}}
}]); 

controllers.controller('FooterController', ['$scope', '$location', '$window', 'QueryService', function($scope, $location, $window, QueryService) {
// {{{ Footer controller
    $scope.socialMedias = QueryService.query_socials();
    $scope.languages = QueryService.query_languages();

    $scope.switchLang = function(lang) {
      var currLoc = $location.path();
      var is_cn = (currLoc.indexOf("cn") > -1);
      if (lang==="cn") {
          if (!is_cn) {
            $location.path("/cn" + currLoc);
            $window.location.reload();
          };
      } else {
          if (is_cn) {
            $location.path(currLoc.substring(3, currLoc.length));
            $window.location.reload();
          };
      };
    };
// }}}
}]); 

controllers.controller('MainController', ['$scope', 'QueryService', 'uiGmapGoogleMapApi', '$location',
    function($scope, QueryService, uiGmapGoogleMapApi, $location) {
// {{{ Main page controller
        if($location.path() === '/cn') {
            $scope.jumbotron = QueryService.query_jumbotron_cn();
            $scope.cities = QueryService.query_cities_cn();
        } else {
            $scope.jumbotron = QueryService.query_jumbotron();
            $scope.cities = QueryService.query_cities();
        }
        $scope.cityAge = "start";

        $scope.jumpTo = false;
        // toggle city details
        $scope.selectCity = function(city) {
            for (var i = 0; i < $scope.cities.length; i++) {
                if ($scope.cities[i].name !== city) {
                    $scope.cities[i].collapsed = false; 
                } else {
                    $scope.cities[i].collapsed = !($scope.cities[i].collapsed); 
                    var cityName = $scope.cities[i].name;
                    var latLong = $scope.cities[i].latLong;
                    var marker = $scope.cities[i].marker;
                }
            };
            // Google Maps
            $scope.map = {center: {latitude: latLong.latitude, longitude: latLong.longitude}, zoom: latLong.zoom};
            $scope.options = {scrollwheel: false};
            $scope.marker = {
                id: cityName,
                coords: {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                },
                icon: {url:"../static/icons/university.png"},
                options: { 
                    draggable: false,
                    labelContent: marker.name,
                    labelClass:"googleMapsMarker",
                    labelAnchor: "100 0",
                },
            };
        };
// }}}
}]); 

controllers.controller('SendModalController', ['$scope', '$location', '$modalInstance', 'modalWindow', 'sendStatus',
function($scope, $location, $modalInstance, modalWindow, sendStatus) {
// {{{ Send message modal controller
    $scope.modalWindow = modalWindow;
    $scope.ok = function () {
      $modalInstance.close();
      if(sendStatus) {
          var currLoc = $location.path();
          if (currLoc.indexOf('cn') > -1) {
              $location.path("/cn");
          } else {
              $location.path("/");
          }
      }
    };
// }}}
}]); 

controllers.controller('AboutController', ['$scope', '$location', 'QueryService', function($scope, $location, QueryService) {
// {{{ About page controller
    if($location.path() === '/cn/about') {
        $scope.abouts = QueryService.query_abouts_cn();
    } else {
        $scope.abouts = QueryService.query_abouts();
    }
// }}}
}]); 
