import { Player } from "./ts/Player.js";
import { Question } from "./ts/Question.js";
import { Stage } from "./ts/Stage.js";
import { domAssistPanelElement, domScorePanelElement, domQuestionElements } from "./ts/domPanels.js";
import { TheQuiz } from "./ts/TheQuiz.js";
const theQuizUI = document.getElementById("theQuizUI");
const restartTheGameBtn = document.getElementById("restartButton");
const theVisibleResetBtn = document.getElementById("assistsUI__theVisibleResetBtn");
const wonTheGameDiv = document.getElementById("wonTheGame");
let isOnload = false;
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
        });
    });
}
async function initializeQuizUi() {
    await loadInTheQuiz("./build/jsons/stageOnePartA.json", 1, 2, 1);
    await loadInTheQuiz("./build/jsons/stageOnePartB.json", 3, 4, 2);
    await loadInTheQuiz("./build/jsons/stageTwoPartA.json", 5, 6, 3);
    await loadInTheQuiz("./build/jsons/stageTwoPartB.json", 7, 8, 4);
    await loadInTheQuiz("./build/jsons/stageThreePartA.json", 9, 10, 5);
    await loadInTheQuiz("./build/jsons/stageThreePartB.json", 11, 12, 6);
    await loadInTheQuiz("./build/jsons/masters.json", 13, 14, 7);
    await loadInTheQuiz("./build/jsons/masterDrEfremidis.json", 9, 15, 8);
    domAssistPanelElement.emptyAssistPanelElement(); //in Case of reset
    domAssistPanelElement.populateAssistPanelElement();
    domScorePanelElement.emptyScorePanelElement(); //in Case of reset
    domScorePanelElement.populateScorePanelElement();
    domQuestionElements.resetClassesOfOptions();
    domQuestionElements.populateQuestionDomElements();
}
function updateStage() {
    domScorePanelElement.updateScorePanelUiFocusToNextStage();
    domQuestionElements.resetPotentialAssistsModifications();
    domQuestionElements.populateQuestionDomElements();
}
function wonTheGame() {
    theQuizUI.parentElement.style.pointerEvents = "none";
    theQuizUI.parentElement.classList.add("animationForWinning");
    setTimeout(function () {
        theQuizUI.parentElement.style.display = "none";
        wonTheGameDiv.style.display = "flex";
        wonTheGameDiv.classList.add("animationForWinningOnWon");
    }, 5000);
}
theVisibleResetBtn.addEventListener("click", function () {
    resetTheGame();
});
restartTheGameBtn.addEventListener("click", function () {
    resetTheGame();
});
async function resetTheGame() {
    console.log(isOnload);
    if (isOnload) {
        return;
    }
    console.log("gothere");
    thePlayer = new Player("John", 0);
    theQuiz = new TheQuiz(thePlayer, 0, 1);
    await initializeQuizUi();
    wonTheGameDiv.style.display = "none";
    wonTheGameDiv.classList.remove("animationForWinningOnWon");
    theQuizUI.parentElement.classList.remove("animationForWinning");
    theQuizUI.parentElement.style.pointerEvents = "auto";
    theQuizUI.parentElement.style.display = "flex";
}
export function randomizer(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
export let thePlayer = new Player("John", 0);
export let theQuiz = new TheQuiz(thePlayer, 0, 1);
for (let e = 0; e < domQuestionElements.allOp.length; e++) {
    domQuestionElements.allOp[e].parentElement.addEventListener('click', function () {
        if (isOnload) {
            return;
        }
        isOnload = true;
        let parentElement = domQuestionElements.allOp[e].parentElement;
        parentElement.classList.add("qWaitForAnswer");
        if (domQuestionElements.allOp[e].textContent == theQuiz.getCurrentCorrectAnswer()) {
            setTimeout(function () {
                parentElement.classList.remove("qWaitForAnswer");
                parentElement.classList.add("qAnswerWasCorrect");
                setTimeout(function () {
                    if (theQuiz.getStageCounter() + 1 >= 16) {
                        wonTheGame();
                        isOnload = false;
                        return;
                    }
                    theQuiz.increaseStageCounter();
                    updateStage();
                    parentElement.classList.remove("qAnswerWasCorrect");
                    isOnload = false;
                    console.log(theQuiz.getCurrentCorrectAnswer());
                }, 2000);
            }, 3000);
        }
        else {
            setTimeout(function () {
                parentElement.classList.remove("qWaitForAnswer");
                parentElement.classList.add("qAnswerWasWrong");
                showTheCorrectAnswer();
                isOnload = false;
            }, 3000);
        }
    });
}
function showTheCorrectAnswer() {
    for (let i = 0; i < domQuestionElements.allOp.length; i++) {
        if (domQuestionElements.allOp[i].textContent == theQuiz.getCurrentCorrectAnswer()) {
            domQuestionElements.allOp[i].parentElement.classList.add("qAnswerWasCorrect");
        }
    }
}
initializeQuizUi();
domQuestionElements.resetPotentialAssistsModifications();
