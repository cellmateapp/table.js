describe("Tables", function() {
  var cmts
  beforeEach(function() {
    jasmine.Ajax.install()
    cmts = new CellmateTables()
  });
  afterEach(function(){
    jasmine.Ajax.uninstall()
  })

  it("should get all nodes", function() {
    expect(cmts.nodes.length).toEqual(1)
  });
  it("should create Table instances from notes", function() {
    expect(cmts.nodes[0].constructor.name).toEqual("CellmateTable")
  });
})
describe("Table", function(){
  var table
  beforeEach(function(){
    jasmine.Ajax.install()
    jasmine.Ajax.stubRequest(
      'https://cellmateapp.com/',
    ).andReturn({
      status: 200,
      statusText: 'HTTP/1.1 200 OK',
      contentType: 'text/xml;charset=UTF-8',
      responseText: '[{ "Product": "Spoons", "Price": "1.35", "Quantity": "22" }, { "Product": "Forks", "Price": "1.25", "Quantity": "14" } ]'
    });
    var cmts = new CellmateTables()
    table = cmts.nodes[0]
    console.log(cmts)
  })
  afterEach(function(){
    jasmine.Ajax.uninstall()
  })
  it("should should have an html node", function() {
    expect(table.el.constructor.name).toEqual("HTMLDivElement")
  });
  it("should should have a url", function() {
    expect(table.url).toEqual("https://cellmateapp.com/")
  });
  it("should have json", function() {
    expect(table.json.constructor.name).toEqual("Array")
  });
  it("should have a table", function() {
    expect(table.el.querySelector("table")).toBeTruthy()
  });
})

