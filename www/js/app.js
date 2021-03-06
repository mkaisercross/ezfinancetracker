
var ezFinanceTrackerApp = angular.module('ezFinanceTrackerApp', [
  'ui.router',
  'ngSanitize'
]);

ezFinanceTrackerApp.factory('menu', function() {
    return {
        toggle: function() {
             $("#menu").toggleClass('active');
             $("#menuLink").toggleClass('active');
             $("#layout").toggleClass('active');
        }
    };
});



ezFinanceTrackerApp.factory('tesseract', tesseractFactory);


ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise("/login")
    $stateProvider
    .state('login', {
        url: "",
        views: {
            "main": { templateUrl: "html_templates/login.html" }
        },
        /*templateUrl: "",*/
        controller: function($scope){
          $scope.items = ["A", "List", "Of", "Items"];

        }
    })
    .state('splash', {
        url: "/splash",
        views: {
          "main": { 
             templateUrl: "html_templates/splash.html",
             controller: function($scope, menu) {
               $scope.clickMenu = menu.toggle; 
             }
           }
        }
    });

});


