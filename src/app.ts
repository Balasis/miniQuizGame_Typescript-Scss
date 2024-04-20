const theQuizUI:HTMLElement=document.getElementById("theQuizUI")!;
interface ScorePanelElement{
    scorePanel:HTMLElement;
    emptyScorePanelElement:()=>void;
    populateScorePanelElement:()=>void;
}
interface QuestionElements{
    theQuestion:HTMLElement;
    theOpA: HTMLElement;
    theOpB: HTMLElement;
    theOpC: HTMLElement;
    theOpD: HTMLElement;
    allOp: HTMLCollectionOf<HTMLElement>;
    populateQuestionDomElements:(index:number)=>void;
}

const domScorePanelElement:ScorePanelElement={
    scorePanel:document.getElementById("scorePanel")!,
    emptyScorePanelElement(){
        while(this.scorePanel.firstChild){
            this.scorePanel.removeChild(this.scorePanel.firstChild);
        }  
    },
    populateScorePanelElement(){
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
            this.scorePanel.insertBefore(stageDiv,this.scorePanel.firstChild);
        } 
    }

}



const domQuestionElements:QuestionElements={
    theQuestion:document.getElementById("theQuestion")!,
    theOpA:document.getElementById("theOptions__A&B__A")!,
    theOpB:document.getElementById("theOptions__A&B__B")!,
    theOpC:document.getElementById("theOptions__C&D__C")!,
    theOpD:document.getElementById("theOptions__C&D__D")!,
    allOp:document.getElementsByClassName("qOption") as HTMLCollectionOf<HTMLElement>,

    populateQuestionDomElements(index:number){
        this.theQuestion.textContent=theQuiz.getStagesBoard()[index].getQuestion().getTheQuestion();
        //trying with json type...array instead of methods
        this.theOpA.textContent=theQuiz.getStagesBoard()[index]["question"]["options"][0];
        this.theOpB.textContent=theQuiz.getStagesBoard()[index]["question"]["options"][1];
        this.theOpC.textContent=theQuiz.getStagesBoard()[index]["question"]["options"][2];
        this.theOpD.textContent=theQuiz.getStagesBoard()[index]["question"]["options"][3];
    }


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


interface Assist{
    description:string;
    modifyTheQuiz:()=>void;
}

const assistFiftyFifty:Assist={
    description:"Hides 2 out of 4 incorrect options";
    modifyTheQuiz(){
        console.log(theQuizUI);
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

async function initializeQuizUi():Promise<void>{
await loadInTheQuiz("./build/easyQuestions.json",1,5,1);
await loadInTheQuiz("./build/mediumQuestions.json",6,10,2);
await loadInTheQuiz("./build/hardQuestions.json",11,15,3); 
domScorePanelElement.emptyScorePanelElement();//in Case of reset
domScorePanelElement.populateScorePanelElement();
domQuestionElements.populateQuestionDomElements(1);
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
    domQuestionElements.populateQuestionDomElements(sc);
}

function wonTheGame():void{
    console.log("You won the game");//placeholder;
    
}

async function resetTheGame():Promise<void>{    
thePlayer=new Player("John",0);
theQuiz=new TheQuiz(thePlayer,0,1);
await initializeQuizUi();
}

function randomizer(min:number,max:number):number{
    return Math.floor((Math.random() * (max-min))+min);
}







let thePlayer:Player=new Player("John",0);
let theQuiz:TheQuiz=new TheQuiz(thePlayer,0,1);
let isOnload:boolean=false;

for(let e=0;e<domQuestionElements.allOp.length;e++){

    domQuestionElements.allOp[e].addEventListener('click',function(){
        if(isOnload){
            console.log("we are on load..plz try later");
            return;
        }       
        isOnload=true;
        domQuestionElements.allOp[e].style.color="orange";
        
        if (domQuestionElements.allOp[e].textContent==theQuiz.getStagesBoard()[theQuiz.getStageCounter()].getQuestion().getTheCorrectAnswer()){
            setTimeout( function(){ 
                domQuestionElements.allOp[e].style.color="green";
                    setTimeout(function(){
                        if (theQuiz.getStageCounter() + 1 >=16){
                            wonTheGame();
                            return;
                        }
                        theQuiz.increaseStageCounter();
                        updateStage();
                        domQuestionElements.allOp[e].style.color="initial";
                        isOnload=false;
                    },2000)                    
            },3000 )
           
        }else{
            setTimeout( function(){ 
                domQuestionElements.allOp[e].style.color="red";
                    setTimeout(function(){
                        

                    },2000)                    
            },3000 )
        }         
    })
}




initializeQuizUi();