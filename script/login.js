//TARGET LOGIN BUTTON
document.getElementById('chatLogin').addEventListener('submit', acessChat);
// VARIABLES FOR LOGIN INPUTS
const useremail = document.getElementById('userEmail');
const password = document.getElementById('userPass');

//CALL THE DATABSE
let database = firebase.database();
//SET VARIABLE FOR WHICH ARRAY OBJECT CALLBACK FUNTION IS GOING TO LOOK IN
let ref = database.ref('users');

//FIREBASE FUNCTION TO CHECK FOR CHANGE IN USER/AUTH CHANGE, IF NOT LOGGED IN VALUE IS NULL
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user signed in
        document.getElementById('userWelcome').style.display = 'block';
        document.getElementById('loginNeeded').style.display = 'none';

        user = firebase.auth().currentUser;
        if(user !== null){
            document.getElementById('displayName').innerHTML = user.displayName;

            //TARGET COG ICON AND WHEN CLICKED HIDE USER NAV
            document.getElementById("userControls").addEventListener("mouseleave", hideUserNav);
            //TARGET COG ICON AND WHEN CLICKED SHOW USER NAV
            document.getElementById('userSettings').addEventListener('click', showUserNav);
            function showUserNav(e) {
                e.preventDefault();
                document.getElementById('userControls').style.display = 'block';
            }
            //FUNCTION TO HIDE USER NAV
            function hideUserNav(e) {
                e.preventDefault();
                document.getElementById('userControls').style.display = 'none';
            }

            //CALLBACK FUNTION TO GET DATA
            ref.on('value', getData, errorData);
            function getData(data){
                //console.log(data.val());

                // TARGET DATA KEYS & VALUES
                let users = data.val();
                let keys = Object.keys(users);
                //UNCOMMENT THIS TO CONSOLE LOG THE WHOLE USER ARRAY console.log(keys);

                //LOOPS ALL OBJECTS TO RETRIEVE KEY VALUES.
                for(let i = 0; i < keys.length; i++){
                    let u = keys[i];
                    let username = users[u].userName;
                    let userEmail = users[u].email;
                    let first = users[u].fName;
                    let last = users[u].lName;
                    console.log(username+' '+userEmail+' '+first+' '+last); //Will display ALL users

                    //CHECK TO FIND MATCH BETWEEN AUTH SERVER AND DATABASE USERS
                    /*if(userEmail === user.email){
                        document.getElementById('dbUserName').innerHTML += username;
                    }*/
                }
            }
            // SEND AN ERROR IF LOGIN FAILED
            function errorData(err){
                console.log('Error!');
                console.log(err)
            }
        } //END OF IF USER IS NOT NULL
    } else {
        // user not signed in
        document.getElementById('userWelcome').style.display = 'none';
        document.getElementById('loginNeeded').style.display = 'block';
    }
}); //firebase.auth().onAuthStateChanged ENDS

//FUNCTION TO LOGIN AND ACCESS CHAT
function acessChat(e) {
    e.preventDefault();

    const email = useremail.value;
    const pass = password.value;
    const auth = firebase.auth();

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert('Error : ' + errorMessage + '<br>' + errorCode);

        // ...
    });
} //LOGIN FUNCTION ENDS

//TARGET LOGOUT BUTTON
let btnLogout = document.getElementById('logout');

//EVENTLISTENER FOR LOGOUT BUTTON
btnLogout.addEventListener('click', function(e){
    e.preventDefault();
    firebase.auth().signOut();
});

//CHANGE DISPLAYNAME IN AUTH SERVER CODE
//TODO: Needs to be connected to input and button.
/*let user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: 'malinH'
    });*/

