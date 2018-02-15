//Initialize firebase connection
initializeFirebase();

    //get elements
    let useremail = getInputValue('eMail');
    let password = getInputValue('pssWord');
    getInputValue('logForm').addEventListener('submit', logIn);

function logIn(e) {
    // Get email and pass
    e.preventDefault();
    let email = useremail.value;
    let pass = password.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            window.location="landing.html";
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}