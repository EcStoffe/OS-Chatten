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
        myUserName = user.displayName;
        let ref = firebase.database().ref("users/"+user.displayName);
        ref.update({
            status: "Online"
        });
        if(user !== null){
                let existing = document.getElementById('onlineWindow');
                let showOnlineUsers = document.createElement('div');
                showOnlineUsers.setAttribute('id', 'onlinePresence');
                $(existing).append(showOnlineUsers);
            refOn.on("value", function(data) {
                let users = data.val();
                let values = Object.values(users);
                //console.log("users", users);
                values.forEach(function(onlineUser) {
                    if(onlineUser.status === "Online"){
                        isOnline.push({username: onlineUser.username, status: onlineUser.status});
                    }
                });
                showOnlineUsers.innerHTML = "";
                isOnline.forEach(function (displayUserOnline){
                        let usersDisplay = document.createElement('p');
                        usersDisplay.innerText = displayUserOnline.username;
                        $(showOnlineUsers).append(usersDisplay);
                    isOnline = [];
                });
            });

            $('#displayName').html(user.displayName); //display username
            $('#userSettings').on('click', showUserNav); // show user navigation

            $('#userControls').on('mouseleave', hideUserNav); // hide user navigation

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
