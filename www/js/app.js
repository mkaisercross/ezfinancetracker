var ezFinanceTrackerApp = angular.module('ezFinanceTrackerApp', [
  'ngRoute',
  'ezFinanceTrackerControllers',
  'ui.router'
]);

    ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
      //$urlRouterProvider.otherwise("/login")       // For any unmatched url, send to /route1
      $stateProvider
        .state('login', {
            url: "",
	    views: {
      	      "main": { templateUrl: "include_views/login.html" }
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
                 templateUrl: "include_views/splash.html",
                 controller: function($scope) {
                   $scope.clickMenu = function() {
                     /*e.preventDefault();*/
		     $("#menu").toggleClass('active');
		     $("#menuLink").toggleClass('active');
		     $("#layout").toggleClass('active');
                   };
                 }
               }
	    }
        })
        .state('graphs', {
            url: "/graphs",
	    views: {
      	      "main": { templateUrl: "include_views/graph.html" }
	    },
            controller: function($scope){
              $scope.items = ["A", "List", "Of", "Items"];
            }
        })
          .state('graphs.graph1', {
              url: "/graphs",
   	      views: {
      	        "graph": { templateUrl: "include_views/graphs.graphs1.html" }
	      },
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
          .state('graphs.graph2', {
              url: "/graphs",
   	      views: {
      	        "graph": { templateUrl: "include_views/graphs.graphs2.html" }
	      },
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
        .state('scan', {
            url: "/scan",
	    views: {
      	      "main": { templateUrl: "include_views/login.html" }
	    },
            controller: function($scope){
              $scope.items = ["A", "List", "Of", "Items"];
            }
        })
          .state('scan.begin', {
              url: "/scan",
   	      views: {
      	        "scan-main": { templateUrl: "include_views/scan.begin.html" }
	      },
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
          .state('scan.load', {
              url: "/scan",
   	      views: {
      	        "scan-main": { templateUrl: "include_views/scan.load.html" }
	      },
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
          .state('scan.review', {
              url: "/scan",
   	      views: {
      	        "scan-main": { templateUrl: "include_views/scan.review.html" }
	      },
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
    })


/*
ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/",
      templateUrl: "partials/login.html"
    })
    .state('splash', {
      url: "/splash",
      templateUrl: "partials/splash.html"
    })
    .state('splash.menu', {
      url: "/splash.menu",
      templateUrl: "splash/splash.menu.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    });
});
*/
/*
ezFinanceTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/splash', {
        templateUrl: 'partials/splash.html',
        controller: 'SplashCtrl'
      }).
      when('/visualizations/:visualizationId', {
        templateUrl: 'partials/visualization.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/receipts/:receiptId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
]);
*/