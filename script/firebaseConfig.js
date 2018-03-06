// Initialize Firebase
let config = {
    apiKey: "AIzaSyABUth1guGRkzmnthGwkExc9ElQ4r3xTSM",
    authDomain: "os-chatt.firebaseapp.com",
    databaseURL: "https://os-chatt.firebaseio.com",
    projectId: "os-chatt",
    storageBucket: "os-chatt.appspot.com",
    messagingSenderId: "885393355147"
};
firebase.initializeApp(config);
let db = firebase.database();