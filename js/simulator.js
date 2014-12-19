var City = function(deathRate, dataset, isCustom) {
  if (typeof isCustom === "undefined"){
    isCustom = false;
  }

  this.deathRate = deathRate;
  this.dataset = dataset;
  this.getDeathCountList();

  if (! isCustom){
    return;
  }

  this.params = {"c": 14, "b": 0.1, "y": 5};
  this.drawParamValues();
  this.updateDeathRate();

  var city = this;

  $("#c-slider").slider({
    value: city.params["c"],
    min: 10,
    max: 50,
    change: function(event, ui){
      city.params.c = ui.value;
      city.updateDeathRate();
      simulation.drawChart();
      city.drawParamValues();
    }
  });

  $("#b-slider").slider({
    value: city.params["b"],
    min: 11,
    max: 100,
    change: function(event, ui){
      city.params.b = ui.value / 100;
      city.updateDeathRate();
      simulation.drawChart();
      city.drawParamValues();
    }
  });

  $("#y-slider").slider({
    value: city.params["y"],
    min: 1,
    max: 50,
    change: function(event, ui){
      city.params.y = ui.value;
      city.updateDeathRate();
      simulation.drawChart();
      city.drawParamValues();
    }
  });

};

City.prototype.drawParamValues = function(){
    var params = this.params;

    $(".c-value").html("").html(params["c"]);
    $(".b-value").html("").html(params["b"]);
    $(".y-value").html("").html(params["y"]);
}

City.prototype.updateDeathRate = function(){
  var params = this.params;
  console.log(params);
  this.deathRate = params.c * params. b * params.y;
}

City.prototype.getDeathCountList = function(){
  var population = 100000;
  var deaths = 1;
  var generations = 0;

  var deaths_list = [];
  deaths_list.push(deaths);

  while(population > 0){
    deaths = Math.ceil(this.deathRate * deaths);
    population = population - deaths;

    generations++;
    deaths_list.push(deaths);
  }

  this.duration = deaths_list.length;
  return deaths_list;
}

City.prototype.getChartDataset = function(){
  this.dataset.data = this.getDeathCountList();
  return this.dataset;
}

var Simulation = function(cities){
  this.cities = cities;
  this.updateChartWidth();
}

Simulation.prototype.updateChartWidth = function(){
  var chartWidth = 0;

  for (var i = 0; i < this.cities.length; i++){
    var cityOutbreakLength = cities[i].duration;
    if (cityOutbreakLength > chartWidth){
      chartWidth = cityOutbreakLength;
    }
  }

  this.chartWidth = chartWidth;
}

Simulation.prototype.drawChart = function(){
  var context = $("#sim_chart").get(0).getContext("2d");
  var labels = [];

  var datasets = [];

  for (var i = 0; i < this.cities.length; i++){
    datasets.push(cities[i].getChartDataset(data));
  }

  this.updateChartWidth();
  for (var i = 0; i < this.chartWidth; i++){
    labels.push(i);
  }

  var data = {
    labels: labels,
    datasets: datasets
  };

  var chartOptions = {
    xAxisLabel: "Days",
    yAxisLabel: "Deaths"
  }

  if (typeof this.chart === "undefined"){
    this.chart = new Chart(context).Line(data, chartOptions);
  } else {
    this.chart.destroy();
    this.chart = new Chart(context).Line(data, chartOptions);
  }

  if (this.isCustom){
    this.drawParamValues();
  }

  return chart;
}

var pistoriaDataset = {
  label: "Pistoia: prevention and coping",
  fillColor: "rgba(220,220,220,0.2)",
  strokeColor: "rgba(220,220,220,1)",
  pointColor: "rgba(220,220,220,1)",
  pointStrokeColor: "#fff",
  pointHighlightFill: "#fff",
  pointHighlightStroke: "rgba(220,220,220,1)"
}

var milanDataset = {
  label: "Milan: Quarantine",
  fillColor: "rgba(151,187,205,0.2)",
  strokeColor: "rgba(151,187,205,1)",
  pointColor: "rgba(151,187,205,1)",
  pointStrokeColor: "#fff",
  pointHighlightFill: "#fff",
  pointHighlightStroke: "rgba(151,187,205,1)"
}

var customDataset = {
  label: "Custom City",
  fillColor: "rgba(205,151,151,0.2)",
  strokeColor: "rgba(205,151,151,1)",
  pointColor: "rgba(205,151,151,1)",
  pointStrokeColor: "#fff",
  pointHighlightFill: "#fff",
  pointHighlightStroke: "rgba(205,151,151,1)"
}

var pistoria = new City(35 * 0.1 * 4.3, pistoriaDataset);
var milan = new City(35 * 0.1 * 1, milanDataset);
var customCity = new City(1.5, customDataset, true);

var cities = [pistoria, milan, customCity];

var simulation = new Simulation(cities);

var chart = simulation.drawChart();

