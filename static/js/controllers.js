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
}]); 

controllers.controller('ContactController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
    $scope.contactForm = {};
    $scope.contactForm.email = "";

    /* Email Typeahead */
    $scope.emails = ['gmail.com', 'yahoo.com', 'hotmail.com', 'sina.com', 'sohu.com', '163.com', 'qq.com', 'uiowa.edu', 'tongji.edu.cn'];
    
    $scope.emailTypeAhead = function(email, viewValue) {
        var atPos = viewValue.indexOf("@");
        $scope.emailName = viewValue.substr(0, atPos);
        var emailDomain = viewValue.substr(atPos+1, viewValue.length);
        return (atPos > -1) & (email.substr(0, emailDomain.length).toLowerCase() == viewValue.substr(atPos+1, viewValue.length).toLowerCase())
    }

    $scope.onSelect = function() {
        // complete the whole address
        $scope.contactForm.email = $scope.emailName + "@" + $scope.contactForm.email;
    }
    /* * * * * * * * * */


    $scope.modalWindow = {};

    $scope.send = function() {

      var d = new Date();
      // set timezone
      d.setTime(d.getTime() - d.getTimezoneOffset()*60*1000);
      $scope.contactForm.timestamp = d.toJSON();

	  $http.post('/contact', $scope.contactForm)
		.success(function(data) {

          $scope.modalWindow.title = "Successful!";
          $scope.modalWindow.content = "Thank you for your message! You will receive a confirmation email.";
          $scope.modalWindow.color = {"color":"LightSeaGreen"};
          $scope.modalWindow.button = "btn-primary";

          var modalInstance = $modal.open({
            templateUrl: '../static/partials/sendModal.html',
            controller: 'SendModalController',
            resolve: {
              modalWindow: function () {
                return $scope.modalWindow;
              },
              sendStatus: function() {
                return true;    
              }
            }
         });
       })
		.error(function(data) {

          $scope.modalWindow.title = "Error!";
          $scope.modalWindow.content = "Please check your input.";
          $scope.modalWindow.color = {"color":"OrangeRed"};
          $scope.modalWindow.button = "btn-warning";

          var modalInstance = $modal.open({
            templateUrl: '../static/partials/sendModal.html',
            controller: 'SendModalController',
            resolve: {
              modalWindow: function () {
                return $scope.modalWindow;
              },
              sendStatus: function() {
                return false;    
              }
            }
          });

        })
    };
// }}}

}]); 

controllers.controller('ContactController', ['$scope', '$http', '$modal', '$location', 'QueryService', function($scope, $http, $modal, $location, QueryService) {
// {{{ Contact page controller

    if($location.path() === '/cn/contact') {
        $scope.content = QueryService.query_contact_cn();
    } else {
        $scope.content = QueryService.query_contact();
    }

    $scope.contactForm = {};
    $scope.contactForm.email = "";

/* Email Typeahead */ 
    $scope.emails = ['gmail.com', 'yahoo.com', 'hotmail.com', 'sina.com', 'sohu.com', '163.com', 'qq.com', 'uiowa.edu', 'tongji.edu.cn'];
    
    $scope.emailTypeAhead = function(email, viewValue) {
        var atPos = viewValue.indexOf("@");
        $scope.emailName = viewValue.substr(0, atPos);
        var emailDomain = viewValue.substr(atPos+1, viewValue.length);
        return (atPos > -1) & (email.substr(0, emailDomain.length).toLowerCase() == viewValue.substr(atPos+1, viewValue.length).toLowerCase())
    }

    $scope.onSelect = function() {
        // complete the whole address
        $scope.contactForm.email = $scope.emailName + "@" + $scope.contactForm.email;
    }
/* * * * * * * * * */

    $scope.modalWindow = {};

    $scope.send = function() {

      var email = require("../node_modules/emailjs/email");
      var server = email.server.connect({
        user:    "webofzuo@gmail.com", 
        password:"webofzuo19491001", 
        host:    "smtp.gmail.com", 
        ssl:     true
      });

      var d = new Date();
      // set timezone
      d.setTime(d.getTime() - d.getTimezoneOffset()*60*1000);
      $scope.contactForm.timestamp = d.toJSON();

	  console.log($scope.contactForm);

      server.send({
        text:    $scope.contactForm.content, 
        from:    "you <webofzuo@gmail.com>", 
        to:      "you <webofzuo@gmail.com>",
        subject: $scope.contactForm.subject
      }, function(err, message) { console.log(err || message); });
    }
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
