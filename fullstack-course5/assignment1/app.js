(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', ['$scope', LunchCheckController]);

function LunchCheckController($scope) {
    $scope.lunchMenu = "";
    $scope.result = "";

    $scope.clearResult = function () {
        $scope.result = "";
        $scope.warnMessage = "";
        $scope.lunchMenuStyle = "";
    };

    $scope.checkLunchMenu = function () {
        var result = parseLunchMenu($scope.lunchMenu);
        $scope.lunchMenuStyle = {"border-color" : "green"};
        $scope.messageStyle = {"color" : "green"};
        var result = parseLunchMenu($scope.lunchMenu);
        if (result.count == 0) {
            $scope.result = "Please enter data first";
            $scope.lunchMenuStyle = {"border-color" : "red"};
            $scope.messageStyle = {"color" : "red"};
        } else if (result.count <= 3) {
            $scope.result = "Enjoy!";
        } else if (result.count > 3) {
            $scope.result = "Too much!";
        } else {
            $scope.result = "Too much!";
        }
        $scope.warnMessage = result.msg;
    };

    function parseLunchMenu(lunchMenu) {
        var count = 0;
        var warnMsg = "";
        var items = lunchMenu.split(',');
        if (items != null || items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                if (items[i] == null || items[i].trim().length == 0) {
                    warnMsg = "WARN: Empty items are not counted!";
                    continue;
                }
                count++;
            }
        }
        return {count : count, msg : warnMsg};
    }
}

})();