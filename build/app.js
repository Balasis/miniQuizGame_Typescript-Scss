"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const theQuizUI = document.getElementById("theQuizUI");
const domScorePanelElement = {
    scorePanel: document.getElementById("scorePanel"),
    emptyScorePanelElement() {
        while (this.scorePanel.firstChild) {
            this.scorePanel.removeChild(this.scorePanel.firstChild);
        }
    },
    populateScorePanelElement() {
        for (const s in theQuiz.getStagesBoard()) {
            const stageIndexDiv = document.createElement("div");
            stageIndexDiv.id = `n_${s}`;
            stageIndexDiv.textContent = s;
            const stageAnsweredTickDiv = document.createElement("div");
            stageAnsweredTickDiv.id = `c_${s}`;
            stageAnsweredTickDiv.className = "stageAnsweredTick";
            stageAnsweredTickDiv.textContent = "";
            const stageMoneyDiv = document.createElement("div");
            stageMoneyDiv.id = `m_${s}`;
            stageMoneyDiv.textContent = theQuiz.getStagesBoard()[s]["stageMoney"].toString();
            const stageDiv = document.createElement("div");
            stageDiv.id = `s_${s}`;
            stageDiv.appendChild(stageIndexDiv);
            stageDiv.appendChild(stageAnsweredTickDiv);
            stageDiv.appendChild(stageMoneyDiv);
            //add orange background to the first one
            if (s == "1") {
                stageDiv.style.backgroundColor = "orange";
            }
            this.scorePanel.insertBefore(stageDiv, this.scorePanel.firstChild);
        }
    }
};
const domQuestionElements = {
    theQuestion: document.getElementById("theQuestion"),
    theOpA: document.getElementById("theOptions__A&B__A"),
    theOpB: document.getElementById("theOptions__A&B__B"),
    theOpC: document.getElementById("theOptions__C&D__C"),
    theOpD: document.getElementById("theOptions__C&D__D"),
    allOp: document.getElementsByClassName("qOption"),
    populateQuestionDomElements(index) {
        this.theQuestion.textContent = theQuiz.getStagesBoard()[index].getQuestion().getTheQuestion();
        //trying with json type...array instead of methods
        this.theOpA.textContent = theQuiz.getStagesBoard()[index]["question"]["options"][0];
        this.theOpB.textContent = theQuiz.getStagesBoard()[index]["question"]["options"][1];
        this.theOpC.textContent = theQuiz.getStagesBoard()[index]["question"]["options"][2];
        this.theOpD.textContent = theQuiz.getStagesBoard()[index]["question"]["options"][3];
    }
};
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
const assistFiftyFifty = {
    description: "Hides 2 out of 4 incorrect options",
    modifyTheQuiz() {
        console.log(theQuizUI);
    }
};
class TheQuiz {
    constructor(thePlayer, timeSinceQuizStarted, stageCounter) {
        this.stageCounter = 0;
        this.stagesBoard = {};
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
function loadInTheQuiz(path, startingIndexStage, endingIndexStage, dif) {
    let indexesOfQuestionsUsed = [];
    return fetch(path)
        .then(response => { return response.json(); })
        .then(questionsFetch => {
        return fetch("./build/moneyBoard.json")
            .then(responsee => { return responsee.json(); })
            .then(moneyBoardFetch => {
            for (let i = startingIndexStage; i <= endingIndexStage; i++) {
                let theRandom;
                do {
                    theRandom = randomizer(1, questionsFetch.length);
                } while (indexesOfQuestionsUsed.indexOf(theRandom) !== -1);
                indexesOfQuestionsUsed.push(theRandom);
                let aQuestion = new Question(questionsFetch[theRandom].question, questionsFetch[theRandom].options, questionsFetch[theRandom].correctAnswer, 1);
                let aStage = new Stage(i, moneyBoardFetch[i], false, aQuestion);
                theQuiz.addStageToStagesBoard(i, aStage);
            }
            console.log("loadInTheQuiz");
        });
    });
}
function initializeQuizUi() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadInTheQuiz("./build/easyQuestions.json", 1, 5, 1);
        yield loadInTheQuiz("./build/mediumQuestions.json", 6, 10, 2);
        yield loadInTheQuiz("./build/hardQuestions.json", 11, 15, 3);
        //in Case of reset 
        domScorePanelElement.emptyScorePanelElement();
        domScorePanelElement.populateScorePanelElement();
        // for (const s in theQuiz.getStagesBoard()) {  
        //     const stageIndexDiv:HTMLElement = document.createElement("div");
        //     stageIndexDiv.id=`n_${s}`;
        //     stageIndexDiv.textContent=s;
        //     const stageAnsweredTickDiv:HTMLElement = document.createElement("div");
        //     stageAnsweredTickDiv.id=`c_${s}`;
        //     stageAnsweredTickDiv.className="stageAnsweredTick";
        //     stageAnsweredTickDiv.textContent="";
        //     const stageMoneyDiv:HTMLElement = document.createElement("div");
        //     stageMoneyDiv.id=`m_${s}`;
        //     stageMoneyDiv.textContent=theQuiz.getStagesBoard()[s]["stageMoney"].toString();
        //     const stageDiv:HTMLElement = document.createElement("div");
        //     stageDiv.id=`s_${s}`;
        //     stageDiv.appendChild(stageIndexDiv);
        //     stageDiv.appendChild(stageAnsweredTickDiv);
        //     stageDiv.appendChild(stageMoneyDiv);
        //     //add orange background to the first one
        //     if (s=="1"){
        //     stageDiv.style.backgroundColor="orange";
        //     }
        //     scorePanel.insertBefore(stageDiv,scorePanel.firstChild);
        // } 
        domQuestionElements.populateQuestionDomElements(1);
    });
}
function updateStage() {
    //stageCounter has been increased before calling of this function
    //therefore we just reset/set properties to previous stage and to current one
    //fetch the current(justIncreased) stageCounter to use it as index
    let sc = theQuiz.getStageCounter();
    //declaration of previous stage
    let indexOfPreviousStageBorderDiv = `s_${sc - 1}`;
    let prevStageDom = document.getElementById(indexOfPreviousStageBorderDiv);
    //declaration of current(just Increased) stage
    let indexOfNextStageBorderDiv = `s_${sc}`;
    let curStageDom = document.getElementById(indexOfNextStageBorderDiv);
    //set/reset properties in the previous stage
    prevStageDom.style.backgroundColor = "initial";
    prevStageDom.querySelector(".stageAnsweredTick").textContent = "*";
    //set/reset properties in the current stage
    curStageDom.style.backgroundColor = "orange";
    domQuestionElements.populateQuestionDomElements(sc);
}
function wonTheGame() {
    console.log("You won the game"); //placeholder;
}
function resetTheGame() {
    return __awaiter(this, void 0, void 0, function* () {
        thePlayer = new Player("John", 0);
        theQuiz = new TheQuiz(thePlayer, 0, 1);
        yield initializeQuizUi();
    });
}
function randomizer(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
let thePlayer = new Player("John", 0);
let theQuiz = new TheQuiz(thePlayer, 0, 1);
let isOnload = false;
for (let e = 0; e < domQuestionElements.allOp.length; e++) {
    domQuestionElements.allOp[e].addEventListener('click', function () {
        if (isOnload) {
            console.log("we are on load..plz try later");
            return;
        }
        isOnload = true;
        domQuestionElements.allOp[e].style.color = "orange";
        if (domQuestionElements.allOp[e].textContent == theQuiz.getStagesBoard()[theQuiz.getStageCounter()].getQuestion().getTheCorrectAnswer()) {
            setTimeout(function () {
                domQuestionElements.allOp[e].style.color = "green";
                setTimeout(function () {
                    if (theQuiz.getStageCounter() + 1 >= 16) {
                        wonTheGame();
                        return;
                    }
                    theQuiz.increaseStageCounter();
                    updateStage();
                    domQuestionElements.allOp[e].style.color = "initial";
                    isOnload = false;
                }, 2000);
            }, 3000);
        }
        else {
            setTimeout(function () {
                domQuestionElements.allOp[e].style.color = "red";
                setTimeout(function () {
                }, 2000);
            }, 3000);
        }
    });
}
initializeQuizUi();
