function createBarchart() {

// Se especifica las características de la visualización en el lenguaje de marcas en VegaLite
var vlSpec1 ={
"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
"data": {
  "url": "https://raw.githubusercontent.com/santiagoconde0/sabemosLoQueHiciste/master/data/datadetallada1.json",
  "format": {
    "parse": {"valor_total_contratos": "number", "numero_contratos": "number"},
     "type": "json"
  }
},
 "title": {
  "text": "",
  "anchor": "start"
},
"hconcat": [
  {
 "vconcat": [
  {
   "title": {
  "text": "1. Monto Contratado por familiares de los congresistas años 2007 - 2018",
  "anchor": "middle",
  "color": "Black"
},
"width": 450,
"height": 200,
        "mark": {"type":"bar"},
        "encoding": {
          "x": {
            "aggregate": "sum",
            "type": "quantitative",
            "field": "valor_total_contratos",                           "scale": {"type":"sqrt"},
            "format":",",
            "axis": {"title": "Monto contratación familiares (pesos)"}
          },
          "color": {
            "condition": {"selection": "congresel", "value": "goldenrod"},
            "value": "steelblue"
          },
          "opacity": {"value": 3},
         "y": {
        "field": "Congresista",
        "type": "nominal",
        "sort": {"op": "sum", "field": "valor_total_contratos", "order": "descending"},
        "axis": {"title": "Congresista"}
      }
        },
        "selection": {
          "congresel": {
            "type": "interval",
            "empty": "none",
            "encodings": ["y"],
            "on": "[mousedown, window:mouseup] > window:mousemove!",
            "translate": "[mousedown, window:mouseup] > window:mousemove!",
            "zoom": "wheel!",
            "mark": {"fill": "#585858", "fillOpacity": 0.125, "stroke": "#cd619a"},
            "resolve": "global"
          }
        }
  },
{
"hconcat": [{

"width": 450,
"height": 200,
"title": {
  "text": "3. Distribucion contratación por familiar",
  "anchor": "middle",
  "color": "DarkBlue"
},
 "transform": [{"filter": {"selection": "congresel"}}],
"mark": {"type": "bar", "color": "green"},
"encoding": {
  "x": {"aggregate": "sum",
            "type": "quantitative",
            "field": "valor_total_contratos",
            "scale": {"type":"sqrt"},
            "format":",",
            "axis": {"title": "Monto contratación (pesos)"}},
  "y": {"field": "Contratista_Abrev", "type": "nominal",
"sort": {"op": "sum", "field": "valor_total_contratos", "order": "descending"},
 "axis": {"title": "Familiar o Empresa familiar"},
  "color":{
            "condition": {"selection": "familiaresel", "value": "orange"},
            "value": "steelblue"
          },
          "opacity": {"value": 3}
  },
"color": {"field": "Congresista", "type": "nominal","legend": {
          "title": "Congresista"
        }}
},
 "selection": {
          "familiaresel": {
            "type": "interval",
            "empty": "none",
            "encodings": ["y"],
            "on": "[mousedown, window:mouseup] > window:mousemove!",
            "translate": "[mousedown, window:mouseup] > window:mousemove!",
            "zoom": "wheel!",
            "mark": {"fill": "#585858", "fillOpacity": 0.125, "stroke": "#01A9DB"},
            "resolve": "global"
          }
        }
}
]
}
]
},
{"vconcat": [
   {
"width": 300,
"height": 200,
"title": {
  "text": "2. Número de familiares con contratos",
  "anchor": "middle",
  "color": "Black"
},

        "mark": "bar",
        "encoding": {
         "y": {"field": "Congresista",
         "type": "nominal",
          "sort": {"op": "distinct", "field": "Contratista", "order": "descending"},
        "axis": {"title": "Congresista"}
         },
  "x": {
    "aggregate": "distinct",
    "field": "Contratista",
    "type": "quantitative",
    "axis": {"title": "Número de familiares con contratos"},
    "scale": {"type": "linear"}
  },
          "color": {
            "condition": {"selection": "congresel", "value": "goldenrod"},
            "value": "steelblue"
          },
          "opacity": {"value": 3}
        },"selection": {
          "congresel": {
            "type": "interval",
            "empty": "none",
            "encodings": ["y"],
            "on": "[mousedown, window:mouseup] > window:mousemove!",
            "translate": "[mousedown, window:mouseup] > window:mousemove!",
            "zoom": "wheel!",
            "mark": {"fill": "#335", "fillOpacity": 0.125, "stroke": "white"},
            "resolve": "global"
          }
        }
}  ,
{
"width": 300,
"height": 200,
"title": {
  "text": "4. Comportamiento de la contratación por año de los familiares seleccionados",
  "anchor": "middle",
  "color": "DarkBlue",
  "padding": "80px"
},
 "transform": [{"filter": {"selection": "familiaresel"}}],
"mark": {"type": "line", "color": "steelblue", "point": {"color": "orange"}},
"encoding": {
  "x": {"field": "fecha_contratos",
   "type": "temporal",
   "timeUnit": "year",
    "axis": {  "format":"%Y", "title": "Años"}},
  "y": {"aggregate": "sum",
            "type": "quantitative",
            "field": "valor_total_contratos",
             "format":",",
        "axis": {"title": "Monto contratado"}}
}
}
]
}
]
};
 // Inserta la visualzación en el contendor con el id 'vis1'

vegaEmbed("#vis1", vlSpec1, {theme: null, actions:false, renderer: 'svg'});

};
