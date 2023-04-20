import {getFirebase, putToFirebase} from "./modules/firebaseFunctions.js";

let userName = "";
let playerPoints = 0;
const choiceArr = ["rock", "paper", "scissor"];
let dataHighScore;

document.querySelector('button').addEventListener("click", event => {
    event.preventDefault();
    userName = document.querySelector('input').value;
    document.querySelector('form').remove();
    getFirebase().then(data => addHighScores(data)).then(startGame)
})

function addHighScores(highscores){
    dataHighScore = highscores;
    dataHighScore.sort((a, b) => b.score - a.score);
    document.getElementById("highscoreTitle").innerText = "Highscores"
    document.getElementById('highscoreList').innerHTML = "";
    dataHighScore.forEach(element => {
        document.getElementById('highscoreList').innerHTML += `<li>${element.name}: ${element.score}</li>`
    });
    

}
function startGame(){
    
    document.getElementById("subHeader").innerText = "How many victories can you get in a row?";
    document.getElementById("names").innerText = `${userName}`;
    document.getElementById("points").innerText = `${playerPoints}`;
    for (const choice of choiceArr) {
        let btn = document.createElement("button");
        btn.setAttribute("id", choice)
        btn.innerText = choice.toUpperCase();
        document.getElementById("buttonContainer").appendChild(btn);
    }
    document.getElementById("buttonContainer").addEventListener("click", evalChoice)
}

function evalChoice(event){
    let computerChoice = Math.floor(Math.random() * 3);
    let imgUrlComputer;
    switch(computerChoice){
        case 0:
            imgUrlComputer = new URL('./img/rock_39413.png', import.meta.url);
            break;
        case 1:
            imgUrlComputer = new URL('./img/paper_38485.png', import.meta.url);
            break;
        case 2:
            imgUrlComputer = new URL('./img/scissors_39412.png', import.meta.url);
            break;
    }
    document.getElementById("computerImg").src = imgUrlComputer.href;
    if(event.target.id === choiceArr[computerChoice]){
        document.getElementById("playerImg").src = imgUrlComputer.href;
        tiedGame();
    }else if(event.target.id === "rock"){
        const imgUrl = new URL('./img/rock_39413.png', import.meta.url);
        document.getElementById("playerImg").src = imgUrl.href;
        if(computerChoice === 2) wonGame();
        if(computerChoice === 1) lostGame();
    }else if(event.target.id === "paper"){
        const imgUrl = new URL('./img/paper_38485.png', import.meta.url);
        document.getElementById("playerImg").src = imgUrl.href;
        if(computerChoice === 0) wonGame();
        if(computerChoice === 2) lostGame();
    }else if(event.target.id === "scissor"){
        const imgUrl = new URL('./img/scissors_39412.png', import.meta.url);
        document.getElementById("playerImg").src = imgUrl.href;
        if(computerChoice === 1) wonGame();
        if(computerChoice === 0) lostGame();
    }
}

function tiedGame(){
    document.getElementById("playerImg").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("computerImg").style.backgroundColor = "rgba(0,0,0,0)";
}

function wonGame(){
    playerPoints++;
    document.getElementById("points").innerText = `${playerPoints}`;
    document.getElementById("playerImg").style.backgroundColor = "#5cff95";
    document.getElementById("computerImg").style.backgroundColor = "#ff5c5c";
}

function lostGame(){
    document.getElementById("points").innerText = `${playerPoints}`;
    document.getElementById("computerImg").style.backgroundColor = "#5cff95";
    document.getElementById("playerImg").style.backgroundColor = "#ff5c5c";
    gameDone();
}

function gameDone(){
    document.getElementById("gameDone").innerText = `You got ${playerPoints} points`;
    checkIfHighscore();

}

function checkIfHighscore(){
    if(playerPoints>dataHighScore[4].score){
        dataHighScore[4].name = userName;
        dataHighScore[4].score = playerPoints;
        playerPoints = 0;
        document.getElementById("points").innerText = `${playerPoints}`;
        putToFirebase(dataHighScore);
        addHighScores(dataHighScore);
    }
    
}