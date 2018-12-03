var changeText = d3.select("#legend") //selector del texto
  .style("font-family", "Rosario-Regular, Rosario-Regular");

function doStep(step) {

  function step0() {
    changeText
      .text("Estos fueron algunos de los congresistas con más votos en las pasadas elecciones.");
  };

  function step1() {
    changeText
      .text("pero...");
  };

  function step2() {
    changeText
      .text("¿Qué tienen en común estos congresistas?");
  };

  function step3() {
    changeText
      .text("¡Todos tienen familiares contratando con el estado!");
  };

  function step4() {
    changeText
      .style("font-size", "60px")
      .text("Veamos lo siguiente");

    var backViz = d3.select("#vis1")._groups[0].map(function(d) {
      if (d !== null) {

        d3.select("#vis1")
          .attr("id", "content");
        d3.select("svg").remove();
        d3.select("svg").remove();

        d3.select("#col1")
          .attr("class", "col-sm-6");

        d3.select("#content")
          .attr("id", "content")
          .attr("class", "col-sm-6");

        createBubble();

      };
    });
  };

  function step5() {

    d3.select("#col1")
      .attr("class", "col-sm-2");

    d3.select("#content")
      .attr("id", "vis1")
      .attr("class", "col-sm-10");

  changeText
      .style("font-size", "26px")
      .style("top", "50%")
      .style("font-weight", "bold" )
      .text("¿Conflicto de Intereses? ");

      changeText
      .append("p")
      .style("font-weight", "normal" )
      .style("font-size", "16px")
      .text("Conozca los montos de contratación realizados por los familiares de los congresistas. En la primera gráfica seleccione con un click la barra del congresista de su interés y sí desea más detalle puede seleccionar el familiar en la tercera gráfica con un click sostenido desplazando el mouse y observar el comportamiento de la contratación por años.");

    d3.select("#col1")
      .append("svg")
      .attr("width", 1)
      .attr("height", 10);

    createBarchart();

    d3.select(".marks")
      .style("zoom", 0.90)
      .style("width", "1300");

  };

  function step6() {
      changeText
      .style("font-size", "26px")
      .style("top", "50%")
      .style("font-weight", "bold" )
      .text("¿Conflicto de Intereses? ");

      changeText
      .append("p")
      .style("font-weight", "normal" )
      .style("font-size", "16px")
      .text("La siguiente visualización muestra la modalidad de contratación realizada por los familiares de los congresistas.Puede seleccionar la modalidad de su preferencias con un clic y sí lo desea puede seleccionar ordenar para visualizar las diferentes modalidades ordenadas.Para mostrar todas las modalidades, nuevamente dar un clic sobre la modalidad antes seleccionada");

    var backViz = d3.select("#vis1")._groups[0].map(function(d) {
      if (d !== null) {

        d3.select("#vis1")
          .attr("id", "content");
        d3.selectAll("svg").remove();

        d3.select("#col1")
          .attr("class", "col-sm-4");

        d3.select("#content")
          .attr("class", "col-sm-8");

        d3.select("#content")
          .append("label")
          .attr("id", "label")
          .text("Ordenar ")
          .style("color", "#D8D8D8")
          .style("font-family", "Rosario-Regular, Rosario-Regular");

        d3.select("label")
          .append("input")
          .attr("type", "checkbox");

        // crear stackbar
        createStackBar();

        $("#label").appendTo("#content");

        d3.select("#label")
          .style("font-family", "Rosario-Regular, Rosario-Regular")
          .style("font-size", "25px");

      };
    });
  };

  function step7() {
    changeText
      .text("Texto B");
  };

  function step8() {
    changeText
      .text("Texto para tree");

    d3.selectAll("svg").remove();

    d3.select("#col1")
      .attr("class", "col-sm-2");

    d3.select("#content")
      .attr("class", "col-sm-10");

      d3.select("label")
      .remove();

    createTree();

    d3.select("svg")
      // .style("zoom", 0.50)
      .style("width", "1860")
      .attr("transform", "translate( -350 , 0)");

    d3.select("svg")
      // .style("zoom", 0.50)
      .style("height", "490");



  };

  function step9() {
    changeText
      .text("")
      .style("font-size", "30px");

    d3.selectAll("svg").remove();

    d3.select("#col1")
      .attr("class", "col-sm-5");

    d3.select("#content")
      .style("zoom", 0.90)
      .attr("class", "col-sm-7");

    // llamar TableheadMap
    createTableHeadMap();

    d3.select("#legend")
      .append("div")
      .attr("id", "DD");

    // Cambiar nombre default de vega
    d3.select("span")
      .text("Seleccione el congresista");

    // ajustar tamanio SVG de Vega

    d3.select(".marks")
      .style("width", "820")
      .style("height", "650")
      .attr("transform", "translate( 100 , 5)");

    // Se mueve el dropdown generado por Vega a otro DIV
    $(".vega-bindings").appendTo("#DD");

  };

  if (step === "step 0") step0();
  else if (step === "step 1") step1();
  else if (step === "step 2") step2();
  else if (step === "step 3") step3();
  else if (step === "step 4") step4();
  else if (step === "step 5") step5();
  else if (step === "step 6") step6();
  else if (step === "step 7") step7();
  else if (step === "step 8") step8();
  else if (step === "step 9") step9();
  else if (step === "step 10") step10();
}
