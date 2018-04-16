(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");;

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            onRemove: '&',
            notFound: '&'
        }
    };

    return ddo;
}

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
    var narrow = this;
    var service = MenuSearchService;
    var isNotFound = false;

    narrow.found = [];

    narrow.search = function () {
        if (!$scope.searchItem) {
            isNotFound = true;
            narrow.found = [];
            return -1;
        }

        isNotFound = false;

        var promise = service.getMatchedMenuItems($scope.searchItem);
        promise.then(function (result) {
            if (!result || result.length == 0) {
                isNotFound = true;
            }
            narrow.found = result;
        }).catch(function (error) {
            console.log(error);
        });
    };

    narrow.removeItem = function (itemIndex) {
        narrow.found.splice(itemIndex, 1);
    };

    narrow.isNotFound = function () {
        return isNotFound;
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var search = this;

    search.getMatchedMenuItems = function (searchItem) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
        }).then(function (result) {
            var foundItems = [];
            searchItem = searchItem.toLowerCase();
            for (var i = 0; i < result.data.menu_items.length; i++) {
                var item = result.data.menu_items[i];
                var description = item.description.toLowerCase();
                if (description.search(searchItem) > -1) {
                    foundItems.push(item);
                }
            }
            return foundItems;
        });
    };
}

})();