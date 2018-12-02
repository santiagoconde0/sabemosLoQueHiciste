
  d3.json("data/datadetallada1.json").then(function(data) {
console.log("Data", data);
    // Se hace nest para organizar los datos en jerarquias
    var nestData = d3.nest()
      .key(function(d) {
        return d.Congresista;
      })
      .key(function(d) {

        console.log(d.Vínculo + ": " + d.Contratista );
        return d.Vínculo.toUpperCase() + ": " + d.Contratista ;
      })
      .rollup(d => {
        return d3.sum(d, d => +d.valor_total_contratos);
      })
      .key(function(d) {
        return d.nombre_entidad;
      })
      .entries(data)
      .sort(function(a, b) {
        return d3.descending(a.values, b.values);
      });

    console.log("nestData", nestData);

    var nestedDataAsTree = ({
      key: "Congresistas",
      values: nestData
    });

    d3.select("#content")
    .append("p")
    .text(JSON.stringify(nestedDataAsTree))


  });
