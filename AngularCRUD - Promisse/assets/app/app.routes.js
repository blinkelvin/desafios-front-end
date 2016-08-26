/**
 * @author MStech - 01/07/2016
 * */
(function () {

  angular
    .module("app.routes")
    .config(Route);

  Route.$inject = ["$routeProvider", "$locationProvider"];

  function Route($routeProvider, $locationProvider) {

    $routeProvider.when("/", {
      templateUrl: "views/home.html",
      controller: "HomeController",
      name: "HomeController"
    });

    $routeProvider.otherwise({
      templateUrl: "views/home.html",
      controller: "HomeController as vm",
      name: "HomeController"
    });

    $locationProvider.html5Mode(false);
  }
})();
