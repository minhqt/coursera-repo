(function () {
    "use strict";
    
    angular.module('common')
    .service('UserService', UserService);

    UserService.$inject = ['$http', 'ApiPath'];
    function UserService($http, ApiPath) {
      var service = this;
      var userInfo = new Object;

      service.getFavoriteItem = function(itemshortName) {
        return $http({
          method: "GET",
          url: (ApiPath + "/menu_items/" + itemshortName.toUpperCase() + ".json"),
        }).then(function (result) {
          return result.data;
        }).catch(function (error) {
          return error;
        });
      }

      service.submit = function(user) {
        userInfo = user;
      };

      service.getUserInfo = function() {
        return userInfo;
      };
    
    }

})();