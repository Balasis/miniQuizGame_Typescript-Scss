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
const restartTheGameBtn = document.getElementById("restartButton");
const theVisibleResetBtn = document.getElementById("assistsUI__theVisibleResetBtn");
const domAssistPanelElement = {
    AssistBtnPanel: document.getElementById("assistsUI__Buttons"),
    populateAssistPanelElement() {
        const assists = theQuiz.getAllAssists();
        for (const assist in assists) {
            let daAssist = assists[assist];
            const assistDiv = document.createElement("div");
            assistDiv.id = `assistD_${assist}`;
            assistDiv.textContent = daAssist.getUIdescription();
            assistDiv.className = "assists";
            assistDiv.addEventListener("click", function () {
                thePlayer.useAssist(daAssist);
                if (daAssist.getUsed()) {
                    assistDiv.classList.add("assistUsed");
                }
            });
            this.AssistBtnPanel.appendChild(assistDiv);
        }
    },
    emptyAssistPanelElement() {
        while (this.AssistBtnPanel.firstChild) {
            this.AssistBtnPanel.removeChild(this.AssistBtnPanel.firstChild);
        }
    }
};
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
            stageIndexDiv.className = "n1_BorderInitialColor";
            const stageAnsweredTickDiv = document.createElement("div");
            stageAnsweredTickDiv.id = `c_${s}`;
            stageAnsweredTickDiv.className = "stageAnsweredTick";
            stageAnsweredTickDiv.textContent = "";
            const stageTitleDiv = document.createElement("div");
            stageTitleDiv.id = `m_${s}`;
            stageTitleDiv.textContent = theQuiz.getStagesBoard()[s]["stageTitle"].toString();
            stageTitleDiv.className = "m1_BorderInitialProps";
            const stageDiv = document.createElement("div");
            stageDiv.id = `s_${s}`;
            stageDiv.appendChild(stageIndexDiv);
            stageDiv.appendChild(stageAnsweredTickDiv);
            stageDiv.appendChild(stageTitleDiv);
            // add orange background to the first one
            if (s == "1") {
                stageDiv.classList.add("curStageBackground");
                stageIndexDiv.classList.add("BorderRightColorCurrent");
            }
            this.scorePanel.insertBefore(stageDiv, this.scorePanel.firstChild);
        }
        document.getElementById("m_1").classList.add("curStageBackground");
    },
    updateScorePanelUiFocusToNextStage() {
        let sc = theQuiz.getStageCounter();
        let prevStageDom = document.getElementById(`s_${sc - 1}`);
        prevStageDom.classList.remove("curStageBackground");
        document.getElementById(`m_${sc - 1}`).classList.remove("curStageBackground");
        document.getElementById(`n_${sc - 1}`).classList.remove("BorderRightColorCurrent");
        prevStageDom.classList.add("previousStageBackground");
        document.getElementById(`m_${sc - 1}`).classList.add("previousStageBackground");
        document.getElementById(`n_${sc - 1}`).classList.add("BorderRightColorPrevious");
        prevStageDom.querySelector(".stageAnsweredTick").textContent = "*";
        let curStageDom = document.getElementById(`s_${sc}`);
        curStageDom.classList.add("curStageBackground");
        document.getElementById(`m_${sc}`).classList.add("curStageBackground");
        document.getElementById(`n_${sc}`).classList.add("BorderRightColorCurrent");
    }
};
const domQuestionElements = {
    theQuestion: document.getElementById("theQuestion"),
    theOpA: document.getElementById("theOptions__AB__A__text"),
    theOpB: document.getElementById("theOptions__AB__B__text"),
    theOpC: document.getElementById("theOptions__CD__C__text"),
    theOpD: document.getElementById("theOptions__CD__D__text"),
    allOp: document.getElementsByClassName("qOptionText"),
    populateQuestionDomElements() {
        let sc = theQuiz.getStageCounter();
        this.theQuestion.textContent = theQuiz.getStagesBoard()[sc].getQuestion().getTheQuestion();
        //trying with json type...array instead of methods
        this.theOpA.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][0];
        this.theOpB.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][1];
        this.theOpC.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][2];
        this.theOpD.textContent = theQuiz.getStagesBoard()[sc]["question"]["options"][3];
    },
    resetPotentialAssistsModifications() {
        for (const p of this.allOp) {
            //reset 50-50 assist
            p.style.pointerEvents = "auto";
        }
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
    useAssist(theAssist) {
        if (!theAssist.getUsed()) {
            theAssist.modifyTheQuiz();
        }
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
    constructor(stageNumber, stageTitle, assistUsed, question) {
        this.stageNumber = stageNumber;
        this.stageTitle = stageTitle;
        this.assistUsed = assistUsed;
        this.question = question;
    }
    getStageNumber() {
        return this.stageNumber;
    }
    getstageTitle() {
        return this.stageTitle;
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
class Assist {
    constructor(used = false, description, UIdescription) {
        this.used = used;
        this.description = description;
        this.UIdescription = UIdescription;
    }
    getUIdescription() {
        return this.UIdescription;
    }
    getUsed() {
        return this.used;
    }
    setUsed(b) {
        this.used = b;
    }
}
class AssistFiftyFifty extends Assist {
    constructor() {
        super(false, "Hides 2 out of 4 incorrect options", "50-50");
    }
    modifyTheQuiz() {
        let indexOfCorrectAnswer;
        let numberOfHidden = 0;
        let indexNumbersToBeHidden = [];
        for (let k = 0; k <= domQuestionElements.allOp.length; k++) {
            if (domQuestionElements.allOp[k].textContent === theQuiz.getCurrentCorrectAnswer()) {
                indexOfCorrectAnswer = k;
                break;
            }
        }
        while (numberOfHidden < 2) {
            let r = randomizer(0, domQuestionElements.allOp.length);
            if (r != indexOfCorrectAnswer && !indexNumbersToBeHidden.includes(r)) {
                indexNumbersToBeHidden.push(r);
                domQuestionElements.allOp[r].textContent = "";
                domQuestionElements.allOp[r].style.pointerEvents = "none";
                numberOfHidden++;
            }
        }
        super.setUsed(true);
    }
}
class TheQuiz {
    constructor(thePlayer, timeSinceQuizStarted, stageCounter) {
        this.stageCounter = 0;
        this.stagesBoard = {};
        this.theAssists = {};
        this.thePlayer = thePlayer;
        this.timeSinceQuizStarted = timeSinceQuizStarted;
        this.stageCounter = stageCounter;
        let assistFiftyFifty = new AssistFiftyFifty();
        this.theAssists.assistFiftyFifty = assistFiftyFifty;
    }
    setTimeSinceQuizStarted(timeSinceQuizStarted) {
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
    getAllAssists() {
        return this.theAssists;
    }
    getAnAssist(nameOfAssist) {
        return this.theAssists[nameOfAssist];
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
    getCurrentCorrectAnswer() {
        return this.stagesBoard[this.stageCounter].getQuestion().getTheCorrectAnswer();
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
        });
    });
}
function initializeQuizUi() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadInTheQuiz("./build/jsons/stageOnePartA.json", 1, 2, 1);
        yield loadInTheQuiz("./build/jsons/stageOnePartB.json", 3, 4, 2);
        yield loadInTheQuiz("./build/jsons/stageTwoPartA.json", 5, 6, 3);
        yield loadInTheQuiz("./build/jsons/stageTwoPartB.json", 7, 8, 4);
        yield loadInTheQuiz("./build/jsons/stageThreePartA.json", 9, 10, 5);
        yield loadInTheQuiz("./build/jsons/stageThreePartB.json", 11, 12, 6);
        yield loadInTheQuiz("./build/jsons/masters.json", 13, 14, 7);
        yield loadInTheQuiz("./build/jsons/masterDrEfremidis.json", 9, 15, 8);
        domAssistPanelElement.emptyAssistPanelElement(); //in Case of reset
        domAssistPanelElement.populateAssistPanelElement();
        domScorePanelElement.emptyScorePanelElement(); //in Case of reset
        domScorePanelElement.populateScorePanelElement();
        domQuestionElements.populateQuestionDomElements();
    });
}
function updateStage() {
    domScorePanelElement.updateScorePanelUiFocusToNextStage();
    domQuestionElements.resetPotentialAssistsModifications();
    domQuestionElements.populateQuestionDomElements();
}
function wonTheGame() {
    theQuizUI.style.display = "none";
}
theVisibleResetBtn.addEventListener("click", function () {
    resetTheGame();
});
restartTheGameBtn.addEventListener("click", function () {
    resetTheGame();
});
function resetTheGame() {
    return __awaiter(this, void 0, void 0, function* () {
        thePlayer = new Player("John", 0);
        theQuiz = new TheQuiz(thePlayer, 0, 1);
        yield initializeQuizUi();
        theQuizUI.style.display = "flex";
    });
}
function randomizer(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
let thePlayer = new Player("John", 0);
let theQuiz = new TheQuiz(thePlayer, 0, 1);
let isOnload = false;
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
                        return;
                    }
                    theQuiz.increaseStageCounter();
                    updateStage();
                    parentElement.classList.remove("qAnswerWasCorrect");
                    isOnload = false;
                }, 2000);
            }, 3000);
        }
        else {
            setTimeout(function () {
                parentElement.classList.remove("qWaitForAnswer");
                parentElement.classList.add("qAnswerWasWrong");
                showTheCorrectAnswer();
                setTimeout(function () {
                }, 2000);
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
