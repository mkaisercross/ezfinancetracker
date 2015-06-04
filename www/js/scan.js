ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise("/login")       // For any unmatched url, send to /route1
    $stateProvider
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
                        _params.processedResults = window.tesseract.run("hello");
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
});
