/*
//CREATE TIMESTAMP
setInterval(function(){theTimer();},1000);
function theTimer() {
    let currentDate = new Date();
    let time = currentDate.toLocaleTimeString();
    let date = currentDate.toLocaleDateString();
    document.getElementsByClassName("chatTimeStamp").innerHTML += date + time;
    
timeStamp = date+' '+time;
}
//TRIGGER SUBMIT EVENTLISTENER
document.getElementById('chatControls').addEventListener('click', sendMessage);
//FUNCTION TO SEND MESSAGES
function sendMessage(e) {
    e.preventDefault();
    let chatText = document.getElementById('message').value;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Sign in
            saveMessage(myUserName, chatText, timeStamp);
            // Clear form
            document.getElementById('chatControls').reset();
        }
    });
}

function saveMessage(myUserName, chatText, timeStamp){
    let newMessageRef = {
        username: myUserName,
        chattext: chatText,
        timestamp: timeStamp
    };
    firebase.database().ref("chatRoomOne/").push(newMessageRef)
}*/
