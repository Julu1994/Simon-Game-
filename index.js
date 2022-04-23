var buttonColores = ["red", "green", "blue", "white"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence()
        started = true;
    }

});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log(gamePattern);
        console.log(userClickedPattern);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
        sartOver();
        



    }
}



function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColores[randomNumber];
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);


}

function gameOver() {
    $(".mainDiv").addClass("gameOver");
    setTimeout(function () {
        $(".mainDiv").removeClass("gameOver")
    }, 200);
    var music = new Audio("sounds/wrong.mp3");
    music.play();
    $("h1").text("Game Over! Press Any Key to start again");
    sartOver();
}

function sartOver() {

    level = 0;
    started = false;
    gamePattern = [];

}