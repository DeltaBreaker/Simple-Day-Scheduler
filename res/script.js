/* ------------------------------ Setup ------------------------------ */
var timeblockContainer = $(".container");

// This loops from 9 to 17 (inclusive) and creates the time block elements for the web page
for(var i = 9; i <= 17; i++) {

    // Create each time block container
    var timeblock = $("<timeblock>");
    timeblock.addClass("timeblock row form-group");
    timeblock.attr("id", i);

    // Create the sub container that holds the time, text
    // Depending on the time, AM or PM is added and is also converted to 12hr time
    var time = $("<time>");
    var timeText = "";
    if(i < 12) {
        timeText = i + "AM";
    } else if(i == 12) {
        timeText = i + "PM"
    } else {
        timeText = i % 12 + "PM"
    }
    time.text(timeText);
    time.addClass("col-md-1 align-self-center");
    timeblock.append(time);

    // Create and apply each text area
    var textArea = $("<textarea>");
    textArea.addClass("form-control col-md-10 h-100 input-field");
    textArea.attr("id", "input-field" + i);
    timeblock.append(textArea);

    // Create save buttons that change color on mouseover
    var saveButton = $("<button>");
    saveButton.addClass("col-md-1 rounded");
    saveButton.css("background-color", "#06AED4");
    saveButton.text("Save");
    saveButton.on("click", function() {
        // This gets the buttons parent then the input field child of that parent and stores its contents in local storage with the time ID as the key
        localStorage.setItem($(this).parent().children(".input-field").attr("id"), $(this).parent().children(".input-field").val());
    });
    saveButton.on("mouseover", function() {
        $(this).css("background-color", "#0591AD");
    });
    saveButton.on("mouseout", function() {
        $(this).css("background-color", "#06AED4");
    });
    timeblock.append(saveButton);

    // Appy each time block to the main page container
    timeblockContainer.append(timeblock);
}

// This loads each time block text from local storage and applies that to the respective time block text field
for(var i = 9; i <= 17; i++) {
    var dataIn = localStorage.getItem("input-field" + i);
    if(dataIn !== null) {
        $("#input-field" + i).text(dataIn);
    }
}

setupTimeInfo();
/* ------------------------------------------------------------------- */

/* ------------------------------ Functions ------------------------------ */
// This removes each time class from the given time container so that a new one can be applied
function removeTimeClasses(container) {
    container.removeClass("past");
    container.removeClass("present");
    container.removeClass("future");
}

// Applies a certain class to each time block based on its time ID relative to the current time
// Also updates the main timer at the top to display the current time
function setupTimeInfo() {
    $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

    for(var i = 9; i <= 17; i++) {
        var timeblock = $("#" + i);
        removeTimeClasses(timeblock);

        var currentTime = moment().hour();

        if(i > currentTime) {
            timeblock.addClass("future");
        } else if(i < currentTime) {
            timeblock.addClass("past");
        } else {
            timeblock.addClass("present");
        }
    }
}

// Calls the function above every 1000ms
var colorShift = setInterval(function() {
   setupTimeInfo();
}, 1000);
/* ----------------------------------------------------------------------- */