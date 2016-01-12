

ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise("/login")       // For any unmatched url, send to /route1
    $stateProvider
    .state('scan', {
        url: "/scan",
        data: {
            hocr: null,
            imageData: null,
            receiptData: {storeName: null, 
                storeAddress: null,
                storePhone: null,
                purchaseDate: null,
                total: null,
                totalTax: null,
                itemInfo: null}
        },
        views: {
            "main": { 
                templateUrl: "html_templates/scan.html",
                controller: function($scope, $state, $stateParams, menu){
                    console.log("entering state: scan");
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
                        console.log("entering state: scan.begin");
                        $scope.clickMenu = menu.toggle;

                        $scope.onFail = function (message) { 
                            alert('Failed because: ' + message);
                            $scope.capturing = "failed image capture";
                        }
                        $scope.onPhotoDataSuccess = function (imageData) {
                            _params = {};
                            _params.originalImage = imageData; 
                            $scope.capturing = "captured image";
                            if (imageData.length != 0) $state.go("scan.load", _params);
                        }
                        $scope.capturePhoto = function() { // 
                            //if (navigator.camera) $scope.onPhotoDataSuccess("<raw picture data>");
                            var destinationType=navigator.camera.DestinationType;
                            navigator.camera.getPicture(
                               $scope.onPhotoDataSuccess, 
                                $scope.onFail, 
                                { quality: 50, destinationType: destinationType.DATA_URL, 
                                  encodingType: Camera.EncodingType.JPEG, 
                                  targetWidth:1024, targetHeight:768, saveToPhotoAlbum:false }
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
                    controller: function($rootScope, $scope, $state, $stateParams, $http, tesseract, menu){
                        console.log("entering state: scan.load");
                        $scope.clickMenu = menu.toggle; 
                        imageData = $stateParams.originalImage;

                        if (!$rootScope.languageFilesAvailable) {
                            console.log("Initializing language files");
                            $rootScope.languageFilesAvailable = tesseract.copyLanguageFiles(
                                function() {$rootScope.languageFilesAvailable = true}, 
                                function() {$rootScope.languageFilesAvailable = false}
                            );
                            //if (!$rootScope.languageFilesAvailable) {
                            //     console.log("Unable to copy language files");
                            //     $state.go("login");
                            //}
                        }

                        tesseract.run(imageData,
                            function(results) {
                                _params = {}; 
                                //if (results == undefined) console.log("results is undefined");
                                //console.log(results);
                                //var parsedData = JSON.parse(results);
                                var parsedData = results;
                                _params.hocr = parsedData.hocr;
                                _params.imageData = parsedData.imageData;
                                $state.go("scan.annotate_primary_data", _params); 
                            }, function() {
                                return;
                            }
                        );
                    }
                }
            }
        })
        .state('scan.annotate_primary_data', {
            url: "/annotate_primary_data",
            params: {hocr: null, imageData: null},
            data: {imageData: null},
            views: {
                "scan_main": { 
                    templateUrl: "html_templates/scan.annotate_primary_data.html",
                    controller: function($scope, $state, $stateParams, menu, $sce){
                        $scope.clickMenu = menu.toggle;
                        console.log("entering state: scan.annotate_primary_data");
                        $state.current.data.imageData = $stateParams.imageData;
                        $state.current.data.hocr = $stateParams.hocr;
                        $scope.hocr = $sce.trustAsHtml($stateParams.hocr);
                        $scope.imageData = "data:image/jpeg;base64," + $stateParams.imageData;
                        //hocrDom = $.parseHTML(ocrResultsHtml);
                    }
                }
            }
        })
        .state('scan.annotate_item_data', {
            url: "/annotate_item_data",
            params: {hocr: null, imageData: null},
            views: {
                "scan_main": { 
                    templateUrl: "html_templates/scan.annotate_item_data.html",
                    controller: function($scope, $state, $stateParams, menu, $sce){
                        $scope.clickMenu = menu.toggle;
                        console.log("entering state: scan.annotate_item_data");
                        //$scope.hocr = $sce.trustAsHtml($stateParams.hocr);
                        //$scope.imageData = "data:image/jpeg;base64," + $stateParams.imageData;
                        $scope.hocr = $sce.trustAsHtml($state.current.data.hocr);
                        $scope.imageData = "data:image/jpeg;base64," + $state.current.data.imageData;
                    }
                }
            }
        })
        .state('scan.review', {
            url: "/review",
            views: {
                "scan_main": { 
                    templateUrl: "html_templates/scan.review.html",
                    controller: function($scope, $state, $stateParams, menu, $sce){
                        $scope.clickMenu = menu.toggle;
                        console.log("entering state: scan.review");

                    }
                }
            }
        })
});
