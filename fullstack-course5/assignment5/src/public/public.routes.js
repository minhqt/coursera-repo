(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
      url: '/signup',
      templateUrl: 'src/public/user/sign-up.html',
      controller: 'SignupController',
      controllerAs: 'signupCtrl'
    })
    .state('public.myinfo', {
      url: '/myinfo',
      templateProvider: ['UserService', '$templateRequest', function(UserService, $templateRequest) {
        var userInfo = UserService.getUserInfo();
        if (userInfo == undefined) {
          return $templateRequest('src/public/user/unregistered.template.html');
        } else {
          return $templateRequest('src/public/user/registered.template.html');
        }
      }],
      controller: 'MyInfoController',
      controllerAs: 'myInfoCtrl',
      resolve: {
        userInfo: ['UserService', function (UserService) {
          return UserService.getUserInfo();
        }],
        favoriteItem: ['UserService', function (UserService) {
          var user = UserService.getUserInfo();
          if (user == undefined || user.favorite == undefined) {
            return undefined;
          }
          return UserService.getFavoriteItem(user.favorite);
        }]
      }
    })
}
})();
