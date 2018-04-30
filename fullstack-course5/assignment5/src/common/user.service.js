(function () {
    "use strict";
    
    angular.module('common')
    .service('UserService', UserService);

    UserService.$inject = ['$http', 'ApiPath'];
    function UserService($http, ApiPath) {
      var service = this;
      var userInfo;

      service.getFavoriteItem = function(itemshortName) {
        var result = new Object;
        return $http({
          method: "GET",
          url: (ApiPath + "/menu_items/" + itemshortName.toUpperCase() + ".json"),
        }).then(function (response) {
          return response.data;
        }).catch(function (error) {
          return undefined;
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