// Get the context of the canvas element we want to select

var buyerData = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
      fillColor : "rgba(172,194,132,0.4)",
      strokeColor : "#ACC26D",
      pointColor : "#fff",
      pointStrokeColor : "#9DB86D",
      data : [625.43, 659.23, 770.41, 681.64, 536.51, 755.13, 433.63]
    }
  ]
}
var buyers = document.getElementById('buyers').getContext('2d');
new Chart(buyers).Line(buyerData);





