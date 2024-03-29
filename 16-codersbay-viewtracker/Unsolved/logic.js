/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var firebaseConfig = {
  apiKey: "AIzaSyA-XMNTbJrj57PE1XUz9AnwmFDQThKpSvE",
  authDomain: "myveryveryfirstproject.firebaseapp.com",
  databaseURL: "https://myveryveryfirstproject.firebaseio.com",
  projectId: "myveryveryfirstproject",
  storageBucket: "myveryveryfirstproject.appspot.com",
  messagingSenderId: "480197169456",
  appId: "1:480197169456:web:3c9cf389c50f4af3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking


// --------------------------------------------------------------
// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// Add ourselves to presence list when online.
var onBidders = database.ref("/onBidders");

// Number of online users is the number of objects in the presence list.
var connectedRef = database.ref(".info/connected");

connectedRef.on("value",function(snap){
  if (snap.val()) {
    var bidConnect = onBidders.push(true)
    bidConnect.onDisconnect().remove();
  }

  onBidders.on("value",function(snapshot){
    console.log(snapshot.numChildren());
    $("#connected-viewers").text(snapshot.numChildren());
  })
})

// ----------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref("/onBidder").on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the local variables for highBidder equal to the stored values in firebase.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // change the HTML to reflect the newly updated local values (most recent information from firebase)
    $("#highest-bidder").text(snapshot.val().highBidder);
    $("#highest-price").text("$" + snapshot.val().highPrice);

    // Print the local data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the local value in firebase
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text("$" + highPrice);

    // Print the local data to the console.
    console.log("local High Price");
    console.log(highBidder);
    console.log(highPrice);
  }

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  event.preventDefault();

  // Get the input values
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());

  // Log to console the Bidder and Price (Even if not the highest)


  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref("/bidderData").set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

    // Log the new High Price
    console.log("New High Price!");
    console.log(bidderName);
    console.log(bidderPrice);

    // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(bidderName);
    $("#highest-price").text("$" + bidderPrice);

  }
  else {

    // Alert
    alert("Sorry that bid is too low. Try again.");
  }
});
