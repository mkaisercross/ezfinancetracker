//ezFinanceTrackerApp.factory('tesseract', tesseractFactory);

/*function classifyOcrToReceipt(ocrDom) {

    conditionActionMap = [
        [function(node) {
            if (!node.hasClass('ocrx_word')) 

            return 
         }, 
         function(f) {return f()}], 
    ];

    recursivelyIterate(conditionActionMap, ocrDom);

}

function recursivelyIterate(conditionActionMap, node, args) {
    for (i = conditionActionMap) {
        if (i[0](node)) return i[1](arguments.callee.caller, conditionActionMap);
    }
    return;
}
*/





ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise("/login")       // For any unmatched url, send to /route1
    $stateProvider
    .state('scan', {
        url: "/scan",
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
                                $state.go("scan.annotate", _params); 
                            }, function() {
                                return;
                            }
                        );
                    }
                }
            }
        })
        .state('scan.annotate', {
            url: "/annotate",
            params: {hocr: null, imageData: null},
            views: {
                "scan_main": { 
                    templateUrl: "html_templates/scan.annotate.html",
                    controller: function($scope, $state, $stateParams, menu, $sce){
                        $scope.clickMenu = menu.toggle;
                        console.log("entering state: scan.annotate");
                        //console.log($stateParams.hocr);
                        //console.log($stateParams.imageData);
                        $scope.hocr = $sce.trustAsHtml($stateParams.hocr);
                        $scope.imageData = "data:image/jpeg;base64," + $stateParams.imageData;
                        //$.parseHTML(ocrResultsHtml);

                    }
                }
            }
        })
        .state('scan.review', {
            url: "/review",
            params: {receiptData: null},
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
