/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider', '$interpolateProvider'];

function config ($routeProvider, $locationProvider, $interpolateProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/albums',
      controllerAs: 'albumsIndexCtrl',
      controller: 'AlbumsIndexController'
    })
    .when('/albums/:id', {
      templateUrl: '/templates/albums-show',
      controllerAs: 'albumsShowCtrl',
      controller: 'AlbumsShowController'
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
}
