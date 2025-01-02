var userPattern = [];
var gamePattern = [];
var colors = ["red", "green", "blue", "yellow"]
var level = 0;
var game = false;
var check = 0;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var indexColor = Math.floor(Math.random() * 4);
    var pickedColor = colors[indexColor];
    console.log(pickedColor);
    gamePattern.push(pickedColor);
    $("#" + pickedColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(pickedColor);
}



$(document).keydown(function (event) {
    userPattern = [];
    gamePattern = [];
    colors = ["red", "green", "blue", "yellow"]
    level = 0;
    game = false;
    check = 0;
    if (!game) {
        console.log(event.key);
        nextSequence();
        game = true;
    }
})



$(".item").click(function () {

    if (game) {
        playerMove(this);
        setTimeout(function () {
            checkAnswer(check);
        }, 1000)
    }
});


function playerMove(event) {
    var color = $(event).attr("id");
    console.log(color);
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
    userPattern.push(color);
}


function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        $("h1").html("GAME OVER <br> press any key to play again")
    }, 100);

}

function checkAnswer() {
    if (userPattern[check] === gamePattern[check]) {
        console.log("-----------------check pattern-----------------")
        console.log("userPattern[check]:    ", userPattern[check])
        console.log("gamePattern[check]    ", gamePattern[check])
        console.log("level ", level, "check ", check)

        if (check + 1 === gamePattern.length) {
            console.log("-----------------next pattern-----------------")
            console.log("userPattern:    ", userPattern.length)
            console.log("gamePattern   ", gamePattern.length)
            console.log("level ", level, "check ", check)
            console.log(check);
            
            userPattern = []; 
            check = 0; 
            nextSequence();
        } else {
            check++; 
        }
    } else {
        console.log("-----------------wrong-----------------")
        console.log("userPattern[check]:    ", userPattern[check])
        console.log("gamePattern[check]    ", gamePattern[check])
        console.log("level ", level, "check ", check)
        console.log("wrong")
        game = false; 
        playSound("wrong");
        gameOver();
    }
}

function playSound(color){
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
    console.log(sound);
}