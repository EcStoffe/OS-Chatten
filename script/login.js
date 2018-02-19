//TARGET LOGIN BUTTON
document.getElementById('chatLogin').addEventListener('submit', acessChat);
// VARIABLES FOR LOGIN INPUTS
const useremail = document.getElementById('userEmail');
const password = document.getElementById('userPass');

function acessChat(e) {
    e.preventDefault();

    const email = useremail.value;
    const pass = password.value;

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert('Error : ' + errorMessage + '<br>' + errorCode);

        // ...
    });
} //LOGIN FUNCTION ENDS

//FIREBASE FUNCTION TO CHECK FOR CHANGE IN USER/AUTH CHANGE, IF NOT LOGGED IN VALUE IS NULL
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        location.href = "chat.html";
    } else {
        // user not signed in
    }
}); //firebase.auth().onAuthStateChanged ENDS
