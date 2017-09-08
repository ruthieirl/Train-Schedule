// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtY2KQJkwa-Fm8VAKWfzldSvkHFVIlh1c",
    authDomain: "train-schedule-33ce3.firebaseapp.com",
    databaseURL: "https://train-schedule-33ce3.firebaseio.com",
    projectId: "train-schedule-33ce3",
    storageBucket: "",
    messagingSenderId: "31414872734"
  };
  
  firebase.initializeApp(config);

//Set Global Variables
  var database = firebase.database();
  var name = "";
  var dest = "";
  var time = "";
  var freq = "";

//Grab train info     
  $("#add-train").on("click", function(event) {
      event.preventDefault();
      name = $("#name-input").val().trim();
      dest = $("#dest-input").val().trim();
      time = $("#time-input").val().trim();
      freq = $("#freq-input").val().trim();
  	
    //Checking to make sure I grabbed the correct info
    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);
    
    //Pushing that info into the correct place
    database.ref().push({
        name: name,
        destination: dest,
        frequency: freq,
        time: time,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //Grabbing info from inputs
     $("#name-input").val("");
     $("#dest-input").val("");
     $("#time-input").val("");
     $("#freq-input").val("");
  });

  // Firebase watcher + initial loader 
  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().dest);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().freq);

      // Full list of items to the table
      $("#train-info").append("<tr class='well'><td id='name'> " + childSnapshot.val().name +
      	" </td><td id='dest'> " + childSnapshot.val().dest +
        " </td><td id='time'> " + childSnapshot.val().time +
        " </td><td id='freq'> " + childSnapshot.val().freq + 
        " </td><td id='left'> " + childSnapshot.val().left +
        " </td></tr>");

      console.log(moment)
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });