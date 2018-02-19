document.getElementById('chatLogin').addEventListener('submit', acessChat);
let btnLogout = document.getElementById('logout');

const useremail = document.getElementById('userEmail');
const password = document.getElementById('userPass');
let database = firebase.database();
let ref = database.ref('users');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user signed in
        document.getElementById('userWelcome').style.display = 'block';
        document.getElementById('loginNeeded').style.display = 'none';

        user = firebase.auth().currentUser;

        if(user !== null){

            //let accountName = user.displayName;
            //let accountUid = user.uid;
            //let accountDisplay = user.providerData;
            console.log(user.displayName);
            ref.on('value', getData, errorData);
            function getData(data){
                console.log(data.val());
            }
            function errorData(err){
                console.log('Error!');
                console.log(err)
            }
            /*console.log(accountName);
            console.log(accountUid);
            console.log(accountDisplay);*/
            //document.getElementById('userName').innerHTML = ' '+accountName+' uid: '+accountUid+'<br>'+accountDisplay;

        }

    } else {
        // user not signed in
        document.getElementById('userWelcome').style.display = 'none';
        document.getElementById('loginNeeded').style.display = 'block';
    }
});

function acessChat(e) {
    e.preventDefault();

    const email = useremail.value;
    const pass = password.value;
    const auth = firebase.auth();

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}
btnLogout.addEventListener('click', function(e){
    e.preventDefault();
    /*let user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: 'malinH'
    });*/
    firebase.auth().signOut();
});

