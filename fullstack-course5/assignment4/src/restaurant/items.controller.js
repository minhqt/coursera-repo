(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemController', ItemController);


ItemController.$inject = ['$stateParams', 'category'];
function ItemController($stateParams, category) {
  var itemList = this;
  itemList.items = category.menu_items;
  itemList.category = category.category.name;
;
}

})();
