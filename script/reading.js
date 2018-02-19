let database = firebase.database();
let ref = database.ref('users');

ref.on('value', getData, errorData);
function getData(data){
    //console.log(data.val());
    let users = data.val();
    let keys = Object.keys(users);
    console.log(keys);

    for(let i = 0; i < keys.length; i++){
        let u = keys[i];
        let username = users[u].userName;
        let useremail = users[u].email;
        let first = users[u].fName;
        let last = users[u].lName;
        console.log(username+' '+useremail+' '+first+' '+last);
    }
}
function errorData(err){
    console.log('Error!');
    console.log(err)
}