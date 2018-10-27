const NODE_COLLECTION_NAME = 'iok-nodes';
const EDGE_COLLECTION_NAME = 'iok-edges';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA5H1Ak-z9AGOwmpwrfVnPQSv2Dl0FD_0E",
    authDomain: "rustielin-5778d.firebaseapp.com",
    databaseURL: "https://rustielin-5778d.firebaseio.com",
    projectId: "rustielin-5778d",
    storageBucket: "rustielin-5778d.appspot.com",
    messagingSenderId: "65465767478"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

// for testing purposes
var addTestNode = () => {
    var payload = {
        title: 'title',
        subtitle: 'subtitle',
        description: 'description',
        links: [
            {
                name: 'google',
                url: 'https://www.google.com/'
            },
            {
                name: 'gmail',
                url: 'https://mail.google.com'
            }
        ]
    };
    writeNode(payload);
}

/****************************PERSISTENCE************************/

var writeNode = (payload) => {
    // should at least have a title
    if (payload.title == null) {
        return;
    }
    cy.add({
        group: 'nodes', 
        data: payload
    });
    addDataDB(NODE_COLLECTION_NAME, payload); 
}

var writeEdge = (payload) => {
    // should at least have source and target
    if (payload.source == null || payload.target == null) {
        return;
    }
    cy.add({
        group: 'edges', 
        data: payload
    });
    addDataDB(EDGE_COLLECTION_NAME, payload); 
}

var addDataDB = (cName, payload) => {
    firestore.collection(cName).add(payload)
        .then(function(doc) {
            alert('Added to DB');
        })
        .catch((function(error) {
            alert('Please check auth. Changes will not persist.');
            alert(error);
        }));
}


/****************************LOADING************************************/

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

/****************************AUTH***************************/


// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: '.',
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

