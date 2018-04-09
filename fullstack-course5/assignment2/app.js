(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
    var buyCtrl = this;

    buyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

    buyCtrl.bought = function (itemIndex) {
        ShoppingListCheckOffService.bought(itemIndex);
    }

    buyCtrl.isEmpty = function () {
        return this.items.length === 0;
    }
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
    var boughtCtrl = this;

    boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

    boughtCtrl.isEmpty = function () {
        return this.items.length === 0;
    }
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
        {name: "Egg", quantity: 10 },
        {name: "Cookie", quantity: 5 },
        {name: "Beer", quantity: 12 },
        {name: "Beef", quantity: 2 },
        {name: "Bread", quantity: 3 }
    ];
    var boughtItems = [];

    service.bought = function (itemIndex) {
        var boughtItem = toBuyItems[itemIndex];
        toBuyItems.splice(itemIndex, 1);
        boughtItems.push(boughtItem);
    }

    service.getToBuyItems = function () {
        return toBuyItems;
    }

    service.getBoughtItems = function () {
        return boughtItems;
    }
}

})();