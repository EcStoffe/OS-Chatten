//TARGET LOGIN BUTTON
document.getElementById('chatLogin').addEventListener('submit', acessChat);
// VARIABLES FOR LOGIN INPUTS
const useremail = document.getElementById('userEmail');
const password = document.getElementById('userPass');

//FIREBASE FUNCTION TO CHECK FOR CHANGE IN USER/AUTH CHANGE, IF NOT LOGGED IN VALUE IS NULL
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user signed in
        //document.getElementById('userWelcome').style.display = 'block';
        //document.getElementById('loginNeeded').style.display = 'none';
        location.href = "chat.html";
    } else {
        // user not signed in
        document.getElementById('userWelcome').style.display = 'none';
        document.getElementById('loginNeeded').style.display = 'block';
    }
}); //firebase.auth().onAuthStateChanged ENDS


//CHANGE DISPLAYNAME IN AUTH SERVER CODE
//TODO: Needs to be connected to input and button.
/*let user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: 'malinH'
    });*/

