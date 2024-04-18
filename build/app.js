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
        return this.options ? this.options[index] : null;
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
let jsonQuestionPath;
// if (1){
//     jsonQuestionPath="./build/easyQuestions.json";
// }else if(2){
//     jsonQuestionPath="./build/easyQuestions.json";
// }else{
//     jsonQuestionPath="./build/easyQuestions.json";
// }
//AND like that you can create an array , by using a loop and having randomizer among..perhaps pick up a randomizer after
//the 3 fetches..or even better you can have 3 fetches?...you check this out later....
fetch("./build/easyQuestions.json")
    .then(response => { return response.json(); })
    .then(DaResponse => {
    let aQuestion = new Question(DaResponse.question, DaResponse.options, DaResponse.correctAnswer, 1);
    let aStage = new Stage(1, 500000, false, aQuestion);
    console.log(aStage.getQuestion().getOption(0));
});
// et question=new Question(1);
// // console.log(question.getTheQuestion());//would result to null cause ajax..but you could use
// question.fetchQuestion().then(() => {
//     console.log(question.getTheQuestion());
// });
// //but again you need to make the fetchQuestion public ; ...idk yet if the whole thing is an
// //issue but for now I'll leave it as it is..
// function testing(){
// console.log(question.getTheQuestion());
// }
