/*let usersOnline = [];
let refUsersOnline = db.ref('users/').child('/'); // Belongs to callback function showOnlineUsers.
firebase.auth().onAuthStateChanged(function(user) { // Firebase auth check for status change
    if (user) {
        myUserName = user.displayName;
        let refChangingStatus = firebase.database().ref("users/"+user.displayName);
        refChangingStatus.update({ status: "Online" }); // Calling database reference to update users online status.
        if(user !== null){
            showOnlineUsers(); // Call to function that displays users that are online
            $('#displayName').html(user.displayName); //display username
            $('#userSettings').on('click', showUserNav); // show user navigation
            $('#userControls').on('mouseleave', hideUserNav); // hide user navigation

            function logOut(e) { // Function to sign users out
                e.preventDefault();
                let ref = firebase.database().ref("users/"+user.displayName);
                ref.update({ status: "Offline" })
                    .then(function() { firebase.auth().signOut(); })
                    .catch(function() {
                        //...
                    });
            }
            $('#logout').on('click', logOut); // Eventhandler for click to callback function logOut.
        }
    }
    else { location.href = "index.html"; }
});*/
