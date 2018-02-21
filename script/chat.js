// VARIABLES FOR LOGIN INPUTS
/*const userEmail = document.getElementById('userEmail');
const password = document.getElementById('userPass');*/
/*
//CALL THE DATABSE
let database = firebase.database();
//SET VARIABLE FOR WHICH ARRAY OBJECT CALLBACK FUNTION IS GOING TO LOOK IN
let ref = database.ref('users');*/
function showUserNav(e) {
    e.preventDefault();
    document.getElementById('userControls').style.display = 'block';
}
//FUNCTION TO HIDE USER NAV
function hideUserNav(e) {
    e.preventDefault();
    document.getElementById('userControls').style.display = 'none';
}
let myUserName = "";
//FIREBASE FUNCTION TO CHECK FOR CHANGE IN USER/AUTH CHANGE, IF NOT LOGGED IN VALUE IS NULL
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(user !== null){
            myUserName = user.displayName;
            //ID TARGET TO DISPLAY USERNAME IN TOP RIGHT CORNER
            document.getElementById('displayName').innerHTML = myUserName;
            //TARGET COG ICON AND WHEN CLICKED HIDE USER NAV
            document.getElementById("userControls").addEventListener("mouseleave", hideUserNav);
            //TARGET COG ICON AND WHEN CLICKED SHOW USER NAV
            document.getElementById('userSettings').addEventListener('click', showUserNav);
            //EVENTLISTENER FOR LOGOUT BUTTON
            function logOut(e) {
                e.preventDefault();
                firebase.auth().signOut();
            }
            //TARGET LOGOUT BUTTON
            document.getElementById('logout').addEventListener("click", logOut);
        } //END OF IF USER IS NOT NULL
    } else {
        // IF NO USER IS FOUND GO TO INDEX FOR LOGIN
        location.href = "index.html";
    }
}); //firebase.auth().onAuthStateChanged ENDS
