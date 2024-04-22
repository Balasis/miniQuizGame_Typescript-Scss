import { AssistFiftyFifty } from "./AssistFiftyFifty.js";
export class TheQuiz {
    thePlayer;
    timeSinceQuizStarted;
    stageCounter = 0;
    stagesBoard = {};
    theAssists = {};
    constructor(thePlayer, timeSinceQuizStarted, stageCounter) {
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
