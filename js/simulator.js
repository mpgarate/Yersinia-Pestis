var City = function(deathRate) {
    this.deathRate = deathRate;
    this.getDeathCountList();
};

City.prototype.getDeathCountList = function(){
  var population = 100000;
  var deaths = 1;
  var generations = 0;

  var deaths_list = [];
  deaths_list.push(deaths);

  while(population > 0){
    deaths = Math.ceil((1 + this.deathRate) * deaths);
    population = population - deaths;

    generations++;
    deaths_list.push(deaths);
  }

  console.log(deaths_list);

  this.duration = deaths_list.length;
  return deaths_list;
}

var pistoria = new City(35 * 0.1 * 5);
var milan = new City(35 * 0.1 * 1);

var context = $("#sim_chart").get(0).getContext("2d");

var labels = [];

for (var i = 0; i < pistoria.duration || i < milan.duration; i++){
  labels.push(i);
}

console.log(labels);

var data = {
  labels: labels,
  datasets: [
    {
      label: "Pistoia: prevention and coping",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: pistoria.getDeathCountList()
    },
    {
      label: "Milan: Quarantine",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: milan.getDeathCountList()
    }
  ]
};


var chart = new Chart(context).Line(data);


