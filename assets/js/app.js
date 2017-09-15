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
  var currentTime = moment();
  var database = firebase.database();
  var name = "";
  var dest = "";
  var time = "";
  var freq = "";

  $("#currentTime").append(currentTime);
//Grab input information     
  $("#add-train").on("click", function(event) {
      event.preventDefault();
      name = $("#name-input").val().trim();
      dest = $("#dest-input").val().trim();
      time = $("#time-input").val().trim();
      freq = $("#freq-input").val().trim();
  	
  	  freq = parseInt(freq, 10);
    //Checking to make sure I grabbed the correct info
    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);
    
    //Set the data in the database
    database.ref().push({
        name: name,
        dest: dest,
        freq: freq,
        time: time,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //Clearing the inputs
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

    console.log(moment());

    var test = moment();
    test.set({'hour': parseInt(time.slice(0,2)), 'minute': parseInt(time.slice(3,2))});
    console.log(test);
    console.log(time.slice(0,2));
    console.log(time.slice(3,2));
    console.log(time);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("NEXT ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   	var nextTrainConvert = moment(nextTrain).format("hh:mm a");
   	console.log(nextTrainConvert);

    //var nameInf = $("<td id='name'>" + childSnapshot.val().name + "</td>");
    //console.log(nameInf);

    //var destInf = $("<td id='dest'>" + childSnapshot.val().dest + "</td>");
    //console.log(destInf);

    //var freqInf = $("<td id='freq'>" + childSnapshot.val().freq + "</td>");
    //console.log(freqInf);

    //var nextTrainInf = $("<td id='nextTrain'>" + nextTrainConvert + "</td>");
    //console.log(nextTrainInf);

    //var timeLeftInf = $("<td id='left'>" + tMinutesTillTrain + "</td>");
    //console.log(timeLeftInf);

    //var trainInf = $("<tr></tr>");

    var nameInf = $("<tr><td id='name'>" + childSnapshot.val().name + 
    				"</td><td id='dest'>" + childSnapshot.val().dest + 
    				"</td><td id='freq'>" + childSnapshot.val().freq + 
    				"</td><td id='nextTrain'>" + nextTrainConvert + 
    				"</td><td id='left'>" + tMinutesTillTrain + "</td></tr>");
    console.log(nameInf);

    var trainInf = $("tbody");

    trainInf.append(nameInf);
    //trainInf.append(destInf);
    //trainInf.append(freqInf);
    //trainInf.append(nextTrainInf);
    //trainInf.append(timeLeftInf);

      // Full list of items to the table
      $("#train-info").append(trainInf);

    // Handle the errors
    }, function(errorObject) {
      
      console.log("Errors handled: " + errorObject.code);
    
    });

