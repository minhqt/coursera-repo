(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/restaurant/templates/category-list.template.html',
  bindings: {
    categories: '<'
  }
});

})();
