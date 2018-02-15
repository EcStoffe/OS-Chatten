
// Funtions to get id from elements.
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