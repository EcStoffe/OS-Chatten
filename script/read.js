//CREATE TIMESTAMP
setInterval(function(){theTimer();},1000);
//CALLBACK FUNCTION TO GET DATA
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#chatRoom-One').click(function(event){
            event.preventDefault();
            $('body').css('background-image', 'url(images/sunvacation.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomOne/");
            $('#mainChat').html(`<section id="chatRoomOne"></section>`+formContent());
            existingID = document.getElementById('chatRoomOne');
            chatDisplayMessage();
            document.querySelector('form').addEventListener('submit', sendMessageChat);
        });
        $('#chatRoom-Two').click(function(event){
            event.preventDefault();
            $('body').css('background-image', 'url(images/wintervacation.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomTwo/");
            $('#mainChat').html(`<section id="chatRoomTwo"></section>`+formContent());
            existingID = document.getElementById('chatRoomTwo');
            chatDisplayMessage();
            document.querySelector('form').addEventListener('submit', sendMessageChat);
        });
        $('#chatRoom-Three').click(function(event){
            event.preventDefault();
            $('body').css('background-image', 'url(images/weekend.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomThree/");
            $('#mainChat').html(`<section id="chatRoomThree"></section>`+formContent());
            existingID = document.getElementById('chatRoomThree');
            chatDisplayMessage();
            document.querySelector('form').addEventListener('submit', sendMessageChat);
        });
    }
});