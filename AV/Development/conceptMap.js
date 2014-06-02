(function ($) {

var nodes = new Array();
var connections = new Array();
var linking_phrase = new Array();



var Parser = function() {
  console.log("parser");
xmlhttp=new XMLHttpRequest();
if (xmlhttp) {
  xmlhttp.open("GET","animals.xml",false);
//  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML;
  console.log("xml Doc " + xmlDoc);
}

//  var parser = new DOMParser();
//var xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");

 //xmlDoc=loadXMLDoc("animals.xml");
//parser = new DOMParser(); // new Parser
//xmlDoc = parser.parseFromString(xmlDoc,"text/xml"); // Parse string

concept=xmlDoc.getElementsByTagName('concept');

console.log("x " + concept.length);


var id = 0;
var label = null;
for (i=0;i<concept.length;i++)
{
  id = concept[i].getAttribute('id');
  label = concept[i].getAttribute('label');
  console.log(concept[i].getAttribute('id'));
  console.log(concept[i].getAttribute('label'));
  //list.add(id, label);
  nodes.push(new Node(id, label));
} 
connection=xmlDoc.getElementsByTagName('connection');
for (i=0; i < connection.length; i++) {
  id = connection[i].getAttribute('id');
  from_id = connection[i].getAttribute('from-id');
  to_id = connection[i].getAttribute('to-id');
 
  connections.push(new Connection(id, from_id, to_id));
}

phrase = xmlDoc.getElementsByTagName('linking-phrase');
for (i = 0; i < phrase.length; i++) {
  id = phrase[i].getAttribute('id');
  label = phrase[i].getAttribute('label');

  linking_phrase.push(new Phrase(id, label));
}
};


var Graph = function() {
      this.numOfEdges = 0;
      this._adjacencyLists = {};
      this._nodeList={};
};

var AdjacencyList = function() {
      this.head = null;
      this.tail = null;
    };

AdjacencyList.prototype.add = function(id, label) {
      var node = new Node(id, label);
      if (!this.head && !this.tail) {
        this.head = node;
      } else {
        this.tail.next = node;
      }
      this.tail = node;
    };

AdjacencyList.prototype.print = function() {
  var graph = new Graph();
  node = graph.getNodes();
  currentNode =
        this._adjacencyLists[nodes[i]].head;
    while(currentNode!=this.tail) {
      console.log(currentNode.label);
      currentNode = currentNode.next;
    }

};

AdjacencyList.prototype.remove = function() {
      var detached = null;
      if (this.head === this.tail) {
        return null;
      } else {
        detached = this.head;
        this.head = this.head.next;
        detached.next = null;
        return detached;
      }
    };


var Node = function(id, label) {
      this.id = id;
      this.label = label;
      this.next = null;
    };
var Connection = function(id, from_id, to_id){
  this.id = id;
  this.from_id = from_id; 
  this.to_id = to_id;
}

var Phrase = function(id, label) {
  this.id = id;
  this.label = label;
}

var addNode = function(node) {


}

Graph.prototype.addEdge = function(v, w) {
      this._adjacencyLists[v] = this._adjacencyLists[v] ||
        new AdjacencyList();
      this._adjacencyLists[w] = this._adjacencyLists[w] ||
        new AdjacencyList();
      this._adjacencyLists[v].add(w);
      this._adjacencyLists[w].add(v);
      this.numOfEdges++;
    };

Graph.prototype.getNodes = function() {
      return Object.keys(this._adjacencyLists);
    };

Graph.prototype.toString = function() {
      var adjString = '';
      var currentNode = null;
      var nodes = this.getNodes();
      console.log(nodes.length + " nodes, " + 
        this.numOfEdges + " edges");
      for (var i = 0; i < nodes.length; i++) {
        adjString  = nodes[i] + ":";
        currentNode =
        this._adjacencyLists[nodes[i]].head;
          while (currentNode) {
            console.log(currentNode)
            adjString += " " + currentNode.label;
            currentNode = currentNode.next;
          }
          console.log(adjString);
          adjString = '';
        }
    };



//Given the following test code calling on our graph`toString` will produce the following
function runit() {
  //  var graph = new Graph();
 // var list = new AdjacencyList();
   // graph.addEdge(1, 2);
   // graph.addEdge(1, 3);
   // graph.addEdge(1, 4);
   // graph.addEdge(3, 4);
   // graph.toString();

   // console.log(graph.getNodes());
  jsav = new JSAV($('.avcontainer'));
  g = jsav.ds.graph({width: 500, height: 500, layout: "manual", directed: true});

  Parser();
  for (var i = 0; i < nodes.length; i++) {
   var pos = i * 100;
    console.log("id " + nodes[i].id + "  labels" +  nodes[i].label)
    g.addNode(nodes[i].label, {"left": pos});
     g.layout();
   //  jsav.displayInit();
  }
 
  

  //  graph.toString();
};



//{"left": pos}




$('#runit').click(runit);
}(jQuery));
