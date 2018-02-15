
let config = {
    apiKey: "AIzaSyABUth1guGRkzmnthGwkExc9ElQ4r3xTSM",
    authDomain: "os-chatt.firebaseapp.com",
    databaseURL: "https://os-chatt.firebaseio.com",
    projectId: "os-chatt",
    storageBucket: "os-chatt.appspot.com",
    messagingSenderId: "885393355147"
};
firebase.initializeApp(config);
// Connect to firebase register user

//Get elements
    const username = document.getElementById('usrName');
    const firstname = document.getElementById('fName');
    const lastname = document.getElementById('lName');
    const useremail = document.getElementById('eMail');
    const password = document.getElementById('pssWord');
    const btnReg = document.getElementById('btnReg');

    btnReg.addEventListener('click', function(e){
        // Get email and pass
        // TODO: Check for real email
        e.preventDefault();
        const email = useremail.value;
        const pass = password.value;
        const fname = firstname.value;
        const lname = lastname.value;
        const user = username.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        saveInputs(user, fname, lname, email, pass);
        document.getElementById('registerUser').reset();
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('Logged in as: yaaay');
                //window.location="landing.html";
            } else {
                console.log('not logged in');
            }
        });
    });
const userRef = firebase.database().ref('users');
function saveInputs(user, firstname, lastname, email, pass){
    const newUserRef = userRef.push();
    newUserRef.set({
        userName: user,
        fName: firstname,
        lName: lastname,
        email: email,
        password: pass
    });

}