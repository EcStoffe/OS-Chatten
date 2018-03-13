setInterval(function(){theTimer();},1000);
let usersOnline = [];
let refUsersOnline = db.ref('users/').child('/'); // Belongs to callback function showOnlineUsers.
// Function to display users that are online.
function showOnlineUsers(){
    let existing = $('#onlineWindow');
    let showOnlineUsers = $('<div></div>').attr('id', 'onlinePresence');
    existing.append(showOnlineUsers);
    refUsersOnline.on("value", function(data) {
        let users = data.val();
        let values = Object.values(users);
            values.forEach(function(onlineUser) {
                if(onlineUser.status === "Online"){
                    usersOnline.push({username: onlineUser.username, status: onlineUser.status});
                }
            });
            showOnlineUsers.html("");
            usersOnline.forEach(function (displayUserOnline){
                let usersDisplay = $('<p></p>');
                usersDisplay.html('<i class="fas fa-circle"></i> '+displayUserOnline.username);
                showOnlineUsers.append(usersDisplay);
                usersOnline = [];
            });
    });
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let myUserName = user.displayName;
        let refChangingStatus = firebase.database().ref("users/"+myUserName);
        refChangingStatus.update({ status: "Online" }); // Calling database reference to update users online status.
            showOnlineUsers(); // Call to function that displays users that are online
            $('#displayName').html(user.displayName); //display username
            $('#userSettings').on('click', showUserNav); // show user navigation
            $('#userControls').on('mouseleave', hideUserNav); // hide user navigation

        $('#chatRoom-One').click(function(event){
            event.preventDefault();
            $('#chatRoom-One').addClass('active');
            $('#chatRoom-Two').removeClass('active');
            $('#chatRoom-Three').removeClass('active');
            $('body').css('background-image', 'url(images/sunvacation.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomOne/");
            $('#mainChat').html(`<section id="chatRoomOne"></section>`+formContent());
            chatDisplayRoomOneMessage();
            $('form').submit(sendMessageChat);
        });
        $('#chatRoom-Two').click(function(event){
            event.preventDefault();
            $('#chatRoom-One').removeClass('active');
            $('#chatRoom-Two').addClass('active');
            $('#chatRoom-Three').removeClass('active');
            $('body').css('background-image', 'url(images/wintervacation.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomTwo/");
            $('#mainChat').html(`<section id="chatRoomTwo"></section>`+formContent());
            chatDisplayRoomTwoMessage();
            $('form').submit(sendMessageChat);
        });
        $('#chatRoom-Three').click(function(event){
            event.preventDefault();
            $('#chatRoom-One').removeClass('active');
            $('#chatRoom-Two').removeClass('active');
            $('#chatRoom-Three').addClass('active');
            $('body').css('background-image', 'url(images/weekend.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomThree/");
            $('#mainChat').html(`<section id="chatRoomThree"></section>`+formContent());
            chatDisplayRoomThreeMessage();
            $('form').submit(sendMessageChat);
        });
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
        function sendMessageChat(e) {
            e.preventDefault();
            let chatText = $('#message').val();
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    sendMessages(myUserName, chatText, timeStamp);
                    $('form')[0].reset();
                }
            });
        }
        function sendMessages(myUserName, chatText, timeStamp){
            let newMessageRef = {
                username: myUserName,
                chattext: chatText,
                timestamp: timeStamp
            };
            firebaseref.push(newMessageRef)
        }
    }
    else { location.href = "index.html"; }
});