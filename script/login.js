$('#chatLogin').on('click', enterChat); // show user navigation
firebase.auth().onAuthStateChanged(function(user) { // Firebase check if online state has changed for user.
    if (user) { window.location="chat.html"; }
});
