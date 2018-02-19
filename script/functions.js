function showUserNav(e) {
    e.preventDefault();
    document.getElementById('userControls').style.display = 'block';
}
//FUNCTION TO HIDE USER NAV
function hideUserNav(e) {
    e.preventDefault();
    document.getElementById('userControls').style.display = 'none';
}
//FUNCTION TO LOGIN AND ACCESS CHAT
function acessChat(e) {
    e.preventDefault();

    const email = useremail.value;
    const pass = password.value;
    const auth = firebase.auth();

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert('Error : ' + errorMessage + '<br>' + errorCode);

        // ...
    });
} //LOGIN FUNCTION ENDS
// SEND AN ERROR IF LOGIN FAILED
function errorData(err){
    console.log('Error!');
    console.log(err)
}
//TARGET LOGOUT BUTTON
document.getElementById('logout').addEventListener("click", logOut);

//EVENTLISTENER FOR LOGOUT BUTTON
function logOut(e) {
    e.preventDefault();
    firebase.auth().signOut();
}