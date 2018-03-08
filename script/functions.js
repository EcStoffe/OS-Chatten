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
            .catch(function() {
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
            usersDisplay.innerHTML = '<i class="fas fa-circle"></i> '+displayUserOnline.username;
            $(showOnlineUsers).append(usersDisplay);
            usersOnline = [];
        });
    });
}

function chatDisplayMessage(){
    firebaseref.on("value", function(data) {
        let messagesObj = data.val();
        let messages = Object.values(messagesObj);
        existingID.innerHTML = "";

        messages.forEach(function(message) {
            let author = message.username;
            let chatmessage = message.chattext;
            let timeStamped = message.timestamp;

            let mainArticle = document.createElement('article');
            mainArticle.setAttribute('class', 'chatContent');
            existingID.appendChild(mainArticle);
            let paragraphOne = document.createElement('p');
            mainArticle.appendChild(paragraphOne);
            let spanOne = document.createElement('span');
            spanOne.setAttribute('class', 'chatUserName');
            paragraphOne.appendChild(spanOne);
            let spanOneText = document.createTextNode(author);
            spanOne.appendChild(spanOneText);
            let spanTwo = document.createElement('span');
            spanTwo.setAttribute('class', 'chatTimeStamp');
            paragraphOne.appendChild(spanTwo);
            let spanTwoText = document.createTextNode(timeStamped);
            spanTwo.appendChild(spanTwoText);
            let paragraphTwo = document.createElement('p');
            paragraphTwo.setAttribute('class', 'chatMessage');
            mainArticle.appendChild(paragraphTwo);
            let ParagraphTwoText = document.createTextNode(chatmessage);
            paragraphTwo.appendChild(ParagraphTwoText);
        });
        document.querySelector('#mainChat > section:first-of-type').scrollTo(0, 5000);
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
    document.getElementsByClassName("chatTimeStamp").innerHTML += timeStamp = date+' '+time;
}

//FUNCTION TO SEND MESSAGES
function sendMessageChat(e) {
    e.preventDefault();
    let chatText = document.getElementById('message').value;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            sendMessages(myUserName, chatText, timeStamp);
            document.querySelector('form').reset();
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