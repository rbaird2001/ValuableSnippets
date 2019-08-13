

var testArray= []
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyA-XMNTbJrj57PE1XUz9AnwmFDQThKpSvE",
    authDomain: "myveryveryfirstproject.firebaseapp.com",
    databaseURL: "https://myveryveryfirstproject.firebaseio.com",
    projectId: "myveryveryfirstproject",
    storageBucket: "myveryveryfirstproject.appspot.com",
    messagingSenderId: "480197169456",
    appId: "1:480197169456:web:3c9cf389c50f4af3"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

timesheet = database.ref("/timesheet");

$("#submit").click(function () {
    let empName = $("#employeeName").val()
    let role = $("#role").val()
    let stDate = $("#startDate").val()
    let monRate = $("#monthlyRate").val()

    let employeeKey = timesheet.push({
        employeeName: empName,
        role: role,
        startDate: stDate,
        monthlyRate: monRate,
    })
    return false
    //console.log(employeeKey);
})

timesheet.on("child_added", function(snapshot){
console.log(snapshot.val().employeeName);    
})