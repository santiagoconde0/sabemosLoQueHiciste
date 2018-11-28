function createTree() {

  var margin = {top: 20, right: 20, bottom: 30, left: 100},
      width = 860 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#content").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// Obtener parametros del SVG que esta en el index
var width = +svg.attr("width"),
  height = +svg.attr("height"),
  duration = 75,
  dy = width / 4,
  dx = 40, // separacion entre nodos
  tree = d3.tree().nodeSize([dx, dy]), // D3 Layout tree
  diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
margin = ({
  top: 15,
  right: 120,
  bottom: 25,
  left: 105
});

// Se llaman los datos
d3.csv("data/data.csv").then(function(data) {

  // Se hace nest para organizar los datos en jerarquias
  var nestData = d3.nest()
    .key(function(d) {
      return d.Congresista;
    })
    .key(function(d) {
      return d.Contratista;
    })
    .entries(data)
    .sort(function(a, b) {
      return d3.descending(a.values, b.values);
    });

  var nestedDataAsTree = ({
    key: "Congresistas",
    values: nestData
  });

// Se aplica Hirarchy para returnar los datos con estructura de jerarquia utilizada por D3
  const root = d3.hierarchy(nestedDataAsTree, d => d.values);

  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth === 1) {  //Set del arbol inicial y la cantidad de ramas que se mostrara
      d.children = null;
    } else {
      return;
    };

  });

  const gLink = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 1.5);

  const gNode = svg.append("g") // se crean los nodos
    .attr("cursor", "pointer");

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    // Calculos para el nuevo Layout tree
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom; // Set margenes

    const transition = svg.transition()
      .duration(duration)
      .attr("height", height)
      .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
      .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Actualizar nodos
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    // Ingresar nodos nuevos
    const nodeEnter = node.enter().append("g")
      .attr("transform", d => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", d => {
        d.children = d.children ? null : d._children;
        update(d);
      });

//Ingresar circulos
    nodeEnter.append("circle")
      .attr("r", 10)
      .attr("fill", d => d._children ? "steelblue" : "white")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "3px");

    // Ingresar foto de congresistas
    nodeEnter.append("image")
      .attr('xlink:href', function(d) {
        if (d.depth === 1) {
          return "img/congresistas/" + d.data.key.replace(/ /g, '').replace("*", '') + ".png";
        } else {
          return
        }
      })
      .attr("x", function(d) {
        return -15;
      })
      .attr("y", function(d) {
        return -13;
      })
      .attr("width", 35)
      .attr("height", 35);

// Ingresar Texto  en nodos
    nodeEnter.append("text")
      .attr("dy", "0.31em")
      .attr("x", function(d) {
        return d.children || d._children ? -16 : 16;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) {
        if (d.depth < 3) {
          if (d.depth === 2) {

            const words = d.data.key.split(/\s+/g); // Ajustar tamanio para ingresar textos largos en una nueva linea
            if (!words[words.length - 2]) words.pop();
            if (!words[0]) words.shift();
            return words[0] + " " + words[1];

          } else {

            return d.data.key.replace("*", '')
          }

        } else {
          return d.data["Valor total contratos"]
        }
      })
      .clone(true).lower()
      .attr("stroke-width", 5)
      .attr("stroke", "white");

    nodeEnter.append("text")
      .attr("dy", "1.31em")
      .attr("x", function(d) {
        return d.children || d._children ? -16 : 16;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) {
        if (d.depth === 2) {

          const words = d.data.key.split(/\s+/g); // Ajustar tamanio para ingresar textos largos en una nueva linea
          if (!words[words.length - 2]) words.pop();
          if (!words[0]) words.shift();
          if (words[3] === undefined) {
            words[3] = "";
          };
          if (words[2] === undefined) {
            words[2] = "";
          };
          return words[2] + " " + words[3];
        }
      })
      .clone(true).lower()
      .attr("stroke-width", 5)
      .attr("stroke", "white");

    nodeEnter.append("text")
      .attr("dy", "2.31em")
      .attr("x", function(d) {
        return d.children || d._children ? -16 : 16;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) {
        if (d.depth === 2) {

          const words = d.data.key.split(/\s+/g); // Ajustar tamanio para ingresar textos largos en una nueva linea
          if (!words[words.length - 2]) words.pop();
          if (!words[0]) words.shift();
          if (words[4] === undefined) {
            words[4] = "";
          };
          if (words[5] === undefined) {
            words[5] = "";
          };
          return words[4] + " " + words[5];
        }
      })
      .clone(true).lower()
      .attr("stroke-width", 5)
      .attr("stroke", "white");

    // Transition nodos a la nueva posicion
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // Transition nodos existentes a una nueva posicion
    const nodeExit = node.exit().transition(transition).remove()
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    // Actualizar links
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    // Ingresar nuevos links al parent de la posicion previa.

    const linkEnter = link.enter().append("path")
      .attr("d", d => {
        const o = {
          x: source.x0,
          y: source.y0
        };
        return diagonal({
          source: o,
          target: o
        });
      });

    // Cambio links a nuevas posiciones.
    link.merge(linkEnter).transition(transition)
      .attr("d", diagonal);

    // quitar nodos no seleccionados.
    link.exit().transition(transition).remove()
      .attr("d", d => {
        const o = {
          x: source.x,
          y: source.y
        };
        return diagonal({
          source: o,
          target: o
        });
      });


    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(root);

  return svg.node();

});

};
