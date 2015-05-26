

var ezFinanceTrackerApp = angular.module('ezFinanceTrackerApp', [
  'ngRoute',
  'ezFinanceTrackerControllers',
  'ui.router'
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


    ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
      //$urlRouterProvider.otherwise("/login")       // For any unmatched url, send to /route1
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
        })
        .state('graph', {
            abstract: true,
            url: "/graph",
	    views: {
		"main": { 
                    templateUrl: "html_templates/graph.html",
		    controller: function($scope, $state, menu){
			$scope.clickMenu = menu.toggle;
                        $scope.currentGraph = "graph.graph1.html";
                        /*$state.go($scope.currentGraph);*/
			$scope.graphOptions = [
			  { label: 'Graph 1', value: 'graph.graph1' },
			  { label: 'Graph 2', value: 'graph.graph2' },
			  { label: 'Graph 3', value: 'graph.graph3' },
			  { label: 'Graph 4', value: 'graph.graph4' }
			];
			$scope.$watch('tt', function(value) {
			  if(value) {
			    $state.go(value);
			  }
			});
		    }
                }
	    }

        }) 
            .state('graph.graph1', {
	        url: "/graph1",
		views: {
		    "graph": { 
		       templateUrl: "html_templates/graph.graph1.html",
		       controller: function($scope, menu){
		           $scope.clickMenu = menu.toggle; 
		       }
		    }
		}
            })
            .state('graph.graph2', {
	        url: "/graph2",
		views: {
		    "graph": { 
		       templateUrl: "html_templates/graph.graph2.html",
		       controller: function($scope, menu){
		           $scope.clickMenu = menu.toggle; 
		       }
		    }
		}
            })
            .state('graph.graph3', {
	        url: "/graph3",
		views: {
		    "graph": { 
		       templateUrl: "html_templates/graph.graph3.html",
		       controller: function($scope, menu){
		           $scope.clickMenu = menu.toggle; 
		       }
		    }
		}
            })
            .state('graph.graph4', {
	        url: "/graph4",
		views: {
		    "graph": { 
		       templateUrl: "html_templates/graph.graph4.html",
		       controller: function($scope, menu){
		           $scope.clickMenu = menu.toggle; 
/*
document.onload = function() {
var data = [
    { value: 35.72, color:"#F7464A", highlight: "#FF5A5E", label: "Chipotle" },
    { value: 123.43, color: "#46BFBD", highlight: "#5AD3D1", label: "WholeFoods" },
    { value: 26.96, color: "#FDB45C", highlight: "#FFC870", label: "McDonalds" },
    { value: 23.15, color: "#19A347", highlight: "#33AD5C", label: "Wawa" },
    { value: 54.41, color: "#FF75D1", highlight: "#FF94DB", label: "Sushi Hut" }
];

var buyers1 = document.getElementById("buyers1").getContext('2d');
new Chart(buyers1).Doughnut(data);

     $(document).load(function() {
 
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("POST","http://45.55.160.70/pie_chart_data.php",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("user_name=" + $("input.user_name").val() ;  
        
        xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             var itemArray = JSON.parse(xmlhttp.responseText);
             itemfunction(itemArray);
            }
          }

        xmlhttp.open("GET", id, price, category, true);
        xmlhttp.send();
        function itemfunction(items){
        }
    });
*/
		       }
		    }

		}
            })

        .state('scan', {
            url: "/scan",
	    views: {
		"main": { 
		    templateUrl: "html_templates/scan.html",
		    controller: function($scope, $state, $stateParams, menu){
			$scope.clickMenu = menu.toggle;
		    }
		}
	    }
        })
	    .state('scan.begin', {
		url: "/begin",
		views: {
		    "scan_main": { 
			templateUrl: "html_templates/scan.begin.html",
			controller: function($scope, $state, menu){
			    $scope.clickMenu = menu.toggle;

			    $scope.onFail = function (message) { 
				alert('Failed because: ' + message);
				$scope.capturing = "failed image capture";
			    }
			    $scope.onPhotoDataSuccess = function (imageData) {
                                _params = {}
                                _params.originalImage = imageData; 
				//$state.current.data.originalImage = imageData; 
				$scope.capturing = "captured image";
                                if (imageData.length != 0) $state.go("scan.load", _params);
			    }
			    $scope.capturePhoto = function() { // 
                                var destinationType=navigator.camera.DestinationType;
				navigator.camera.getPicture(
				   $scope.onPhotoDataSuccess, 
				    $scope.onFail, 
				    { quality: 50, destinationType: destinationType.DATA_URL }
				);
			    };
			}
		    }
		}
	    })
	    .state('scan.load', {
		url: "/load",
                params: {originalImage: null},
		views: {
		  "scan_main": { 
		      templateUrl: "html_templates/scan.load.html",
		      controller: function($scope, $state, $stateParams, $http, menu){
		        $scope.clickMenu = menu.toggle; 
			/*var smallImage = document.getElementById('smallImage');
			smallImage.style.display = 'block';
			smallImage.src = "data:image/jpeg;base64," + imageData;*/
			imageData = $stateParams.originalImage;  //$state.current.data.originalImage;
                        //if (imageData.length != 0) $state.go("scan.review");
                        $http.post("http://45.55.160.70/upload_image.php", imageData).success(
                          function(responseData, status) {
                            //$state.current.data.processedResults = responseData;
                            _params = {}
                            _params.processedResults = responseData;
   			    $state.go("scan.review", _params); 
                          }
                        );
		      }
		  }
		}
	    })
	    .state('scan.review', {
		url: "/review",
                params: {processedResults: null},
		views: {
		    "scan_main": { 
			templateUrl: "html_templates/scan.review.html",
			controller: function($scope, $state, $stateParams, menu){
			    $scope.processedResults = $stateParams.processedResults;
			    $scope.clickMenu = menu.toggle;
			}
		    }
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