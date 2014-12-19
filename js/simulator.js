var City = function(deathRate, sliderId, dataset) {
  this.deathRate = deathRate;
  this.dataset = dataset;
  this.getDeathCountList();
  this.sliderSelector = "#" + sliderId;

  var city = this;

  $(this.sliderSelector).slider({
    values: [ deathRate ],
    change: function(event, ui){
      console.log(ui);
      // simulation.drawChart();
    }
  });
};

City.prototype.getDeathCountList = function(){

  this.deathrate = $(this.sliderSelector).slider("option", "value");

  var population = 100000;
  var deaths = 1;
  var generations = 0;

  var deaths_list = [];
  deaths_list.push(deaths);

  while(population > 0){
    deaths = Math.ceil(this.deathrate * deaths);
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

  for (var i = 0; i < this.chartWidth; i++){
    labels.push(i);
  }

  var datasets = [];

  for (var i = 0; i < this.cities.length; i++){
    datasets.push(cities[i].getChartDataset(data));
  }

  var data = {
    labels: labels,
    datasets: datasets
  };

  var chart = new Chart(context).Line(data);
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

var pistoria = new City(35 * 0.1 * 5, "pistoria-slider", pistoriaDataset);
var milan = new City(35 * 0.1 * 1, "milan-slider", milanDataset);

var cities = [pistoria, milan];

var simulation = new Simulation(cities);

var chart = simulation.drawChart();

