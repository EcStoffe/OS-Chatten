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
    promise.catch(e => alert("Error: "+e.message));
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            // Save inputvalue
            saveInputs(username, fullname, email, password);
            if(user !== null) {
                user.updateProfile({
                    displayName: username
                }).then(function() {
                    window.location="chat.html";
                }).catch(function() {
                    console.log("Something went wrong")
                });
            }
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
        status: "Online"
    });
}