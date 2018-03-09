//CREATE TIMESTAMP
setInterval(function(){theTimer();},1000);
//CALLBACK FUNCTION TO GET DATA

$("document").ready(function() {

});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#chatRoom-One').click(function(event){
            event.preventDefault();
            $('body').css('background-image', 'url(images/sunvacation.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomOne/");

            $("document").ready(function() {
                $('#mainChat').html(`<section id="chatRoomOne"></section>`+formContent());
                existingID = $('#chatRoomOne');
                chatDisplayMessage();
                $('form').submit(sendMessageChat);
            });


        });
        $('#chatRoom-Two').click(function(event){
            event.preventDefault();
            $('body').css('background-image', 'url(images/wintervacation.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomTwo/");

            $("document").ready(function() {
                $('#mainChat').html(`<section id="chatRoomTwo"></section>`+formContent());
                existingID = $('#chatRoomTwo');
                chatDisplayMessage();
                $('form').submit(sendMessageChat);
            });

        });
        $('#chatRoom-Three').click(function(event){
            event.preventDefault();
            $('body').css('background-image', 'url(images/weekend.jpg)');
            $('#welcome').css('display', 'none');
            firebaseref = firebase.database().ref("chatRoomThree/");

            $("document").ready(function() {
                $('#mainChat').html(`<section id="chatRoomThree"></section>`+formContent());
                existingID = $('#chatRoomThree');
                chatDisplayMessage();
                $('form').submit(sendMessageChat);
            });
        });
    }
});