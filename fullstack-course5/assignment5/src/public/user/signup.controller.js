(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignupController', SignupController);
    
    SignupController.$inject = ['UserService'];
    function SignupController(UserService) {
        var $ctrl = this;
        $ctrl.user = null;
        $ctrl.unvalidFavorite;
        $ctrl.completed = false;

        $ctrl.validateFavorite = function() {
            var promise = UserService.getFavoriteItem($ctrl.user.favorite);
            promise.then(function (result) {
                $ctrl.unvalidFavorite = (result == undefined);
            }).catch(function (error) {
                $ctrl.unvalidFavorite = true;
            });
        };

        $ctrl.isInvalid = function() {
            return $ctrl.unvalidFavorite == true || $ctrl.unvalidFavorite == undefined;
        };

        $ctrl.submit = function() {
            UserService.submit($ctrl.user);
            $ctrl.completed = true;
        };
    }
    
    
    })();
    