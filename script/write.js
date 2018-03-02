//CREATE TIMESTAMP
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let day = currentDate.getDay();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;


let timeStamp = `${year}-${month}-${day}, ${hours}:${minutes}`;

//TRIGGER SUBMIT EVENTLISTENER
document.getElementById('chatControls').addEventListener('submit', sendMessage);
//FUNCTION TO SEND MESSAGES
function sendMessage(e) {
    e.preventDefault();
    let chatText = document.getElementById('message').value;
    console.log(chatText);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Sign in
            console.log(myUserName);
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

    firebase.database().ref("chatMessage/").push(newMessageRef)
}