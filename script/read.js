//CALLBACK FUNCTION TO GET DATA
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //console.log(myUserName);
        let messageref = firebase.database().ref('chatMessage/');
        messageref.on('value', getMessage);
        function getMessage(data){
            // TARGET DATA KEYS & VALUES
            let chatMessage = data.val();
            let keys = Object.keys(chatMessage);
            //UNCOMMENT THIS TO CONSOLE LOG THE WHOLE USER ARRAY console.log(keys);

            //LOOPS ALL OBJECTS TO RETRIEVE KEY VALUES.

            for(let i = 0; i < keys.length; i++){
                let m = keys[i];
                let author = chatMessage[m].username;
                let chatmessage = chatMessage[m].chattext;
                let timeStamped = chatMessage[m].timestamp;

                document.getElementById("displayMessage").innerHTML += `<article id="chatContent"><p>
                <span id="chatUserName">${author}</span>
                <span id="chatTimeStamp">${timeStamped}</span>
                </p>
                <p id="chatMessage">${chatmessage}</p>
                </article>`;

            }
        }
    }
});