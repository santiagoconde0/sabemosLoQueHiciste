function createTableHeadMap() {
// Se especifica las características de la visualización en el lenguaje de marcas en VegaLite
var vlSpec3 ={
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "data": {"url": "https://raw.githubusercontent.com/santiagoconde0/sabemosLoQueHiciste/master/data/datadetallada_objetocont.json"},
  "title":"Contratación realizada (familiares de los congresistas) por objeto y tipo de proceso",
  "width": 200, 
  "selection": {
    "sel": {
      "type": "single",
      "fields": ["congresista"],
      "bind": {"input": "select", "options": ["Sin selección","Angélica Lozano", "Armando Benedetti", "Arturo Char","David Barguil","Edward Rodríguez","Oscar Pérez"]},
      "on": "click",
      "resolve": "global",
      "empty": "none"
    }
  },
  "transform": [{"filter": {"selection": "sel"}}],
  "mark": "rect",
  "encoding": {
    "y": {"field": "clasificación_objeto", "type": "nominal", "axis": {"title": "Obtejo contrato"}},
    "x": {"field": "Tipo de Proceso", "type": "nominal", "axis": {"title": "Modalidad contratación"}},
    "color": {"aggregate": "sum", "field": "Valor Contrato", "type": "quantitative","format":",","title": "Monto Contratación"}
  }
};
 // Inserta la visualzación en el contendor con el id 'vis1'

vegaEmbed("#vis4", vlSpec3, {theme: null, actions:false, renderer: 'svg'});




};
