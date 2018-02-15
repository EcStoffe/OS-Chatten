// Function to return firebase initialize.
function initializeFirebase() {
    let config = {
        apiKey: "AIzaSyABUth1guGRkzmnthGwkExc9ElQ4r3xTSM",
        authDomain: "os-chatt.firebaseapp.com",
        databaseURL: "https://os-chatt.firebaseio.com",
        projectId: "os-chatt",
        storageBucket: "os-chatt.appspot.com",
        messagingSenderId: "885393355147"
    };
    return firebase.initializeApp(config);
}
// Funtions to get id from elements.
function getInputValue(id){
    return document.getElementById(id).value;
}