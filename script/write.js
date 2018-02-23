//CREATE TIMESTAMP
setInterval(function(){theTimer();},1000);
function theTimer() {
    let currentTime = new Date().toLocaleTimeString();
    
let date = new Date();

let year = date.getFullYear().toString();
let month = (date.getMonth() + 1).toString();
if(month.length < 2){
    month = 0 + month;
}
let day  = date.getDate().toString();
if(day.length < 2){
    day = 0 + day;
}
let hour = date.getHours().toString();
if(hour.length < 2){
    hour = 0 + hour;
}
let minut = date.getMinutes().toString();
if(minut.length < 2){
    minut = 0 + minut;
}

timeStamp = year + '-' + month + '-' + day + " " + hour + ':' + minut;

document.getElementsByClassName("chatTimeStamp").innerHTML += timeStamp + currentTime;
}
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