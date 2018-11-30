function doStep(step) {
  var changeText = d3.select("#legend"); //selector del texto

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
      .style("font-size", "25px")
      .style("top", "50%")
      .text("pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi");

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
    .style("font-size", "60px")
    .text("Texto para stackbar");

    var backViz = d3.select("#vis1")._groups[0].map(function(d) {
      if (d !== null) {

        d3.select("#vis1")
          .attr("id", "content");
        d3.select("svg").remove();
        d3.select("svg").remove();

        d3.select("#col1")
          .attr("class", "col-sm-4");

        d3.select("#content")
          .attr("class", "col-sm-8");

        createStackBar();

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

    d3.select("svg").remove();
    d3.select("svg").remove();

    d3.select("#col1")
      .attr("class", "col-sm-2");

    d3.select("#content")
      .attr("class", "col-sm-10");

    createTree();
  };

  function step9() {
    changeText
      .text("")
      .style("font-size", "30px");

    d3.select("svg").remove();
    d3.select("svg").remove();

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
      .attr("transform", "translate( 100 , 0)");

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
