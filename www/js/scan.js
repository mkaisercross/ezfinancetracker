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
                        /*var smallImage = document.getElementById('smallImage');
                        smallImage.style.display = 'block';
                        smallImage.src = "data:image/jpeg;base64," + imageData;*/
                        imageData = $stateParams.originalImage;  //$state.current.data.originalImage;
                        //if (imageData.length != 0) $state.go("scan.review");

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
                                //var parsedData = JSON.parse("{\"hocr\":\"<div class='ocr_page' id='page_1' title='image \\\"\\\"; bbox 0 0 432 768; ppageno 0'>\\n   <div class='ocr_carea' id='block_1_1' title=\\\"bbox 6 0 432 768\\\">\\n    <p class='ocr_par' dir='ltr' id='par_1_1' title=\\\"bbox 6 0 432 768\\\">\\n     <span class='ocr_line' id='line_1_1' title=\\n\",\"imageData\":\"TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=\"}"/*results*/);
                                //var parsedData = JSON.parse(results);
                                var parsedData = results;
                                _params.hocr = parsedData.hocr;
                                _params.imageData = parsedData.imageData;
                                //console.log(results);
                                $state.go("scan.review", _params); 
                            }, function() {
                                return;
                            }
                        );

                        /*$http.post("http://45.55.160.70/upload_image.php", imageData).success(
                          function(responseData, status) {
                            //$state.current.data.processedResults = responseData;
                            _params = {}
                            _params.processedResults = responseData;
                            _params.processedResults = run_tesseract("hello");
                               $state.go("scan.review", _params); 
                          }
                        );*/
                    }
                }
            }
        })
        .state('scan.review', {
            url: "/review",
            params: {hocr: null, imageData: null},
            views: {
                "scan_main": { 
                    templateUrl: "html_templates/scan.review.html",
                    controller: function($scope, $state, $stateParams, menu, $sce){
                        console.log("entering state: scan.review");
                        console.log($stateParams.hocr);
                        console.log($stateParams.imageData);
                        $scope.hocr = $sce.trustAsHtml($stateParams.hocr);
                        $scope.imageData = "data:image/jpeg;base64," + $stateParams.imageData;
                        //$.parseHTML(ocrResultsHtml);
                        $scope.clickMenu = menu.toggle;
                    }
                }
            }
        })
});
