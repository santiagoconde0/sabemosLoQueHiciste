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
  "text": "La siguiente visualización muestra la información relacionada con la contratación realizada por los familiares de los congresistas.",
  "anchor": "start"
},
"hconcat": [
  {
 "vconcat": [
  {
   "title": {
  "text": "1. Monto Contratado por familiares de los congresistas años 2007 - 2018",
  "anchor": "middle",
  "color": "#550F3F"
},
"width": 450,
"height": 200,
        "mark": {"type":"bar"},
        "encoding": {
          "x": {
            "aggregate": "sum",
            "type": "quantitative",
            "field": "valor_total_contratos_millones",
             "scale": {"type":"sqrt"},
            "axis": {"title": "Monto contratación familiares (en millones de pesos)"}
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
      },
      "tooltip": [
      {"field": "Congresista", "type": "nominal", "title":"Congresista:"},
      {"field": "periodos_electos", "type":"nominal","title":"Años en el congreso:"},
      {"aggregate": "sum","field": "valor_total_contratos", "type": "quantitative", "format":"$,", "title":"Monto contratación familiares:"},
     {"aggregate": "sum","field": "numero_contratos", "type":"quantitative","title":"Número contratos:"}
    ]
        },
        "selection": {
          "congresel": {
            "type": "single", "on": "click",
            "empty": "none",
            "encodings": ["y"]
          }}
  },
{
"hconcat": [{

"width": 450,
"height": 200,
"title": {
  "text": "3. Distribucion contratación por familiar",
  "anchor": "middle",
  "color": "#550F3F"
},
 "transform": [{"filter": {"selection": "congresel"}}],
"mark": {"type": "bar", "color": "green"},
"encoding": {
  "x": {"aggregate": "sum",
            "type": "quantitative",
            "field": "valor_total_contratos_millones",
            "scale": {"type":"sqrt"},
            "format":",",
            "axis": {"title": "Monto contratación (en millones de pesos)"}},
     "tooltip": [
      {"field": "Congresista", "type": "nominal", "title":"Congresista:"},
      {"field": "periodos_electos", "type":"nominal","title":"Años en el congreso:"},
      {"aggregate": "sum","field": "valor_total_contratos", "type": "quantitative", "format":"$,", "title":"Monto contratación familiares:"},
     {"aggregate": "sum","field": "numero_contratos", "type":"quantitative","title":"Número contratos:"},
 {"field": "Vínculo", "type":"nominal","title":"Vínculo familiar:"}
    ],
  "y": {"field": "Contratista_Abrev", "type": "nominal",
"sort": {"op": "sum", "field": "valor_total_contratos", "order": "descending"},
 "axis": {"title": "Familiar o Empresa familiar"},
  "color":{
            "condition": {"selection": "familiaresel", "value": "orange"},
            "value": "#550F3F"
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
"width": 200,
"height": 200,
"title": {
  "text": "2. Número de familiares con contratos",
  "anchor": "middle",
  "color": "#550F3F"
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
    "axis": {"title": "Número de familiares o empresa familiar"},
    "scale": {"type": "linear"}
  },
          "color": {
            "condition": {"selection": "congresel", "value": "steelblue"},
            "value": "#EFEFEF"
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

"height": 200,
"title": {
  "text": "4. Comportamiento de la contratación por año de los familiares seleccionados",
  "anchor": "middle",
  "color": "#550F3F",
  "padding": "80px"
},
 "transform": [{"filter": {"selection": "familiaresel"}}],
"mark": {"type": "line", "color": "#550F3F", "point": {"color": "#f52749"}},
"encoding": {
  "x": {"field": "fecha_contratos",
   "type": "temporal",
   "timeUnit": "year",
   "scale": {"type":"ordinal","domain":[2007,2018]},
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
