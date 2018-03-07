//CREATE TIMESTAMP
setInterval(function(){theTimer();},1000);
function theTimer() {
    let currentDate = new Date();
    let time = currentDate.toLocaleTimeString();
    let date = currentDate.toLocaleDateString();
    document.getElementsByClassName("chatTimeStamp").innerHTML += date + time;

    timeStamp = date+' '+time;
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

//CALLBACK FUNCTION TO GET DATA
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#chatRoom-One').click(function(event){
            event.preventDefault();
            firebaseref = firebase.database().ref("chatRoomOne/");
            messageref = firebase.database().ref('chatRoomOne');
            $('#mainChat').html(`<section id="chatRoomOne"></section>
            <form id="controlsRoomOne">
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-smile"></i></span>
                    </div>
                    <input class="form-control" type="text" id="message" placeholder="Skriv meddelande">
                    <div id="buttonHome" class="input-group-append">
                        <button type="submit" class="btn btn-outline-secondary"><i class="fas fa-sign-in-alt"></i></button>
                    </div>
                </div>
            </form>`);
            existingID = document.getElementById('chatRoomOne');
            chatDisplayMessage();
            document.getElementById('controlsRoomOne').addEventListener('submit', sendMessageChat);
        });
        $('#chatRoom-Two').click(function(){
            event.preventDefault();
            firebaseref = firebase.database().ref("chatRoomTwo/");
            messageref = firebase.database().ref('chatRoomTwo');
            $('#mainChat').html(`<section id="chatRoomTwo"></section>
            <form id="controlsRoomTwo">
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-smile"></i></span>
                    </div>
                    <input class="form-control" type="text" id="message" placeholder="Skriv meddelande">
                    <div id="buttonHome" class="input-group-append">
                        <button type="submit" class="btn btn-outline-secondary"><i class="fas fa-sign-in-alt"></i></button>
                    </div>
                </div>
            </form>`);
            existingID = document.getElementById('chatRoomTwo');
            chatDisplayMessage();
            document.getElementById('controlsRoomTwo').addEventListener('submit', sendMessageChat);
        });
        $('#chatRoom-Three').click(function(){
            event.preventDefault();
            firebaseref = firebase.database().ref("chatRoomThree/");
            messageref = firebase.database().ref('chatRoomThree');
            $('#mainChat').html(`<section id="chatRoomThree"></section>
            <form id="controlsRoomThree">
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-smile"></i></span>
                    </div>
                    <input class="form-control" type="text" id="message" placeholder="Skriv meddelande">
                    <div id="buttonHome" class="input-group-append">
                        <button type="submit" class="btn btn-outline-secondary"><i class="fas fa-sign-in-alt"></i></button>
                    </div>
                </div>
            </form>`);
            existingID = document.getElementById('chatRoomThree');
            chatDisplayMessage();
            document.getElementById('controlsRoomThree').addEventListener('submit', sendMessageChat);
        });
    }
});