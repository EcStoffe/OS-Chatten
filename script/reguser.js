// Connect to firebase register user
let userRef = firebase.database().ref('users');

document.getElementById('registerUser').addEventListener('submit', regForm);

//Get values from input

function regForm(e) {
    e.preventDefault();
    let username = getInputValue('usrName');
    let firstname = getInputValue('fName');
    let lastname = getInputValue('lName');
    let email = getInputValue('eMail');
    let password = getInputValue('pssWord');

// Save inputvalue
    saveInputs(username, firstname, lastname, email, password);
// Clear form
    document.getElementById('registerUser').reset();
    $('#newUser').modal('hide');
// Show alert
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },5000);
}

function saveInputs(username, firstname, lastname, email, password){
    let newUserRef = userRef.push();
    newUserRef.set({
        userName: username,
        fName: firstname,
        lName: lastname,
        email: email,
        password: password
    });

}