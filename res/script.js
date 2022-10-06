var timeblockContainer = $(".container");

for(var i = 9; i <= 17; i++) {
    var timeblock = $("<timeblock>");
    timeblock.addClass("timeblock row form-group");
    timeblock.attr("id", i);

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

    var textArea = $("<textarea>");
    textArea.addClass("form-control col-md-10 h-100 input-field");
    textArea.attr("id", "input-field" + i);
    timeblock.append(textArea);

    var saveButton = $("<button>");
    saveButton.addClass("col-md-1 rounded");
    saveButton.css("background-color", "#06AED4");
    saveButton.text("Save");
    saveButton.on("click", function() {
        localStorage.setItem($(this).parent().children(".input-field").attr("id"), $(this).parent().children(".input-field").val());
    });
    saveButton.on("mouseover", function() {
        $(this).css("background-color", "#0591AD");
    });
    saveButton.on("mouseout", function() {
        $(this).css("background-color", "#06AED4");
    });
    timeblock.append(saveButton);

    timeblockContainer.append(timeblock);
}