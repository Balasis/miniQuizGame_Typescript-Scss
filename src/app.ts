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

    public constructor(thePlayer:Player,timeSinceQuizStarted:number,stageCounter:number){
        this.thePlayer=thePlayer;
        this.timeSinceQuizStarted=timeSinceQuizStarted;
        this.stageCounter=stageCounter;
    }

    public settimeSinceQuizStarted(timeSinceQuizStarted:number):void{
        this.timeSinceQuizStarted=timeSinceQuizStarted;
    }

    public increaseStageCounter():void{
        this.stageCounter=this.stageCounter+1;
    }

    public resetStageCounter():void{
        this.stageCounter=0;
    }

    public addStageToStagesBoard(stageNumber: number, stage: Stage) {
        this.stagesBoard[stageNumber] = stage;
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

let thePlayer:Player=new Player("John",0);
let theQuiz:TheQuiz=new TheQuiz(thePlayer,0,1);
        
        function loadInTheQuiz(path: string, startingIndexStage: number, endingIndexStage: number, dif: difficultyLevel):Promise<void> {
            let indexesOfQuestionsUsed: number[] = [];
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
                                } while (indexesOfQuestionsUsed.indexOf(theRandom) !== -1)
                                indexesOfQuestionsUsed.push(theRandom);
                                let aQuestion = new Question(questionsFetch[theRandom].question, questionsFetch[theRandom].options, questionsFetch[theRandom].correctAnswer, 1);
                                let aStage = new Stage(i, moneyBoardFetch[i], false, aQuestion);
                                theQuiz.addStageToStagesBoard(i, aStage);
                            }
                            console.log("loadInTheQuiz");
                        });
                });
        }
        

//declarations of Quiz
const theQuizUI:HTMLElement=document.getElementById("theQuizUI")!;
const scorePanel:HTMLElement=document.getElementById("scorePanel")!;
const theQuestion:HTMLElement=document.getElementById("theQuestion")!;
const theOptions:HTMLElement=document.getElementById("theOptions")!;
const theOpA:HTMLElement=document.getElementById("theOptions__A&B__A")!;
const theOpB:HTMLElement=document.getElementById("theOptions__A&B__B")!;
const theOpC:HTMLElement=document.getElementById("theOptions__C&D__C")!;
const theOpD:HTMLElement=document.getElementById("theOptions__C&D__D")!;
//you need to declare this as HTMLCollection so you might set a style...
//sigh this typescript started to get on my nerves
//This is a specific usage pattern provided by TypeScript's DOM library, 
//where you're using a predefined interface (HTMLCollectionOf<T>) with
// a specific type (HTMLElement) to describe the nature of the collection.
//While it may look similar to generic type syntax, it's actually a specialized 
//syntax provided by TypeScript for working with DOM collections.
const allOp=document.getElementsByClassName("qOption") as HTMLCollectionOf<HTMLElement>;

//GOTTA love fetches and promises....sweet promise solve my sychronize issues
//...async functions wait for the promises of await functions to be returned in order
//to continue...oh my this solves a lot of my problems...love it love it love it
//..it ease the pain from other projects too...

async function initializeQuizUi():Promise<void>{
await loadInTheQuiz("./build/easyQuestions.json",1,5,1);
await loadInTheQuiz("./build/mediumQuestions.json",6,10,2);
await loadInTheQuiz("./build/hardQuestions.json",11,15,3);


    /*well if you try to have different types ,typescript wont make it easy for you
    const stage =theQuiz.getStagesBoard()[1].getQuestion().getTheQuestion();
    if (stage!=null){
    you can also do it like that: without using methods...*/
    // for (let i=1;i<Object.keys(theQuiz.getStagesBoard()).length;i++){
    //     console.log(Object.keys(theQuiz.getStagesBoard()).length);
    // }    
    // for(  {Object b:theQuiz.getStagesBoard())
        
        for (const s in theQuiz.getStagesBoard()) {

            const stageIndexDiv:HTMLElement = document.createElement("div");
            stageIndexDiv.id=`n_${s}`;
            stageIndexDiv.textContent=s;

            const stageAnsweredTickDiv:HTMLElement = document.createElement("div");
            stageAnsweredTickDiv.id=`c_${s}`;
            stageAnsweredTickDiv.className="stageAnsweredTick";
            stageAnsweredTickDiv.textContent="";

            const stageMoneyDiv:HTMLElement = document.createElement("div");
            stageMoneyDiv.id=`m_${s}`;
            stageMoneyDiv.textContent=theQuiz.getStagesBoard()[s]["stageMoney"].toString();

            const stageDiv:HTMLElement = document.createElement("div");
            stageDiv.id=`s_${s}`;
            stageDiv.appendChild(stageIndexDiv);
            stageDiv.appendChild(stageAnsweredTickDiv);
            stageDiv.appendChild(stageMoneyDiv);
            //add orange background to the first one
            if (s=="1"){
            stageDiv.style.backgroundColor="orange";
            }
            scorePanel.insertBefore(stageDiv,scorePanel.firstChild);
        } 
    theQuestion.textContent=theQuiz.getStagesBoard()[1].getQuestion().getTheQuestion();
    //trying with json type...array instead of methods
    theOpA.textContent=theQuiz.getStagesBoard()[1]["question"]["options"][0];
    theOpB.textContent=theQuiz.getStagesBoard()[1]["question"]["options"][1];
    theOpC.textContent=theQuiz.getStagesBoard()[1]["question"]["options"][2];
    theOpD.textContent=theQuiz.getStagesBoard()[1]["question"]["options"][3];
    // }
    // .getQuestion().getTheQuestion()!.toString()
}

function updateStage():void{
    //stageCounter has been increased before calling of this function
    //therefore we just reset/set properties to previous stage and to current one

    //fetch the current(justIncreased) stageCounter to use it as index
    let sc:number=theQuiz.getStageCounter();

    //declaration of previous stage
    let indexOfPreviousStageBorderDiv:string=`s_${sc-1}`;
    let prevStageDom:HTMLElement=document.getElementById(indexOfPreviousStageBorderDiv)!;

    //declaration of current(just Increased) stage
    let indexOfNextStageBorderDiv:string=`s_${sc}`;
    let curStageDom:HTMLElement=document.getElementById(indexOfNextStageBorderDiv)!;

    //set/reset properties in the previous stage
    prevStageDom.style.backgroundColor="initial";
    prevStageDom.querySelector(".stageAnsweredTick")!.textContent="*";

    //set/reset properties in the current stage
    curStageDom.style.backgroundColor="orange";
  
    theQuestion.textContent=theQuiz.getStagesBoard()[sc].getQuestion().getTheQuestion();
    theOpA.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][0];
    theOpB.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][1];
    theOpC.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][2];
    theOpD.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][3];
}



let isOnload:boolean=false;

for(let e=0;e<allOp.length;e++){

    allOp[e].addEventListener('click',function(){
        if(isOnload){
            console.log("we are on load..plz try later");
            return;
        }       
        isOnload=true;
        allOp[e].style.color="orange";
        
        if (allOp[e].textContent==theQuiz.getStagesBoard()[theQuiz.getStageCounter()].getQuestion().getTheCorrectAnswer()){
            setTimeout( function(){ 
                allOp[e].style.color="green";
                    setTimeout(function(){
                        if (theQuiz.getStageCounter() + 1 >=16){
                            wonTheGame();
                            return;
                        }
                        theQuiz.increaseStageCounter();
                        updateStage();
                        allOp[e].style.color="initial";
                        isOnload=false;
                    },2000)                    
            },3000 )
           
        }else{
            setTimeout( function(){ 
                allOp[e].style.color="red";
                    setTimeout(function(){
                        

                    },2000)                    
            },3000 )
        }         
    })
}

function wonTheGame():void{
    console.log("You won the game");//placeholder;
}

async function resetTheGame():Promise<void>{    
thePlayer=new Player("John",0);
theQuiz=new TheQuiz(thePlayer,0,1);
initializeQuizUi();
}




initializeQuizUi();