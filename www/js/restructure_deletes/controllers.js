var ezFinanceTrackerControllers = angular.module('ezFinanceTrackerControllers', []);

ezFinanceTrackerControllers.controller('LoginCtrl', ['$scope', 
  function($scope) {
/*$("#Login").click(function() {
  localStorage.setItem("username", $("form.login > input.username").val());
  var date = new Date();
  date.setDate(date.getDate() + 1);
  localStorage.setItem("expirationDate", date);
  if (localStorage.getItem("username") != "") {
    window.location.href = "/#/splash"
  }
});



// keeps footer from moving when virtual keyboard appears
var initialScreenSize = window.innerHeight;
window.addEventListener("resize", function() {
    if(window.innerHeight < initialScreenSize){
        $("footer").hide();
    }
    else{
        $("footer").show();
    }
});
*/

  }
]);

ezFinanceTrackerControllers.controller('SplashCtrl', ['$scope', 
  function($scope) {

  }
]);

var ezFinanceTrackerControllers = angular.module('ezFinanceTrackerControllers', []);

ezFinanceTrackerControllers.controller('RegisterCtrl', ['$scope', 
  function($scope) {

  }
]);

var ezFinanceTrackerControllers = angular.module('ezFinanceTrackerControllers', []);

ezFinanceTrackerControllers.controller('GraphsCtrl', ['$scope', 
  function($scope) {

  }
]);


ezFinanceTrackerControllers.controller('ReceiptDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.receiptId = $routeParams.receiptId;
  }
]);