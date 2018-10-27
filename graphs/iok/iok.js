var EDIT_MODE = false;

var selectedSource;
var selectedTarget;
var selectedEdge;

var cy = cytoscape({
    container: document.getElementById('cy'),
    style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'content': 'data(title)'
        })
      .selector('edge')
        .css({
          'curve-style': 'bezier',
          'width': 4,
          'target-arrow-shape': 'triangle',
        })
      .selector('.selected') // same color as target, for dependency representation
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
      .selector('.altHighlighted')
        .css({
          'background-color': '#E8747C',
          'line-color': '#E8747C',
          'target-arrow-color': '#E8747C',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        })
});

/**
 * Set node data to HMTL
 * @param {*} node 
 */
var setNodeData = (node) => {
    document.getElementById('nodetitle').innerText = node.data('title');
    if (node.data('subtitle')) {
        document.getElementById('nodesubtitle').innerText = node.data('subtitle');
    }
    if (node.data('description')) {
        document.getElementById('nodetext').innerHTML = node.data('description').replace(/\\n/g, '<br><br>'); // hmmm
    }

    // set link data
    var ul = document.getElementById('nodelinks');
    ul.innerHTML = '';
    if (!node.data('links') || node.data('links').length == 0) {
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

var toggleEditMode = () => {
    EDIT_MODE = !EDIT_MODE;
    selectedEdge = null;
    selectedSource = null;
    selectedTarget = null;

    clearHighlighted();

    toggleVisByID('addEdgeButton');
    toggleVisByID('addNodeButton');
    toggleVisByID('firebaseui-auth-container');
    
}

var toggleVisByID = (s) => {
    var x = document.getElementById(s);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/****************************STYLING**********************************/

var removeHighlighted = ( el ) => {
    el.removeClass('highlighted');
    el.removeClass('altHighlighted');
}

var setHighlighted = async ( el ) => {
    el.addClass('highlighted');
}

var setAltHighlighted = async ( el ) => {
    el.addClass('altHighlighted');
}

var unselect = async ( el ) => {
    el.removeClass('selected');
    el.unselect();
}

var clearHighlighted = () => {
    cy.nodes().forEach(removeHighlighted);
    cy.edges().forEach(removeHighlighted);
    cy.nodes().forEach(unselect);
    cy.edges().forEach(unselect);
}

/****************************GRAPH ALGORITHMS*************************/

var notRootFilter = ( el ) => {
    return el != lastRoot;
}

var lastRoot = cy.nodes()[0]; // dummy
var drawDependency = (evt) => {
    clearHighlighted();
    var node = evt.target;
    lastRoot = node;
    hasCycle = false;
    var graph = calcDependency(node, cy.collection());
    if (hasCycle) {
        graph.filter(notRootFilter).forEach(setAltHighlighted);
    } else {
        graph.filter(notRootFilter).forEach(setHighlighted);
    }
    node.addClass('selected');
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

/****************************EVENT LISTENERS****************************/

var handleNodeTap = (evt) => {
    setNodeData(evt.target);
    if (EDIT_MODE) {
        tappedNode(evt);
    } else {
        drawDependency(evt);
    }
}

var handleEdgeTap = (evt) => {
    if (EDIT_MODE) {
        tappedEdge(evt);
    }
}

/**
 * Set selected node, based on touch evt
 * Can have up to 2 selected nodes (source, target) or and 1 edge
 * @param {*} evt 
 */
var tappedNode = (evt) => {
    selectedEdge = null; // clearing this for sanity
    var node = evt.target;
    if (selectedSource == null && selectedTarget == null) { // both empty, set source
        clearHighlighted();
        selectedSource = node;
        selectedSource.addClass('highlighted');
        return;
    } else if (selectedSource != null && selectedTarget == null) { // only target empty, set target
        selectedTarget = node;
        selectedTarget.addClass('altHighlighted');
        return;
    } else { // reset
        clearHighlighted();
        selectedSource = node;
        selectedSource.addClass('highlighted');
        selectedTarget = null;
    }
}

/**
 * Set selected edge, based on touch evt
 * Can have up to 2 selected nodes (source, target) or and 1 edge
 * @param {*} evt 
 */
var tappedEdge = (evt) => {
    selectedSource = null;
    selectedTarget = null; // clearing this for sanity
    clearHighlighted();
    selectedEdge = evt.target;
    selectedEdge.addClass('highlighted');
}

// setting source and target
cy.on('tap', 'node', handleNodeTap);
cy.on('tap', 'edge', handleEdgeTap);

/****************************EDITING********************************/

var addNode = () => {
    // do something here
}

/**
 * Edit the most recently clicked node
 */
var editNode = () => {
    var recent;
    if (selectedSource != null && selectedTarget == null) {
        recent = selectedSource;
    } else if (selectedSource != null && selectedTarget != null) {
        recent = selectedTarget;
    } else {
        return; // no node is selected
    }
    // modify the UI
}

var addEdge = () => {
    if (selectedSource == null || selectedTarget == null) {
        alert("Please select source and target nodes");
        return;
    }

    var sourceID = selectedSource.data('id');
    var targetID = selectedTarget.data('id');

    var selector = "[source=\'" + sourceID + "\'][target=\'" + targetID +"\']" ;

    if (cy.edges(selector).length == 0) {
        var payload = {
            source: sourceID,
            target: targetID
        }
        writeEdge(payload);
    } else {
        alert('Edge already exists');
    }

}

/****************************MAIN********************************/

// load in the nodes and edges and set the layout
loadNodes()
    .then(() => loadEdges())
    .then(() => setLayout());