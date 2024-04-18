//Some utilities: types for shortcuts and functions for random numbers e.t.c
    type SorN=string|number;//trying to save some space

    function randomizer(min:number,max:number):number{
    return Math.floor((Math.random() * (max-min))+min);
    }
class Player{
    public constructor(private name:string,private moneyEarned:number){

    }

    public setName(name:string):void{
        this.name=name;
    }

    public setMoneyEarned(moneyEarnedNum:number):void{
        this.moneyEarned=moneyEarnedNum;
    }

    public getName():string{
        return this.name;
    }

    public getMoneyEarned():number{
        return this.moneyEarned;
    }

    public toString():string{
    return `Player name: ${this.name.toString()} holds so far ${this.moneyEarned}`;
    }
}


type difficultyLevel=1|2|3;
class Question{    
    private readonly difficulty:difficultyLevel;
    public constructor(private readonly question:string,private readonly options: string[],private readonly correctAnswer:string,difficulty:difficultyLevel){
        this.difficulty=difficulty;   
    }
    public getTheQuestion():string{
        return this.question;
    }

    public getTheCorrectAnswer():string{
        return this.correctAnswer;
    }
    
    public getOption(index:number):string{
        return this.options[index];
    }
}




class Stage{    
    public constructor(private stageNumber: number,private stageMoney:number,private assistUsed:boolean, private question: Question){        
    }

    public getStageNumber():number{
        return this.stageNumber;
    }

    public getStageMoney():number{
        return this.stageMoney;
    }

    public getQuestion(): Question {
        return this.question;
    }

    public getAssistedUsed():boolean{
        return this.assistUsed;
    }

    public setAssistedUsed(assistedYorN:boolean):void{
        this.assistUsed=assistedYorN;
    }
}


class TheQuiz{
    private thePlayer:Player;
    private timeSinceQuizStarted:number;
    private stageCounter:number=0;
    private stagesBoard: Record<number, Stage> = {};    
    private moneyBoard: Record<number, number> = {};

    public constructor(thePlayer:Player,timeSinceQuizStarted:number,stageCounter:number){
        this.thePlayer=thePlayer;
        this.timeSinceQuizStarted=timeSinceQuizStarted;
        this.stageCounter=stageCounter;
    }

    public settimeSinceQuizStarted(timeSinceQuizStarted:number):void{
        this.timeSinceQuizStarted=timeSinceQuizStarted;
    }

    public setStageCounter(StageCounterNum:number):void{
        this.stageCounter=StageCounterNum;
    }

    public addStageToStagesBoard(stageNumber: number, stage: Stage) {
        this.stagesBoard[stageNumber] = stage;
    }

    public addToMoneyBoard(boardNum:number,money: number) {
        this.moneyBoard[boardNum] = money;
    }

    public getMoneyBoard(): Record<number, number> {
        return this.moneyBoard;
    }
    

    public getStagesBoard(): Record<number, Stage> {
        return this.stagesBoard;
    }

    public gettimeSinceQuizStarted():number{
        return this.timeSinceQuizStarted;
    }

    public getStageCounter():number{
        return this.stageCounter;
    }

    public toString():string{
    return `timeSinceQuizStarted: ${this.timeSinceQuizStarted.toString()} with
     stage ${this.stageCounter}
     and the player being ${this.thePlayer.getName()}
     `;
    }
}

let thePlayer=new Player("John",0);
let theQuiz=new TheQuiz(thePlayer,0,1);
let indexesOfEasyQuestionsUsed:number[]=[];
let indexesOfMediumQuestionsUsed:number[]=[];
let indexesOfHardQuestionsUsed:number[]=[];

        function loadInTheQuiz(path:string,startingIndexStage:number,endingIndexStage:number,indexesCheckArray:number[]){
            fetch(path)
                .then(response=>{return response.json();})
                .then(questionsFetch=>{
                    fetch("./build/moneyBoard.json").then(responsee=>{return responsee.json();}).then(moneyBoardFetch=>{
                        for(let i=startingIndexStage;i<=endingIndexStage;i++){
                            let theRandom;
                            do{
                            theRandom=randomizer(1,questionsFetch.length);
                            }while(indexesCheckArray.indexOf(theRandom)!== -1)
                            indexesCheckArray.push(theRandom);
                            let aQuestion=new Question(questionsFetch[theRandom].question,questionsFetch[theRandom].options,questionsFetch[theRandom].correctAnswer,1);
                            let aStage=new Stage(i,moneyBoardFetch[i],false,aQuestion);
                            theQuiz.addStageToStagesBoard(i,aStage);
                            
                        }
                    }) 
                })
        }


            
//Menu functions
loadInTheQuiz("./build/easyQuestions.json",1,5,indexesOfEasyQuestionsUsed);
loadInTheQuiz("./build/mediumQuestions.json",6,10,indexesOfMediumQuestionsUsed);
loadInTheQuiz("./build/hardQuestions.json",11,15,indexesOfHardQuestionsUsed);



//declarations of Menu
const startingMenu=document.getElementById("startingMenu")!;
const newGame=document.getElementById("newGame")!;
const preferences=document.getElementById("preferences");//omited the "!" to check"?"
const aboutUs=document.getElementById("aboutUs")!;


//declarations of Quiz
const theQuizUI=document.getElementById("theQuizUI")!;
const scorePanel=document.getElementById("scorePanel")!;

const theQuestion=document.getElementById("theQuestion")!;
const theOptions=document.getElementById("theOptions")!;
const theOpA=document.getElementById("theOptions__A&B__A")!;
const theOpB=document.getElementById("theOptions__A&B__B")!;
const theOpC=document.getElementById("theOptions__C&D__C")!;
const theOpD=document.getElementById("theOptions__C&D__D")!;

//by placing ! in the end you ensure the typescript that it will find it for sure

newGame.addEventListener('click',function(){

    initializeQuizUi();
})

function initializeQuizUi(){
    //well if you try to have different types typescript wont make it easy for you
    // const stage =theQuiz.getStagesBoard()[1].getQuestion().getTheQuestion();
    // if (stage!=null){
        //you can also do it like that: without using methods...
        console.log(theQuiz.getStagesBoard()[1]["question"]["question"]);
    theQuestion.textContent=theQuiz.getStagesBoard()[1].getQuestion().getTheQuestion();
    //trying with json type...array instead of methods
    theOpA.textContent=theQuiz.getStagesBoard()[1]["question"]["options"][0];
    // }
    // .getQuestion().getTheQuestion()!.toString()
}
//use of Optional Chaining (?.) so if its null or undefined it will stop there
preferences?.addEventListener('click',function(){

})


