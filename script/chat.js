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
let refOn = db.ref('users/');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let ref = firebase.database().ref("users/"+user.displayName);
        ref.update({
            status: "Online"
        }).then(function() {
            //...
        }).catch(function() {
            alert("Something went wrong")
        });
        if(user !== null){
            $('#displayName').html(user.displayName); //display username
            $('#userSettings').on('click', showUserNav); // show user navigation
            $('#userControls').on('mouseleave', hideUserNav); // hide user navigation

            //TODO: Push user into array of objects ((DONE???))
            //TODO: Loop array/object to display
            //TODO: Remove users from array of objects when status update to offline

            refOn.on('child_changed', function(data) {
                if(data.val().status === "Online") {
                    isOnline.push({username: data.val().username});
                    console.log(isOnline)
                }
                //console.log('child changed: '+data.val().username, data.val().status);
                //console.log(isOnline)
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
