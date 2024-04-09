let gameSeq = [];
let userSeq = [];

let start = false;
let level = 0;

let highscore = 0;

let btns = ["red", "green", "yellow", "purple"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(start == false){
        console.log("game started");
        start = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250);
}

function levelUp() {
    level++;
    h2.innerText = `level ${level}`;
    userSeq = [];
    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log("gameseq = ",gameSeq);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function gameoverFlash(){
    let body = document.querySelector("body");
    body.classList.add("danger-red");
    setTimeout(function(){
        body.classList.remove("danger-red");
    },150);
}


function checkAns (idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highscore) {
            highscore = level;
        }
        gameoverFlash();
        h2.innerHTML = `Game over! Your Score was <b>${level}</b>. <br>Press any key to start.`;
        document.querySelector("h3").innerHTML = `Highest Score is : <b>${highscore}<b>`
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}
