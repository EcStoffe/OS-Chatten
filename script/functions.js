// Functions to save user details for registration
function saveInputs(username, fullname, email, password){
    firebase.database().ref('users/' + username).set({
        username: username,
        name: fullname,
        email: email,
        password: password,
        status: "Online"
    });
}
function regForm(e) {
    e.preventDefault();
    let username = $('#newUserName').val();
    let fullname = $('#newUserFullName').val();
    let email = $('#newUserEmail').val();
    let password = $('#newUserPass').val();
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise.catch(e => alert("Error: "+e.message));
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            saveInputs(username, fullname, email, password);
            user.updateProfile({ displayName: username })
            .then(function() { window.location="chat.html"; })
            .catch(function() {
                if(user.displayName === null) {
                    user.updateProfile({ displayName: username })
                }
            }); //...
        }
    });
}
// Function to login users
function enterChat(e) {
    e.preventDefault();
    const useremail = $('#userEmail').val();
    const password = $('#userPass').val();
    firebase.auth().signInWithEmailAndPassword(useremail, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert('Error : ' + errorMessage + '\n' + errorCode);
    });
}
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
    let showOnlineUsers = $('<div></div>');
    showOnlineUsers.attr('id', 'onlinePresence');
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
            let usersDisplay = $('<p></p>');
            usersDisplay.html('<i class="fas fa-circle"></i> '+displayUserOnline.username);
            $(showOnlineUsers).append(usersDisplay);
            usersOnline = [];
        });
    });
}

function chatDisplayMessage(){
    firebaseref.on("value", function(data) {
        let messagesObj = data.val();
        let messages = Object.values(messagesObj);
        existingID.html("");

        messages.forEach(function(message) {
            let author = message.username;
            let chatmessage = message.chattext;
            let timeStamped = message.timestamp;

            let mainArticle = $('<article></article>').attr('class', 'chatContent');
            let paragraphOne = $('<p></p>');
            let spanOne = $('<span></span>').attr('class', 'chatUserName').text(author);
            let spanTwo = $('<span></span>').attr('class', 'chatTimeStamp').text(timeStamped);
            let paragraphTwo = $('<p></p>').attr('class', 'chatMessage').text(chatmessage);

            existingID.append(mainArticle);
            mainArticle.append(paragraphOne, paragraphTwo);
            paragraphOne.append(spanOne, spanTwo);
        });
        $('#mainChat').find('section:first-of-type').animate({scrollTop: $('article:last-of-type').position().top}, 0);
        return false;
        
    });
}
function formContent(){
    return `<form><div class="form-group input-group">
                    <div class="input-group-prepend btn-outline-secondary">
                        <span class="input-group-text"><i class="far fa-smile"></i></span>
                    </div>
                    <input class="form-control" type="text" id="message" placeholder="Skriv meddelande">
                    <div id="buttonHome" class="input-group-append">
                        <button type="submit" class="btn btn-outline-secondary"><i class="fas fa-sign-in-alt"></i></button>
                    </div>
                </div>
            </form>`
}
function theTimer() {
    let currentDate = new Date();
    let time = currentDate.toLocaleTimeString();
    let date = currentDate.toLocaleDateString();
    document.getElementsByClassName("chatTimeStamp").innerHTML += timeStamp = date+ ' ' +time;
}

//FUNCTION TO SEND MESSAGES
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