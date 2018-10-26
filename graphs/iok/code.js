const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

const NODE_COLLECTION_NAME = 'iok-nodes';
const EDGE_COLLECTION_NAME = 'iok-edges';

var cy = cytoscape({
  container: document.getElementById('cy'),
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(title)'
        // 'pie-1-background-color': '#E8747C',
        // 'pie-1-background-size': 'mapData(foo, 0, 10, 0, 100)',
        // 'pie-2-background-color': '#74CBE8',
        // 'pie-2-background-size': 'mapData(bar, 0, 10, 0, 100)',
        // 'pie-3-background-color': '#74E883',
        // 'pie-3-background-size': 'mapData(baz, 0, 10, 0, 100)'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'width': 4,
        'target-arrow-shape': 'triangle',
      })
    .selector('.selected')
      .css({
        'background-color': '#E8747C'
      })  
    .selector('.highlighted')
      .css({
        'background-color': '#75b5aa',
        'line-color': '#75b5aa',
        'target-arrow-color': '#75b5aa',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      })
    .selector('.cycleHighlighted')
      .css({
        'background-color': '#E8747C',
        'line-color': '#E8747C',
        'target-arrow-color': '#E8747C',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      })
});

var setNodeData = (node) => {
  document.getElementById('nodetitle').innerText = node.data('title');
  document.getElementById('nodesubtitle').innerText = node.data('subtitle');
  document.getElementById('nodetext').innerHTML = node.data('description').replace(/\\n/g, '<br><br>'); // hmmm

  // set link data
  var ul = document.getElementById('nodelinks');
  ul.innerHTML = '';
  if (!node.data('links') || node.data('links').length == 0) {
      ul.innerHTML = 'No Links :(';
      return;
  } 
  for (i = 0; i < node.data('links').length; i++) {
      var a = document.createElement('a');
      var linkText = document.createTextNode(node.data('links')[i].name);
      a.appendChild(linkText);
      a.title = node.data('links')[i].name;
      a.href = node.data('links')[i].url;

      var li = document.createElement('li');
      li.appendChild(a);
      ul.appendChild(li);
  }
}

var loadNodes = () => {
  return new Promise(function (resolve) {
      firestore.collection(NODE_COLLECTION_NAME).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              nodeData = doc.data();
              nodeData['id'] = doc.id;
              cy.add({
                  group: "nodes",
                  data: nodeData
              });
          });
          resolve();
      });
  });
}

var loadEdges = () => {
  return new Promise(function (resolve) {
      firestore.collection(EDGE_COLLECTION_NAME).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              edgeData = doc.data();
              edgeData['id'] = doc.id;
              cy.add({
                  group: "edges",
                  data: edgeData
              });
          });
          resolve();
      });
  })
}

var setLayout = () => {
  // can only figure out layout once all graph loaded
  return new Promise(function (resolve) {
      var layout = cy.layout({ 
          name: 'dagre',
          roots: '#iok',
          padding: 150
      });
      layout.run(); 
      resolve();
  })
}

// load in the nodes and edges and set the layout
loadNodes()
  .then(() => loadEdges())
  .then(() => setLayout());

var removeHighlighted = ( el ) => {
  el.removeClass('highlighted');
  el.removeClass('cycleHighlighted');
}

var setHighlighted = async ( el ) => {
  el.addClass('highlighted');
}

var setCycleHighlighted = async ( el ) => {
  el.addClass('cycleHighlighted');
}

var clearHighlighted = () => {
  cy.nodes().forEach(removeHighlighted);
  cy.edges().forEach(removeHighlighted);
  lastRoot.removeClass('selected');
}

var lastRoot = cy.nodes()[0]; // dummy

var notRootFilter = ( el ) => {
  return el != lastRoot;
}

var drawDependency = (evt) => {
  clearHighlighted();
  var node = evt.target;
  lastRoot = node;
  hasCycle = false;
  var graph = calcDependency(node, cy.collection());
  if (hasCycle) {
    graph.filter(notRootFilter).forEach(setCycleHighlighted);
  } else {
    graph.filter(notRootFilter).forEach(setHighlighted);
  }
  node.addClass('selected');
  setNodeData(node);
}

// recursively calculate dependency graph
var hasCycle = false; 
var calcDependency = (root, dep) => {
  if (root == null) {
    return cy.collection();
  }

  if (dep.contains(root)) {
    hasCycle = true;
    return cy.collection();
  }

  dep = dep.add(root);
  var parents = root.incomers();
  for (var k = 0; k < parents.length; k++) {
    dep = dep.add(calcDependency(parents[k], dep));
  }
  return dep;
}

// cy.fit()
cy.on('tap', 'node', drawDependency);
