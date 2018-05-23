var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autoungrabify: true,
  autounselectify: false,
  panningEnabled: false,
  zoomingEnabled: false,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'width': 4,
        'line-color': '#75b5aa',
        'target-arrow-color': '#75b5aa'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#75b5aa',
        'line-color': '#75b5aa',
        'target-arrow-color': '#75b5aa',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),

  elements: {
      nodes: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'e' } }
      ],

      edges: [
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'ac', source: 'a', target: 'c' } },
        { data: { id: 'ad', source: 'a', target: 'd' } },
        { data: { id: 'ae', source: 'a', target: 'e' } },

        { data: { id: 'bc', source: 'b', target: 'c' } },
        { data: { id: 'bd', source: 'b', target: 'd' } },
        { data: { id: 'be', source: 'b', target: 'e' } },

        { data: { id: 'cd', source: 'c', target: 'd' } },
        { data: { id: 'ce', source: 'c', target: 'e' } },

        { data: { id: 'de', source: 'd', target: 'e' } },



      ]
    },

  layout: {
    name: 'circle',
    directed: false,
    roots: '#a',
    padding: 100
  }
});

var bfs = cy.elements().bfs('#a', function(){}, true);

var i = 0;
var highlightNextEle = function(){
  if( i < bfs.path.length ){
    bfs.path[i].addClass('highlighted');

    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();
