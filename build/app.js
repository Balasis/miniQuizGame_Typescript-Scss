"use strict";
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
    constructor(question, op1, op2, op3, op4) {
        this.question = question;
        this.options = [op1, op2, op3, op4];
    }
    getTheQuestion() {
        return this.question;
    }
    getOption(index) {
        return this.options[index];
    }
}
class EasyQuestion extends Question {
    constructor(question, op1, op2, op3, op4) {
        super(question, op1, op2, op3, op4);
        this.difficultyLevel = 1;
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
    constructor(timeSinceQuizStarted, stageCounter = 0, thePlayer) {
        this.timeSinceQuizStarted = timeSinceQuizStarted;
        this.stageCounter = stageCounter;
        this.thePlayer = thePlayer;
    }
    settimeSinceQuizStarted(timeSinceQuizStarted) {
        this.timeSinceQuizStarted = timeSinceQuizStarted;
    }
    setStageCounter(StageCounterNum) {
        this.stageCounter = StageCounterNum;
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
console.log(new TheQuiz(0, 0, new Player("John", 0)).toString());
