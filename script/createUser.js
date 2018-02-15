/*let userRef = firebase.database().ref('users');
//Get elements
    const username = getInputValue('usrName');
    const firstname = getInputValue('fName');
    const lastname = getInputValue('lName');
    const useremail = getInputValue('eMail');
    const password = getInputValue('pssWord');
    let btnReg = document.getElementById('btnReg');

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

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                // Save inputvalue
                saveInputs(user, fname, lname, email, pass);
                window.location="landing.html";
            } else {
                console.log('not logged in');
            }
        });
    });*/

(function() {

//Initialize Firebase
    let config = {
        apiKey: "AIzaSyABUth1guGRkzmnthGwkExc9ElQ4r3xTSM",
        authDomain: "os-chatt.firebaseapp.com",
        databaseURL: "https://os-chatt.firebaseio.com",
        projectId: "os-chatt",
        storageBucket: "os-chatt.appspot.com",
        messagingSenderId: "885393355147"
    };

    let userRef = firebase.database().ref('users');
    //Get elements
    const username = getInputValue('usrName');
    const firstname = getInputValue('fName');
    const lastname = getInputValue('lName');
    const useremail = getInputValue('eMail');
    const password = getInputValue('pssWord');
    let btnReg = document.getElementById('btnReg');

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

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                // Save inputvalue
                saveInputs(user, fname, lname, email, pass);
                window.location="landing.html";
            } else {
                console.log('not logged in');
            }
        });
    });

    function getInputValue(id){
        return document.getElementById(id);
    }
    function saveInputs(user, fname, lname, email, pass){
        let newUserRef = userRef.push();
        newUserRef.set({
            userName: user,
            fName: fname,
            lName: lname,
            email: email,
            password: pass
        });

    }
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });

});