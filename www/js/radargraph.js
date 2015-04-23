var radardata = {
    labels: ["Groceries", "Entertainment", "Gas & Fuel", "Clothing", "Alcohol & Bars", "Coffee Shops"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [81.50, 59.62, 90.50, 25.49, 40.67, 24.29,]
        }
    ]
};

var buyers2 = document.getElementById('buyers2').getContext('2d');
new Chart(buyers2).Radar(radardata);


