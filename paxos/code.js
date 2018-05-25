ELECTION_TIMEOUT = 1000 // in ms
HEARTBEAT_TIMEOUT = 1000 // in ms
LEADER = 0 // index of leader

PIE_SLICES = 5 // 1 to 16

var cy = cytoscape({
  container: document.getElementById('cy'),

  zoomingEnabled: false,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)',
        'pie-1-background-color': '#E8747C',
        'pie-1-background-size': 'mapData(foo, 0, 10, 0, 100)',
        'pie-2-background-color': '#74CBE8',
        'pie-2-background-size': 'mapData(bar, 0, 10, 0, 100)',
        'pie-3-background-color': '#74E883',
        'pie-3-background-size': 'mapData(baz, 0, 10, 0, 100)'
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
        'line-color': '#E8747C',
        'target-arrow-color': '#75b5aa',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),

  elements: {
      nodes: [
        { data: { id: 'a', foo: 10 } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'e' } },
        { data: { id: 'f' } }

      ],

      edges: [
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'ac', source: 'a', target: 'c' } },
        { data: { id: 'ad', source: 'a', target: 'd' } },
        { data: { id: 'ae', source: 'a', target: 'e' } },
        { data: { id: 'af', source: 'a', target: 'f' } },

        { data: { id: 'bc', source: 'b', target: 'c' } },
        { data: { id: 'bd', source: 'b', target: 'd' } },
        { data: { id: 'be', source: 'b', target: 'e' } },
        { data: { id: 'bf', source: 'b', target: 'f' } },

        { data: { id: 'cd', source: 'c', target: 'd' } },
        { data: { id: 'ce', source: 'c', target: 'e' } },
        { data: { id: 'cf', source: 'c', target: 'f' } },

        { data: { id: 'de', source: 'd', target: 'e' } },
        { data: { id: 'df', source: 'd', target: 'f' } },

        { data: { id: 'ef', source: 'e', target: 'f' } }



      ]
    },

  layout: {
    name: 'circle',
    roots: '#a',
    padding: 150
  }
});

// var bfs = cy.elements().dfs('#a', function(){}, false);

// var i = 0;
// var highlightNextEle = async function() {
//   if( i < bfs.path.length ){
//     bfs.path[i].addClass('highlighted');
//     for (j = 1; j <= PIE_SLICES; j++) {
//         bfs.path[i].data("foo", j)
//         await sleep(ELECTION_TIMEOUT / PIE_SLICES)
//     }
//     i++;
//     highlightNextEle()
//   }
// };

var electionCycle = async function() {
    i = 0
    while (true) {
        if (i == LEADER) {
            continue
        }
        for (j = 1; j <= PIE_SLICES; j++) {
            cy.nodes()[i].data("foo", j)
            await sleep(ELECTION_TIMEOUT / PIE_SLICES)
        }
        i = (i + 1)%cy.nodes().size()

        await sleep (1000)
    }

}

// beats the vertex v forever
var heartbeatCycle = async function() {
    big = true
    while (true) {
        if (big) {
            cy.nodes()[LEADER].animate({
                style: {
                    'height': 50,
                    'width': 50
                }
            })
        } else {
            cy.nodes()[LEADER].animate({
                style: {
                    'height': 30,
                    'width': 30
                }
            })
        }
        big = !big

        await sleep (1000)
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// kick off first highlight
// highlightNextEle();
// electionCycle();
heartbeatCycle();
