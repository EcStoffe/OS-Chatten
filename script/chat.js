function showUserNav(e) {
    e.preventDefault();
    $('#userControls').show();
}
function hideUserNav(e) {
    e.preventDefault();
    $('#userControls').hide();
}
// Firebase auth check for status change
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let ref = firebase.database().ref("users/"+user.displayName);
        ref.update({
            status: "Online"
        }).then(function() { //..
        }).catch(function() {
            alert("Something went wrong")
        });
        if(user !== null){
            $('#displayName').html(user.displayName); //display username
            $('#userSettings').on('click', showUserNav); // show user navigation
            $('#userControls').on('mouseleave', hideUserNav); // hide user navigation

            //TODO: Push user into array
            //TODO: Loop array/object?
            //TODO: Display the users in the array
            let isOnline = [];
            let users = db.ref('users/'+user.displayName);
            users.on('value', function(snapshot) {
                for (let userOnline of Object.values(snapshot.val())) {
                    userOnline = snapshot.val();
                    console.log(userOnline.username+" is "+userOnline.status);
                    if(userOnline.status === "Online") {
                        isOnline.push(userOnline.username)
                    }
                    console.log(isOnline)
                }
            });

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
