//CREATE TIMESTAMP
time = function (timestamp) { // Convert UNIX epoch time into human readble time.
    let epoch = new Date(timestamp);
    date = epoch.toUTCString();
    return date;
};


//TRIGGER SUBMIT EVENTLISTENER
document.getElementById('chatControls').addEventListener('submit', sendMessage);
//FUNCTION TO SEND MESSAGES
function sendMessage(e) {
    e.preventDefault();
    let chatText = document.getElementById('message').value;
    let time = Firebase.Server.TIMESTAMP;
    console.log(chatText);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Sign in
            console.log(myUserName);
            saveMessage(myUserName, chatText, time);
            // Clear form
            document.getElementById('chatControls').reset();
        }
    });
}

function saveMessage(myUserName, chatText, time){
    let newMessageRef = {
        username: myUserName,
        chattext: chatText,
        timestamp: time // t ska in här
    };

    firebase.database().ref("chatMessage/").push(newMessageRef)
}