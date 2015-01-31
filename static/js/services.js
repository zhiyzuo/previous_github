"use strict";

var services = angular.module('MyWebServices', ['ngResource']);

services.factory('QueryService', ['$resource',
  function($resource){
    return $resource('static/json/:queryID.json', {}, {
      query_navbar: {method:'GET', params:{queryID:'navbar'}, isArray:false},
      query_navbar_cn: {method:'GET', params:{queryID:'navbar_cn'}, isArray:false},
      query_jumbotron: {method:'GET', params:{queryID:'jumbotron'}, isArray:false},
      query_jumbotron_cn: {method:'GET', params:{queryID:'jumbotron_cn'}, isArray:false},
      query_socials: {method:'GET', params:{queryID:'socials'}, isArray:true},
      query_languages: {method:'GET', params:{queryID:'languages'}, isArray:true},
      query_cities: {method:'GET', params:{queryID:'cities'}, isArray:true},
      query_cities_cn: {method:'GET', params:{queryID:'cities_cn'}, isArray:true},
      query_contact: {method:'GET', params:{queryID:'contact'}, isArray:false},
      query_contact_cn: {method:'GET', params:{queryID:'contact_cn'}, isArray:false},
      query_abouts: {method:'GET', params:{queryID:'abouts'}, isArray:true},
      query_abouts_cn: {method:'GET', params:{queryID:'abouts_cn'}, isArray:true},
    });
  }]);
