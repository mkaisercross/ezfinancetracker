var bardata = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Credit",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [625.43, 659.23, 770.41, 681.64, 536.51, 755.13, 433.63]
        }
    ]
};

var buyers3 = document.getElementById('buyers3').getContext('2d');
new Chart(buyers3).Bar(bardata);


