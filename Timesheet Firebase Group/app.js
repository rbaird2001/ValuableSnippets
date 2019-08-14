

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

//create a variable to represent the firebase database.
//It really isn't used much here, but it's a common practice to do this.
let database = firebase.database()

//create a variable to the database reference used in this app (which is timesheet)
let timesheet = database.ref("/timesheet")

//use JQuery to get form data into variables
$("#submit").click(function () {
    let empName = $("#employeeName").val()
    let role = $("#role").val()
    let stDate = $("#startDate").val()
    let monRate = $("#monthlyRate").val()
    let email = $("#email").val()

 //push the form data into the firebase database. Use the timesheet variable to reference the database ref
 //note that this is using JSON to create the record data.   
    timesheet.push({
        employeeName: empName,
        role: role,
        startDate: stDate,
        monthlyRate: monRate,
        emailAddr: email
    });
});

//clear out any data in the table body. Since we only have one table, tbody element is used instead of using #name or .class
$("tbody").empty();

/*We will build the table of records in html from firebase using JQuery 
to build rows and columns and firebase to retrieve data.
The firebase event, "child_added", operates in two ways. First, When loaded, it gets all 
the records and loads then one at a time and performs the call back funtion on each.
This means that creation of a for(i=0;i<stuff;i++) loop is not needed. 
Firebase does that work for you.

Second when you add a new record, it processes only the new record for you. 
In order for this to work, the event.preventDefault() method must be added.
Alternative to this is adding "return false;" at the end of the function.
*/
timesheet.on("child_added",function(snapshot){
    event.preventDefault();
    let emp = snapshot.val();
    let empRecord = $("<tr>");
    let email = $("<td>").text(emp.emailAddr);
    let name = $("<td>").text(emp.employeeName);
    let role = $("<td>").text(emp.role);
    let start = $("<td>").text(emp.startDate);
    let rate = $("<td>").text(emp.monthlyRate);

    empRecord.append(email)
             .append(name)
             .append(role)
             .append(start)
             .append(rate)

    $("tbody").append(empRecord);
// We need to clear the form inputs after we've added the data.
    $("#employeeName").val("");
    $("#role").val("");
    $("#startDate").val("");
    $("#monthlyRate").val("");
    $("#email").val("");

    console.log(snapshot.val());
})