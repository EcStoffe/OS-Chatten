// let loggedUser = document.getElementById('userName').innerHTML;
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);

    } else {
        console.log('not logged in');
    }
});