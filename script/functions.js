// Function to display or hide user navigation
function showUserNav(e) {
    e.preventDefault();
    $('#userControls').show();
}
function hideUserNav(e) {
    e.preventDefault();
    $('#userControls').hide();
}

// Function to display users that are online.
function showOnlineUsers(){
    let existing = $('#onlineWindow');
    let showOnlineUsers = document.createElement('div');
    showOnlineUsers.setAttribute('id', 'onlinePresence');
    $(existing).append(showOnlineUsers);
    refUsersOnline.on("value", function(data) {
        let users = data.val();
        let values = Object.values(users);
        values.forEach(function(onlineUser) {
            if(onlineUser.status === "Online"){
                usersOnline.push({username: onlineUser.username, status: onlineUser.status});
            }
        });
        showOnlineUsers.innerHTML = "";
        usersOnline.forEach(function (displayUserOnline){
            let usersDisplay = document.createElement('p');
            usersDisplay.innerText = displayUserOnline.username;
            $(showOnlineUsers).append(usersDisplay);
            usersOnline = [];
        });
    });
}
