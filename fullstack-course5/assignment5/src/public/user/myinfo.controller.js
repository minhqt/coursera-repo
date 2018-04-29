(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['userInfo', 'favoriteItem', 'ApiPath'];
    function MyInfoController(userInfo, favoriteItem, ApiPath) {
        var $ctrl = this;
        $ctrl.user = userInfo;
        $ctrl.favorite = favoriteItem;
        $ctrl.basePath = ApiPath;
    }
    
    
    })();
    