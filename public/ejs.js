

$(document).ready(function() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var xval = document.getElementById("x_val");
  var yval = document.getElementById("y_val");

  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [40, 40, 40, 40, 40, 40, 40]
    }]
  };
  var options = {
    animation: false,
    scaleOverride: true,
    scaleSteps: 10,
    scaleStepWidth: 10,
    scaleStartValue: 0
  };

  xval.innerHTML = 90;
  yval.innerHTML = "July";

  var myLineChart = new Chart(ctx).Line(data, options);

  setInterval(function() {

    let x = <%=defaultItems[0].no%>;

    data.datasets[0].data.push(x);
    data.datasets[0].data.shift();
    xval.innerHTML = x;


    var nextMonthIndex = months.indexOf(data.labels[data.labels.length - 1]) + 1;
    var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "January";
    data.labels.push(nextMonthName);



    data.labels.shift();
    yval.innerHTML = nextMonthName;




    var myLineChart = new Chart(ctx).Line(data, options);
  }, 1500);



  // function setLabels(labels) {
  //   var nextMonthIndex = months.indexOf(labels[labels.length - 1]) + 1;
  //   var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "January";
  //   labels.push(nextMonthName);
  //   labels.shift();
  //   yval.innerHTML = nextMonthName;
  //
  // }

  // function setData(data) {
  //   var x = Math.floor(Math.random() * 100) + 1 ;
  //   data.push(x);
  //   data.shift();
  //   xval.innerHTML = x;
  // }

  function convertMonthNameToNumber(monthName) {
    var myDate = new Date(monthName + " 1, 2022");
    var monthDigit = myDate.getMonth();
    return isNaN(monthDigit) ? 0 : (monthDigit + 1);
  }

  var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

});
