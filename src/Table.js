(function(){
  document.addEventListener("DOMContentLoaded", init)
  function init(){
    if(window.runningJasmine) return
    new CellmateTables()
  }
})();

function CellmateTables(){
  var nodes = document.querySelectorAll("[cellmate-src]")
  this.nodes = []
  var i = 0
  var len = nodes.length
  for(; i < len; i++){
    this.nodes.push(new CellmateTable(nodes[i]))
  }
}

function CellmateTable(node){
  this.el = node
  this.url = node.getAttribute("cellmate-src")
  var xhr = new XMLHttpRequest();
  var self = this
  xhr.onreadystatechange = function(args) {
    if (this.readyState == this.DONE) {
      self.json = JSON.parse(this.responseText)
      self.toHTML()
    }
  }
  xhr.open("GET", this.url);
  xhr.setRequestHeader('X-Cellmate-Client', 'cellmateapp/table.js@1.0.3')
  xhr.send();
}

CellmateTable.prototype.toHTML = function(){
  this.el.innerHTML = ''
  var table = document.createElement("table")
  var thead = document.createElement("thead")
  var tr = document.createElement("tr")
  var headers = Object.keys(this.json[0])
  for(var i = 0; i < headers.length; i++){
    var th = document.createElement("th")
    th.innerHTML = headers[i]
    tr.appendChild(th)
  }
  thead.appendChild(tr)
  table.appendChild(thead)
  var tbody = document.createElement("tbody")
  for(var i = 0; i < this.json.length; i++){
    var tr = document.createElement("tr")
    var o = this.json[i]
    for(var k in o){
      var td = document.createElement("td")
      td.innerHTML = o[k]
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  table.appendChild(tbody)
  this.el.appendChild(table)
}
