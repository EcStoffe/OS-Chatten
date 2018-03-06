/*$(function () {
    $('.chatRoomButtons').click(function ()  {
        $(".chatRoomDisplay").css('display', 'hidden');
        $('#displayMessage'+$(this).attr('target')).css('display', 'block');
        $(this).toggleClass('boldar');
    });
});*/

$('#chatOne').click(function () {
   $('#displayMessageGeneral').css('display', 'block');
    $('#displayMessageRoomOne').css('display', 'none');
    $('#displayMessageRoomTwo').css('display', 'none');
});

$('#chatTwo').click(function () {
    $('#displayMessageGeneral').css('display', 'none');
    $('#displayMessageRoomOne').css('display', 'block');
    $('#displayMessageRoomTwo').css('display', 'none');
});
$('#chatThree').click(function () {
    $('#displayMessageGeneral').css('display', 'none');
    $('#displayMessageRoomOne').css('display', 'none');
    $('#displayMessageRoomTwo').css('display', 'block');
});