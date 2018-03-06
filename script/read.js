//CALLBACK FUNCTION TO GET DATA
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let messageref = firebase.database().ref('chatMessage/');
        let existingID = document.getElementById('displayMessage');
        messageref.on("value", function(data) {
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
                document.getElementById("displayMessage").scrollTo(0, 5000);
            });
    }
});