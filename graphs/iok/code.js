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
      }),

  elements: {

      // throw all this in a database
      nodes: [
        { data: { id: 'lec1-1', title: 'Bitcoin Protocol & Consensus', subtitle: 'A High Level Overview'} },
        { data: { id: 'lec1-2', title: 'Blockchain History', subtitle: 'From the Cypherpunk Movement to JP Morgan Chase' } },
        { data: { id: 'lec1-3', title: 'Bitcoin Mechanics & Optimizations', subtitle: 'A Technical Overview' } },
        { data: { id: 'lec1-4', title: 'Wallet Mechanics, Mining, & More', subtitle: 'Bitcoin IRL' } },
        { data: { id: 'lec1-5', title: 'Game Theory & Network Attacks', subtitle: 'How to Attack Bitcoin' } },
        { data: { id: 'lec1-6', title: 'Ethereum', subtitle: 'Enabling a Decentralized Future' } },
        { data: { id: 'lec2-1', title: 'Distributed Systems & Consensus', subtitle: 'Trust Without Trust' } },
        { data: { id: 'lec2-2', title: 'Cryptoeconomics & Proof-of-Stake', subtitle: 'Securing Incentives' } },
        { data: { id: 'lec2-3', title: 'Enterprise Blockchain', subtitle: 'Real-World Applications' } },
        { data: { id: 'lec2-4', title: 'Scaling Blockchain', subtitle: 'Cryptocurrency for the Masses' } },
        { data: { id: 'lec2-5', title: 'Anonymity, Mixing, & Altcoins', subtitle: 'The Fight for Privacy' } },
        { data: { id: 'lec2-6', title: 'A Blockchain Powered Future', subtitle: '' } }

      ],

      edges: [
        // course 1
        { data: { id: 'lec1-1_1-3', source: 'lec1-1', target: 'lec1-3' } },
        { data: { id: 'lec1-3_1-4', source: 'lec1-3', target: 'lec1-4' } },
        { data: { id: 'lec1-4_1-5', source: 'lec1-4', target: 'lec1-5' } },
        { data: { id: 'lec1-5_1-6', source: 'lec1-5', target: 'lec1-6' } },
        { data: { id: 'lec1-2_1-6', source: 'lec1-2', target: 'lec1-6' } },

        // bridge
        { data: { id: 'lec1-6_2-1', source: 'lec1-6', target: 'lec2-1' } }, 

        // course 2
        { data: { id: 'lec2-1_2-2', source: 'lec2-1', target: 'lec2-2' } },
        { data: { id: 'lec2-2_2-3', source: 'lec2-2', target: 'lec2-3' } },
        { data: { id: 'lec2-2_2-4', source: 'lec2-2', target: 'lec2-4' } },
        { data: { id: 'lec2-2_2-5', source: 'lec2-2', target: 'lec2-5' } },
        { data: { id: 'lec2-3_2-6', source: 'lec2-3', target: 'lec2-6' } },
        { data: { id: 'lec2-4_2-6', source: 'lec2-4', target: 'lec2-6' } },
        { data: { id: 'lec2-5_2-6', source: 'lec2-5', target: 'lec2-6' } },
      ]
    },

  layout: {
    name: 'dagre',
    roots: '#lec1-1',
    padding: 150
  },
});

var setNodeData = (node) => {
  document.getElementById('nodetitle').innerText = node.data('title');
  document.getElementById('nodesubtitle').innerText = node.data('subtitle');

}

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
