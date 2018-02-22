// Connect to firebase register user
//let userRef = firebase.database().ref('users');

document.getElementById('newUser').addEventListener('submit', regForm);

function regForm(e) {
    e.preventDefault();
    let username = getInputValue('newUserName');
    let fullname = getInputValue('newUserFullName');
    let email = getInputValue('newUserEmail');
    let password = getInputValue('newUserPass');
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log("Error: ", e.message));
    firebase.auth().onAuthStateChanged(user => {
        console.log("user after on auth state changed", user.displayName);
        if(user) {
            // Save inputvalue
            saveInputs(username, fullname, email, password);
            if(user !== null) {
                user.updateProfile({
                    displayName: username
                });
                console.log("after update profile", user);
            }
            /*if(email === user.email){
                document.getElementById('dbUserName').innerHTML += username;
            }*/
            let location = "index.html";
            document.getElementById('alert').style.display = "block";
            document.getElementById('alert').innerHTML = "Logga in <a href="+location+">här</a>";
            //window.location="index.html";
        } else {
            console.log('not logged in');
        }
    });
    // Clear form
    document.getElementById('newUser').reset();
}

function getInputValue(id){
    return document.getElementById(id).value;
}

function saveInputs(username, fullname, email, password){
    firebase.database().ref('users/' + username).set({
        username: username,
        name: fullname,
        email: email,
        password: password,
        status: "Offline"
    });
}