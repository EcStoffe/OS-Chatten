//CALLBACK FUNCTION TO GET DATA
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //console.log(myUserName);
        let roomOneref = firebase.database().ref('roomOneMessage/');
        roomOneref.on('value', getMessage);

        let roomTworef = firebase.database().ref('roomTwoMessage/');
        roomTworef.on('value', getMessage);

        let generalref = firebase.database().ref('generalMessage/');
        generalref.on('value', getMessage);

        function getMessage(data){

            let messageList = document.querySelectorAll('.chatContent');
            for(let i = 0; i < messageList.length; i++){
                messageList[i].remove();
            }

            // TARGET DATA KEYS & VALUES
            let generalMessage = data.val();
            let keys = Object.keys(generalMessage);

            //UNCOMMENT THIS TO CONSOLE LOG THE WHOLE USER ARRAY console.log(keys);

            //LOOPS ALL OBJECTS TO RETRIEVE KEY VALUES.
            for(let i = 0; i < keys.length; i++){
                let m = keys[i];
                let author = generalMessage[m].username;
                let chatmessage = generalMessage[m].chattext;
                let timeStamped = generalMessage[m].timestamp;


                let existingID = document.getElementById('displayMessageGeneral');
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

                // Scrollbar
                document.getElementById("displayMessageGeneral").scrollTo(0, 5000);
            }
        }
    }
});