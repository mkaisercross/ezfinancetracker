ezFinanceTrackerApp.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise("/login")
    $stateProvider    
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
                        
                        /*
                        var data = [
                                 { value: 35.72, color:"#F7464A", highlight: "#FF5A5E", label: "Chipotle" },
                                 { value: 123.43, color: "#46BFBD", highlight: "#5AD3D1", label: "WholeFoods" },
                                 { value: 26.96, color: "#FDB45C", highlight: "#FFC870", label: "McDonalds" },
                                 { value: 23.15, color: "#19A347", highlight: "#33AD5C", label: "Wawa" },
                                 { value: 54.41, color: "#FF75D1", highlight: "#FF94DB", label: "Sushi Hut" }
                        ];
                        
                        var buyers1 = document.getElementById("buyers1").getContext('2d');
                        new Chart(buyers1).Doughnut(data);
                        */
                        /*$(document).load(function() {

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
                        });*/
                        

                    }
                }
            }
        })
        .state('graph.graph2', {
            url: "/graph2",
            views: {
                "graph": { 
                    templateUrl: "html_templates/graph.graph1.html",
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
                    templateUrl: "html_templates/graph.graph1.html",
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
                    templateUrl: "html_templates/graph.graph1.html",
                    controller: function($scope, menu){
                        $scope.clickMenu = menu.toggle; 
                    }
                }
            }
        })
});