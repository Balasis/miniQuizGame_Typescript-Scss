"use strict";
function randomizer(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
class Player {
    constructor(name, moneyEarned) {
        this.name = name;
        this.moneyEarned = moneyEarned;
    }
    setName(name) {
        this.name = name;
    }
    setMoneyEarned(moneyEarnedNum) {
        this.moneyEarned = moneyEarnedNum;
    }
    getName() {
        return this.name;
    }
    getMoneyEarned() {
        return this.moneyEarned;
    }
    toString() {
        return `Player name: ${this.name.toString()} holds so far ${this.moneyEarned}`;
    }
}
class Question {
    constructor(question, options, correctAnswer, difficulty) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty;
    }
    getTheQuestion() {
        return this.question;
    }
    getTheCorrectAnswer() {
        return this.correctAnswer;
    }
    getOption(index) {
        return this.options[index];
    }
}
class Stage {
    constructor(stageNumber, stageMoney, assistUsed, question) {
        this.stageNumber = stageNumber;
        this.stageMoney = stageMoney;
        this.assistUsed = assistUsed;
        this.question = question;
    }
    getStageNumber() {
        return this.stageNumber;
    }
    getStageMoney() {
        return this.stageMoney;
    }
    getQuestion() {
        return this.question;
    }
    getAssistedUsed() {
        return this.assistUsed;
    }
    setAssistedUsed(assistedYorN) {
        this.assistUsed = assistedYorN;
    }
}
class TheQuiz {
    constructor(thePlayer, timeSinceQuizStarted, stageCounter) {
        this.stageCounter = 0;
        this.stagesBoard = {};
        this.moneyBoard = {};
        this.thePlayer = thePlayer;
        this.timeSinceQuizStarted = timeSinceQuizStarted;
        this.stageCounter = stageCounter;
    }
    settimeSinceQuizStarted(timeSinceQuizStarted) {
        this.timeSinceQuizStarted = timeSinceQuizStarted;
    }
    increaseStageCounter() {
        this.stageCounter = this.stageCounter + 1;
    }
    resetStageCounter() {
        this.stageCounter = 0;
    }
    addStageToStagesBoard(stageNumber, stage) {
        this.stagesBoard[stageNumber] = stage;
    }
    addToMoneyBoard(boardNum, money) {
        this.moneyBoard[boardNum] = money;
    }
    getMoneyBoard() {
        return this.moneyBoard;
    }
    getStagesBoard() {
        return this.stagesBoard;
    }
    gettimeSinceQuizStarted() {
        return this.timeSinceQuizStarted;
    }
    getStageCounter() {
        return this.stageCounter;
    }
    toString() {
        return `timeSinceQuizStarted: ${this.timeSinceQuizStarted.toString()} with
     stage ${this.stageCounter}
     and the player being ${this.thePlayer.getName()}
     `;
    }
}
let thePlayer = new Player("John", 0);
let theQuiz = new TheQuiz(thePlayer, 0, 1);
let indexesOfEasyQuestionsUsed = [];
let indexesOfMediumQuestionsUsed = [];
let indexesOfHardQuestionsUsed = [];
function loadInTheQuiz(path, startingIndexStage, endingIndexStage, indexesCheckArray) {
    fetch(path)
        .then(response => { return response.json(); })
        .then(questionsFetch => {
        fetch("./build/moneyBoard.json").then(responsee => { return responsee.json(); }).then(moneyBoardFetch => {
            for (let i = startingIndexStage; i <= endingIndexStage; i++) {
                let theRandom;
                do {
                    theRandom = randomizer(1, questionsFetch.length);
                } while (indexesCheckArray.indexOf(theRandom) !== -1);
                indexesCheckArray.push(theRandom);
                let aQuestion = new Question(questionsFetch[theRandom].question, questionsFetch[theRandom].options, questionsFetch[theRandom].correctAnswer, 1);
                let aStage = new Stage(i, moneyBoardFetch[i], false, aQuestion);
                theQuiz.addStageToStagesBoard(i, aStage);
            }
        });
    });
}
//Menu functions
loadInTheQuiz("./build/easyQuestions.json", 1, 5, indexesOfEasyQuestionsUsed);
loadInTheQuiz("./build/mediumQuestions.json", 6, 10, indexesOfMediumQuestionsUsed);
loadInTheQuiz("./build/hardQuestions.json", 11, 15, indexesOfHardQuestionsUsed);
//declarations of Menu
const startingMenu = document.getElementById("startingMenu");
const newGame = document.getElementById("newGame");
const preferences = document.getElementById("preferences"); //omited the "!" to check"?"
const aboutUs = document.getElementById("aboutUs");
//declarations of Quiz
const theQuizUI = document.getElementById("theQuizUI");
const scorePanel = document.getElementById("scorePanel");
const theQuestion = document.getElementById("theQuestion");
const theOptions = document.getElementById("theOptions");
const theOpA = document.getElementById("theOptions__A&B__A");
const theOpB = document.getElementById("theOptions__A&B__B");
const theOpC = document.getElementById("theOptions__C&D__C");
const theOpD = document.getElementById("theOptions__C&D__D");
//you need to declare this as HTMLCollection so you might set a style...
//sigh this typescript started to get on my nerves
//This is a specific usage pattern provided by TypeScript's DOM library, 
//where you're using a predefined interface (HTMLCollectionOf<T>) with
// a specific type (HTMLElement) to describe the nature of the collection.
//While it may look similar to generic type syntax, it's actually a specialized 
//syntax provided by TypeScript for working with DOM collections.
const allOp = document.getElementsByClassName("qOption");
//by placing ! in the end you ensure the typescript that it will find it for sure
newGame.addEventListener('click', function () {
    initializeQuizUi();
});
function initializeQuizUi() {
    /*well if you try to have different types typescript wont make it easy for you
    const stage =theQuiz.getStagesBoard()[1].getQuestion().getTheQuestion();
    if (stage!=null){
    you can also do it like that: without using methods...*/
    console.log(theQuiz.getStagesBoard()[1]["question"]["question"]);
    theQuestion.textContent = theQuiz.getStagesBoard()[1].getQuestion().getTheQuestion();
    //trying with json type...array instead of methods
    theOpA.textContent = theQuiz.getStagesBoard()[1]["question"]["options"][0];
    theOpB.textContent = theQuiz.getStagesBoard()[1]["question"]["options"][1];
    theOpC.textContent = theQuiz.getStagesBoard()[1]["question"]["options"][2];
    theOpD.textContent = theQuiz.getStagesBoard()[1]["question"]["options"][3];
    // }
    // .getQuestion().getTheQuestion()!.toString()
}
function updateQuestion() {
    console.log("got in");
    let sc = theQuiz.getStageCounter();
    theQuestion.textContent = theQuiz.getStagesBoard()[sc].getQuestion().getTheQuestion();
    theOpA.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][0];
    theOpB.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][1];
    theOpC.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][2];
    theOpD.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][3];
}
let isOnload = false;
for (let e = 0; e < allOp.length; e++) {
    allOp[e].addEventListener('click', function () {
        if (isOnload) {
            console.log("we are on load..plz try later");
            return;
        }
        if (allOp[e].textContent == theQuiz.getStagesBoard()[theQuiz.getStageCounter()].getQuestion().getTheCorrectAnswer()) {
            isOnload = true;
            allOp[e].style.color = "orange";
            setTimeout(function () {
                allOp[e].style.color = "green";
                setTimeout(function () {
                    theQuiz.increaseStageCounter();
                    updateQuestion();
                    allOp[e].style.color = "initial";
                    isOnload = false;
                }, 2000);
            }, 3000);
        }
        else {
        }
    });
}
//use of Optional Chaining (?.) so if its null or undefined it will stop there
preferences === null || preferences === void 0 ? void 0 : preferences.addEventListener('click', function () {
});
