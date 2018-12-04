var changeText = d3.select("#legend") //selector del texto
  .style("font-family", "Rosario-Regular, Rosario-Regular");

//Funcion que contiene los steps de cada section
function doStep(step) {

  function step0() {
    changeText
      .text("Estos son algunos de los congresistas que más votos obtuvieron en las pasadas elecciones.");
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
      "marginTop": "0px" //desplaza el circle pack hacia arriba
    });

    changeText
      .text("Todos tienen familiares que son o han sido contratistas del Estado");
  };

  function step4() {

    // eliminar info viz siguiente
    d3.select("#info").remove();

    $("#circlePack").animate({
      "marginTop": "0px" //desplaza el circle pack hacia arriba
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

    // Quitar Instrucciones viz anterior
    d3.select("#info").remove();
    d3.selectAll("hr").remove();

    $("#circlePack").animate({
      "marginTop": "0px" //desplaza el circle pack hacia arriba
    });

    d3.select("#col1")
      .attr("class", "col-sm-3");

    d3.select("#content")
      .attr("id", "vis1")
      .attr("class", "col-sm-9");

    changeText
      .style("font-size", "26px")
      .style("top", "50%")
      .style("font-weight", "bold")
      .text("¿Conflicto de Intereses? ");

    changeText
      .append("p")
      .style("font-weight", "normal")
      .style("font-size", "19px")
      .text("Estos son los congresistas que tienen familiares que contratan con el Estado. Aquí encontrarás el  número de familiares contratistas por congresista, la distribución por entidades estatales que contratan con los familiares del congresista o montos por familiar y el incremento de la contratación de los familiares contratistas año a año.");

    d3.select("#col1")
      .append("svg")
      .attr("width", 1)
      .attr("height", 10);

    //Se llama funcion que crea el conjunto de barcharts
    createBarchart();

    // Crear label de Instrucciones
    d3.select("#vis1")
      .append("hr")
      .append("div")
      .attr("id", "info")
      .attr("class", "alert alert-info")
      .attr("role", "alert")
      .append("h4")
      .attr("class", "alert-heading")
      .text("Instrucciones")

    d3.select("#info")
      .append("p")
      .attr("class", "mb-0")
      .text("Haz un clic  en el nombre del congresista de tu elección en el cuadro 1 para desplegar la información en los cuadros 2, 3. Para ver el incremento por año por familiar haz clic sostenido en el cuadro 3.");



    $(".marks").animate({
      'marginLeft': "-=75px" //desplaza el circle pack hacia arriba
    });

    // ajustar el tamanio del div de vegalite para que no se recorte
    d3.select(".marks")
      .style("zoom", 0.88)
      .style("width", "1300");

  };

  function step8() {

    // Quitar Instrucciones viz anterior
    d3.select("#info").remove();
    d3.selectAll("hr").remove();

    $("#circlePack").animate({
      "marginTop": "0px" //desplaza el circle pack hacia arriba
    });

    // cambiar texto
    changeText
      .style("font-size", "30px")
      .style("color", "black")
      .style("top", "50%")
      .style("font-weight", "bold")
      .text(" ¿Los familiares de los congresistas pueden o no contratar?  ");

    changeText
      .append("p")
      .style("font-weight", "normal")
      .style("font-size", "19px")
      .text("Para Cuestión Pública, la respuesta está íntimamente ligada al término corrupción. “La corrupción se define como “el mal uso del poder encomendado para obtener beneficios privados”, también se puede decir que representa el incumplimiento del principio de “mantener cierta distancia”, según el cual ninguna relación personal o de parentesco debe estar presente en la toma de decisiones económicas, ya sea por parte de actores económicos o de funcionarios de gobierno. Una vez se viola este principio y se hacen distinciones con base en las relaciones personales o de parentesco, surgirá con frecuencia, la corrupción. Ejemplo de esto son las situaciones de conflicto de intereses. El principio de mantener cierta distancia es fundamental para el funcionamiento eficaz de cualquier organización”. Tomado de Transparencia por Colombia.");

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
    // Quitar Instrucciones viz anterior
    d3.select("#info").remove();
    d3.selectAll("hr").remove();

    changeText
      .style("font-size", "35px")
      .style("font-weight", "bold")
      .text("¿Cuáles son los familiares de los congresistas investigados que contratan con el Estado?")

    // Limpiar viz antigua
    d3.selectAll("svg").remove();

    d3.select("#col1")
      .attr("class", "col-sm-2");

    d3.select("#content")
      .attr("class", "col-sm-10");

    d3.select("label")
      .remove();
    $("#circlePack").animate({
      "marginTop": "0px" //desplaza el circle pack hacia arriba
    });

    // Se llama funcion para crear arbol
    createTree();

    // Crear label de Instrucciones
    d3.select("#content")
    .append("hr")
      .append("div")
      .attr("id", "info")
      .attr("class", "alert alert-info")
      .attr("role", "alert")
      .append("h4")
      .attr("class", "alert-heading")
      .text("Instrucciones")

    d3.select("#info")
      .append("p")
      .attr("class", "mb-0")
      .text("Haz clic en cada congresista para desplegar la información")

    // ajustar tamanio tree
    d3.select("svg")
      // .style("zoom", 0.50)
      .style("width", "1860")
      .attr("transform", "translate( -350 , 0)");

    d3.select("svg")
      // .style("zoom", 0.50)
      .style("height", "490");


  };

  function step6() {

    // Quitar Instrucciones viz anterior
    d3.select("#info").remove();
    d3.selectAll("hr").remove();

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
      }
    });

    d3.select("#col1")
      .attr("class", "col-sm-3");


    changeText
      .style("font-size", "25px")
      .style("color", "black")
      .style("top", "40%")
      .style("font-weight", "bold")
      .text("¿Cuáles entidades estatales contratan con los familiares de los congresistas investigados?")
      .append("p")
      .style("font-weight", "normal")
      .style("font-size", "22px")
      .text("Aquí puedes ver los familiares de cuál congresista se llevan la mejor tajada en torta de la contratación pública y con qué entidades contrata o contrató.  ")

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

    // Crear label de Instrucciones
    d3.select("#content")
      .append("div")
      .attr("id", "info")
      .attr("class", "alert alert-info")
      .attr("role", "alert")
      .append("h4")
      .attr("class", "alert-heading")
      .text("Instrucciones")

    d3.select("#info")
      .append("p")
      .attr("class", "mb-0")
      .text("Haz clic en los nombres de los congresistas y después en los nombres de sus familiares para desplegar las entidades contratantes.");

    // ajustar instrucciones con viz
    $("#info").css({
      transform: "scale(.90)"
    });
    $("#info").animate({
      "marginTop": "-=35px" //desplaza el circle pack hacia arriba
    });

    // Cambio de escaka de circlePack para que no se recorte
    $("#circlePack").css({
      transform: "scale(.95)"
    });
    // desplazar circle pack para que no se recorte
    $("#circlePack").animate({
      "marginTop": "-=180px" //desplaza el circle pack hacia arriba
    });
  };

  function step10() {
    $("#circlePack").animate({
      "marginTop": "0px" //desplaza el circle pack hacia arriba
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
