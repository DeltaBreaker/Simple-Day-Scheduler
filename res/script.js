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

    timeblockContainer.append(timeblock);
}