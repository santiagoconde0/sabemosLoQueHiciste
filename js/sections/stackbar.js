// llamar la funcion para crear el stackbar
function createStackBar() {

  // Setear variables de margenes
  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 100
    },
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var x = d3.scaleBand() /*modificado para d3 v5*/
    .rangeRound([0, width])
    .padding(0.1);

  var y = d3.scaleLinear() /*modificado para d3 v5*/
    .rangeRound([height, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);
  //var color = d3.scaleOrdinal() /*modificado para d3 v5*/
  //    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var xAxis = d3.axisBottom() /*modificado para d3 v5*/
    .scale(x);

  var yAxis = d3.axisLeft() /*modificado para d3 v5*/
    .scale(y)
    .tickFormat(d3.format("$,"));

  var svg = d3.select("#content").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate( 100 , 20)");

  var active_link = "0"; //to control legend selections and hover
  var legendClicked; //to control legend selections
  var legendClassArray = []; //store legend classes to select bars in plotSingle()
  var legendClassArray_orig = []; //orig (with spaces)
  var sortDescending; //if true, bars are sorted by height in descending order
  var restoreXFlag = false; //restore order of bars back to original
  var format = d3.format("$,"); //formatear los valores

  //disable sort checkbox
  d3.select("label")
    .select("input")
    .property("disabled", true)
    .property("checked", false);

  d3.csv("https://raw.githubusercontent.com/santiagoconde0/sabemosLoQueHiciste/master/data/modalidadcontratacion_1.csv").then(function(data) {
    console.log(data);
    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "congresistafam";
    }));

    data.forEach(function(d) {
      var mystate = d.congresistafam; //add to stock code

      var y0 = 0;
      //d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.ages = color.domain().map(function(name) {
        //return { mystate:mystate, name: name, y0: y0, y1: y0 += +d[name]}; });
        return {
          mystate: mystate,
          name: name,
          y0: y0,
          y1: y0 += +d[name],
          value: d[name],
          y_corrected: 0
        };
      });
      d.total = d.ages[d.ages.length - 1].y1;

    });

    //Sort totals in descending order
    data.sort(function(a, b) {
      return b.total - a.total;
    });

    // LLamar textos para el eje de las X
    x.domain(data.map(function(d) {
      return d.congresistafam;
    }))




    y.domain([0, d3.max(data, function(d) {
      return d.total;
    })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
    //.text("Population");

    var state = svg.selectAll(".congresistafam")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + "0" + ",0)";
      });
    //.attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; })

    height_diff = 0; //height discrepancy when calculating h based on data vs y(d.y0) - y(d.y1)
    state.selectAll("rect")
      .data(function(d) {
        return d.ages;
      })
      .enter().append("rect")
      .attr("width", x.bandwidth()) /*modificado para d3 v5*/
      .attr("y", function(d) {
        height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
        y_corrected = y(d.y1) + height_diff;
        d.y_corrected = y_corrected //store in d for later use in restorePlot()

        //if (d.name === "Licitación Pública") height_diff = 0; //reset for next d.mystate

        return y_corrected;
        // return y(d.y1);  //orig, but not accurate
      })
      .attr("x", function(d) { //add to stock code
        return x(d.mystate)
      })
      .attr("height", function(d) {
        //return y(d.y0) - y(d.y1); //heights calculated based on stacked values (inaccurate)
        return y(0) - y(d.value); //calculate height directly from value in csv file
      })
      .attr("class", function(d) {
        classLabel = d.name.replace(/\s/g, ''); //remove spaces
        return "bars class" + classLabel;
      })
      .style("fill", function(d) {
        return color(d.name);
      });

    state.selectAll("rect")
      .on("mouseover", function(d) {

        var delta = d.y1 - d.y0;
        var xPos = parseFloat(d3.select(this).attr("x"));
        var yPos = parseFloat(d3.select(this).attr("y"));
        var height = parseFloat(d3.select(this).attr("height"))

        //d3.select(this).attr("stroke","blue").attr("stroke-width",0.8);

        svg.append("text")
          .attr("x", 300) //xPos
          .attr("y", 100) //yPos +height/2
          .attr("class", "tooltip")
          .text(d.name + ": " + format(delta));

      })
      .on("mouseout", function() {
        svg.select(".tooltip").remove();
        //d3.select(this).attr("stroke","pink").attr("stroke-width",0.2);

      })


    // opciones del lado para filtrar
    var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
      .enter().append("g")
      .attr("class", function(d) {
        legendClassArray.push(d.replace(/\s/g, '')); //remove spaces
        legendClassArray_orig.push(d); //remove spaces
        return "legend";
      })
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    //reverse order to match order in which bars are stacked
    legendClassArray = legendClassArray.reverse();
    legendClassArray_orig = legendClassArray_orig.reverse();

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color)
      .attr("id", function(d, i) {
        return "id" + d.replace(/\s/g, '');
      })
      .on("mouseover", function() {

        if (active_link === "0") d3.select(this).style("cursor", "pointer");
        else {
          if (active_link.split("class").pop() === this.id.split("id").pop()) {
            d3.select(this).style("cursor", "pointer");
          } else d3.select(this).style("cursor", "auto");
        }
      })
      .on("click", function(d) {

        if (active_link === "0") { //nothing selected, turn on this selection
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 2);

          active_link = this.id.split("id").pop();
          plotSingle(this);

          //gray out the others
          for (i = 0; i < legendClassArray.length; i++) {
            if (legendClassArray[i] != active_link) {
              d3.select("#id" + legendClassArray[i])
                .style("opacity", 0.5);
            } else sortBy = i; //save index for sorting in change()
          }

          //enable sort checkbox
          d3.select("label").select("input").property("disabled", false)
          d3.select("label").style("color", "black")
          //sort the bars if checkbox is clicked
          d3.select("input").on("change", change);

        } else { //deactivate
          if (active_link === this.id.split("id").pop()) { //active square selected; turn it OFF
            d3.select(this)
              .style("stroke", "none");

            //restore remaining boxes to normal opacity
            for (i = 0; i < legendClassArray.length; i++) {
              d3.select("#id" + legendClassArray[i])
                .style("opacity", 1);
            }


            if (d3.select("label").select("input").property("checked")) {
              restoreXFlag = true;
            }

            //disable sort checkbox
            d3.select("label")
              .style("color", "#D8D8D8")
              .select("input")
              .property("disabled", true)
              .property("checked", false);


            //sort bars back to original positions if necessary
            change();

            //y translate selected category bars back to original y posn
            restorePlot(d);

            active_link = "0"; //reset
          }

        } //end active_link check


      });

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      });

    // restore graph after a single selection
    function restorePlot(d) {
      //restore graph after a single selection
      d3.selectAll(".bars:not(.class" + class_keep + ")")
        .transition()
        .duration(1000)
        .delay(function() {
          if (restoreXFlag) return 3000;
          else return 750;
        })
        .attr("width", x.bandwidth()) //restore bar width - modificado d3v5
        .style("opacity", 1);

      //translate bars back up to original y-posn
      d3.selectAll(".class" + class_keep)
        .attr("x", function(d) {
          return x(d.mystate);
        })
        .transition()
        .duration(500)
        .delay(function() {
          if (restoreXFlag) return 2000; //bars have to be restored to orig posn
          else return 0;
        })
        .attr("y", function(d) {
          //return y(d.y1); //not exactly correct since not based on raw data value
          return d.y_corrected;
        });

      //reset
      restoreXFlag = false;

    }

    // plot only a single legend selection
    function plotSingle(d) {

      class_keep = d.id.split("id").pop();
      idx = legendClassArray.indexOf(class_keep);

      //erase all but selected bars by setting opacity to 0
      d3.selectAll(".bars:not(.class" + class_keep + ")")
        .transition()
        .duration(500)
        .attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
        .style("opacity", 0);

      //lower the bars to start on x-axis

      //state.selectAll("rect").forEach(function (d, i) {
      state.nodes().forEach(function(d, i) {
        var nodes = d.childNodes;
        //get height and y posn of base bar and selected bar
        h_keep = d3.select(nodes[idx]).attr("height");
        y_keep = d3.select(nodes[idx]).attr("y");

        h_base = d3.select(nodes[0]).attr("height");
        y_base = d3.select(nodes[0]).attr("y");

        h_shift = h_keep - h_base;
        y_new = y_base - h_shift;

        //reposition selected bars
        d3.select(nodes[idx])
          .transition()
          .ease(d3.easeBounce) /*modificado para d3 v5*/
          .duration(700)
          .delay(550)
          .attr("y", y_new);

      })

    }

    //adapted change() fn in http://bl.ocks.org/mbostock/3885705
    function change() {

      if (this.checked) sortDescending = true;
      else sortDescending = false;

      colName = legendClassArray_orig[sortBy];

      var x0 = x.domain(data.sort(sortDescending ?
            function(a, b) {
              return b[colName] - a[colName];
            } :
            function(a, b) {
              return b.total - a.total;
            })
          .map(function(d, i) {
            return d.congresistafam;
          }))
        .copy();

      state.selectAll(".class" + active_link)
        .sort(function(a, b) {
          return x0(a.mystate) - x0(b.mystate);
        });

      var transition = svg.transition().duration(500),
        delay = function(d, i) {
          return i * 20;
        };

      //sort bars
      transition.selectAll(".class" + active_link)
        .delay(delay)
        .attr("x", function(d) {
          return x0(d.mystate);
        });

      //sort x-labels accordingly
      transition.select(".x.axis")
        .call(xAxis)
        .selectAll("g")
        .delay(delay);


      transition.select(".x.axis")
        .call(xAxis)
        .selectAll("g")
        .delay(delay);
    }

  });

};
