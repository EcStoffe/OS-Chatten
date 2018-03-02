function showUserNav(e) {
    e.preventDefault();
    $('#userControls').show();
}
function hideUserNav(e) {
    e.preventDefault();
    $('#userControls').hide();
}
// Firebase auth check for status change
let isOnline = [];
//let refOn = db.ref('users/').orderByChild('status').equalTo('Online');
let refOn = db.ref('users/').child('/');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let ref = firebase.database().ref("users/"+user.displayName);
        ref.update({
            status: "Online"
        });
        if(user !== null){
            //TODO: Push user into array of objects ((DONE???))
                let existing = document.getElementById('onlineWindow');
                let showOnlineUsers = document.createElement('div');
                showOnlineUsers.setAttribute('id', 'onlinePresence');
                $(existing).append(showOnlineUsers);
            refOn.on("value", function(data) {
                let users = data.val();
                let values = Object.values(users);
                //console.log("users", users);
                values.forEach(function(onlineUser) {
                    //console.log("username", onlineUser.username+' : '+onlineUser.status);
                    if(onlineUser.status === "Online"){
                        isOnline.push({username: onlineUser.username, status: onlineUser.status});
                    }
                });
                    //console.log(isOnline);
                showOnlineUsers.innerHTML = "";
                    for(let userOnline of isOnline){

                        let usersDisplay = document.createElement('p');
                        usersDisplay.innerText = userOnline.username;
                        $(showOnlineUsers).append(usersDisplay);
                        console.log(usersDisplay);
                        console.log("isOnline array", userOnline);
                        console.log("display username", userOnline.username);
                    }
            });

            $('#displayName').html(user.displayName); //display username
            $('#userSettings').on('click', showUserNav); // show user navigation

            $('#userControls').on('mouseleave', hideUserNav); // hide user navigation
            //TODO: Loop array/object to display
            //TODO: Remove users from array of objects when status update to offline

            function logOut(e) {
                e.preventDefault();
                let ref = firebase.database().ref("users/"+user.displayName);
                ref.update({
                    status: "Offline"
                }).then(function() {
                    firebase.auth().signOut();
                }).catch(function() {
                    alert("Something went wrong")
                });
            }
            $('#logout').on('click', logOut); // logout
        }
    } else {
        location.href = "index.html"; // when use is not online, redirect to index.html
    }
});
