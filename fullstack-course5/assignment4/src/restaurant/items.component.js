(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/restaurant/templates/item-list.template.html',
  bindings: {
    items: '<'
  }
});

})();
