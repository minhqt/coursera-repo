(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://zero-qt.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
