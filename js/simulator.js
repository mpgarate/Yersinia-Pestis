var City = function(deathRate, dataset, sliderId) {
  this.deathRate = deathRate;
  this.dataset = dataset;
  this.getDeathCountList();

  if (typeof sliderId === 'undefined'){
    return;
  }

  this.sliderSelector = "#" + sliderId;

  var city = this;

  $(this.sliderSelector).slider({
    values: [ deathRate ],
    change: function(event, ui){
      console.log(ui);
      city.deathRate = ui.value;
      simulation.drawChart();
    }
  });
};

City.prototype.getDeathCountList = function(){
  var population = 100000;
  var deaths = 1;
  var generations = 0;

  var deaths_list = [];
  deaths_list.push(deaths);

  while(population > 0){
    console.log(this.deathRate);
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

  console.log(data);

  if (typeof this.chart === "undefined"){
    this.chart = new Chart(context).Line(data);
  } else {
    this.chart.destroy();
    this.chart = new Chart(context).Line(data);
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
  fillColor: "rgba(151,187,205,0.2)",
  strokeColor: "rgba(151,187,205,1)",
  pointColor: "rgba(151,187,205,1)",
  pointStrokeColor: "#fff",
  pointHighlightFill: "#fff",
  pointHighlightStroke: "rgba(151,187,205,1)"
}

var pistoria = new City(35 * 0.1 * 5, pistoriaDataset);
var milan = new City(35 * 0.1 * 1, milanDataset);
var customCity = new City(1.5, customDataset, "custom-city-slider");

var cities = [pistoria, milan, customCity];

var simulation = new Simulation(cities);

var chart = simulation.drawChart();

