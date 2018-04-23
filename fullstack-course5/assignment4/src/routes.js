(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/restaurant/templates/home.template.html'
  })

  // Categories List
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/restaurant/templates/category-list.template.html',
    controller: 'CategoryController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item List
  .state('items', {
    url: '/categories/{categoryShortName}/items',
    templateUrl: 'src/restaurant/templates/item-list.template.html',
    controller: 'ItemController as itemList',
    resolve: {
      category: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }],
    }
  });

}

})();
