var changeText = d3.select("#legend") //selector del texto
  .style("font-family", "Rosario-Regular, Rosario-Regular");

  //Funcion que contiene los steps de cada section
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
    $("#circlePack").animate({
    "marginTop" : "0px" //desplaza el circle pack hacia arriba
    });

    changeText
      .text("¡Todos tienen familiares contratando con el estado!");
  };

  function step4() {

    $("#circlePack").animate({
    "marginTop" : "0px" //desplaza el circle pack hacia arriba
    });

    changeText
      .style("font-size", "60px")
      .style("font-weight", "normal")
      .text("Veamos lo siguiente");

//Evalua si existe la visualizacion anterior
    var backViz = d3.select("#vis1")._groups[0].map(function(d) {
      if (d !== null) {

        d3.select("#vis1")
          .attr("id", "content"); //se vuelve a cambiar el ID por el original
        d3.select("svg").remove();
        d3.select("svg").remove();

        d3.select("#col1")
          .attr("class", "col-sm-6");

        d3.select("#content")
          .attr("id", "content")
          .attr("class", "col-sm-6");

//Se llaman las burbujas de los congresistas
        createBubble();

      };
    });
  };

  function step5() {

    $("#circlePack").animate({
    "marginTop" : "0px" //desplaza el circle pack hacia arriba
    });

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

//Se llama funcion que crea el conjunto de barcharts
    createBarchart();

// ajustar el tamanio del div de vegalite para que no se recorte
    d3.select(".marks")
      .style("zoom", 0.90)
      .style("width", "1300");

  };

  function step8() {

    $("#circlePack").animate({
    "marginTop" : "0px" //desplaza el circle pack hacia arriba
    });
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

        d3.select("#vis1")
          .attr("id", "content");
        d3.selectAll("svg").remove();

// cambio de tamanio de las columnas
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

// Desplazar el checkbox a otro Div para poder visualizar
        $("#label").appendTo("#content");

        d3.select("#label")
          .style("font-family", "Rosario-Regular, Rosario-Regular")
          .style("font-size", "25px");
  };

  // function step7() {
  //   changeText
  //     .text("Texto B");
  // };

  function step9() {
    changeText
      .style("font-size", "25px")
      .style("font-weight", "normal" )
      .text("Seleccione un congresista y obtenga el detalle del vínculo con el contratista, con su respectivo valor total");

// Limpiar viz antigua
    d3.selectAll("svg").remove();

    d3.select("#col1")
      .attr("class", "col-sm-2");

    d3.select("#content")
      .attr("class", "col-sm-10");

      d3.select("label")
      .remove();
      $("#circlePack").animate({
      "marginTop" : "0px" //desplaza el circle pack hacia arriba
      });

// Se llama funcion para crear arbol
    createTree();

    d3.select("svg")
      // .style("zoom", 0.50)
      .style("width", "1860")
      .attr("transform", "translate( -350 , 0)");

    d3.select("svg")
      // .style("zoom", 0.50)
      .style("height", "490");


  };
  function step6() {

//Evaluar si existe viz anterior
    var backViz = d3.select("#vis1")._groups[0].map(function(d) {
      if (d !== null) {

        d3.select("#vis1")
          .attr("id", "content");
        d3.selectAll("svg").remove();

        d3.select("#col1")
          .attr("class", "col-sm-4");

        d3.select("#content")
          .attr("class", "col-sm-8");
      }});

      d3.select("#col1")
      .attr("class", "col-sm-3");

    changeText
      .style("font-size", "25px")
      .style("font-weight", "normal" )
      .text("A continuación, se resume las entidades que contratan con los contratistas familiares de congresistas. ")
      .append("p")
      .style("font-size", "20px")
      .text("(Para obtener detalles de click sobre el nombre del congresista, seguido a esto seleccione al contratista para ver en detalle las entidades que contratan con este.)");

//limpiar viz anterior
    d3.selectAll("svg").remove();

    d3.select("#content")
      .attr("class", "col-sm-9");

// Remover checkbox
      d3.select("label")
      .remove();

      d3.select("#content")
      .append("div")
      .attr("id", "circlePack")

// Llamar funcion que crea circle Pack
    createCirclePack();

// Cambio de escaka de circlePack para que no se recorte
    $("#circlePack").css({ transform: "scale(.95)" });

// desplazar circle pack para que no se recorte
    $("#circlePack").animate({
		"marginTop" : "-=180px" //desplaza el circle pack hacia arriba
		});
  };

  function step10() {
    $("#circlePack").animate({
    "marginTop" : "0px" //desplaza el circle pack hacia arriba
    });

    changeText
      .text("")
      .style("font-size", "30px");

// Limpiar viz anterior
    d3.selectAll("svg").remove();

// ajustar tamanio de columnas
    d3.select("#col1")
      .attr("class", "col-sm-5");

    d3.select("#content")
      .style("zoom", 0.90)
      .attr("class", "col-sm-7");

    // llamar TableheadMap
    createTableHeadMap();

// Desplazar dropdown a otra columba para poder visualizar
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

//Evaluar en que step se encuentra la section para ejecutar funcion respectiva
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
  else if (step === "step 11") step11();
}
