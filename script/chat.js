// VARIABLES FOR LOGIN INPUTS
/*const userEmail = document.getElementById('userEmail');
const password = document.getElementById('userPass');*/

//CALL THE DATABSE
let database = firebase.database();
//SET VARIABLE FOR WHICH ARRAY OBJECT CALLBACK FUNTION IS GOING TO LOOK IN
let ref = database.ref('users');

//FIREBASE FUNCTION TO CHECK FOR CHANGE IN USER/AUTH CHANGE, IF NOT LOGGED IN VALUE IS NULL
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user = firebase.auth().currentUser;
        console.log("current user", user);
        if(user !== null){
            //ID TARGET TO DISPLAY USERNAME IN TOP RIGHT CORNER
            document.getElementById('displayName').innerHTML = user.displayName;
            //TARGET COG ICON AND WHEN CLICKED HIDE USER NAV
            document.getElementById("userControls").addEventListener("mouseleave", hideUserNav);
            //TARGET COG ICON AND WHEN CLICKED SHOW USER NAV
            document.getElementById('userSettings').addEventListener('click', showUserNav);
            //EVENTLISTENER FOR LOGOUT BUTTON
            function logOut(e) {
                e.preventDefault();
                firebase.auth().signOut();
            }
            //TARGET LOGOUT BUTTON
            document.getElementById('logout').addEventListener("click", logOut);

            //CALLBACK FUNTION TO GET DATA
            //ref.on('value', getData, errorData);
/*
            function getData(data){
                //console.log(data.val());

                // TARGET DATA KEYS & VALUES
                let users = data.val();
                let keys = Object.keys(users);
                //UNCOMMENT THIS TO CONSOLE LOG THE WHOLE USER ARRAY console.log(keys);

                //LOOPS ALL OBJECTS TO RETRIEVE KEY VALUES.
                let username="";
                let useremail="";
                let fullname="";
                for(let i = 0; i < keys.length; i++){
                    let u = keys[i];
                    username = users[u].username;
                    useremail = users[u].email;
                    fullname = users[u].name;
                    //console.log(username+' '+userEmail+' '+first+' '+last); //Will display ALL users

                }
                //CHECK TO FIND MATCH BETWEEN AUTH SERVER AND DATABASE USERS
                /!*if(useremail === user.email){
                    document.getElementById('dbUserName').innerHTML += username;
                }*!/
            }
*/
        } //END OF IF USER IS NOT NULL
    } else {
        // IF NO USER IS FOUND GO TO INDEX FOR LOGIN
        location.href = "index.html";
    }
}); //firebase.auth().onAuthStateChanged ENDS

//CHANGE DISPLAYNAME IN AUTH SERVER CODE
//TODO: Needs to be connected to input and button.
/*let user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: 'malinH'
    });*/

