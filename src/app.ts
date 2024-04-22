const theQuizUI:HTMLElement=document.getElementById("theQuizUI")!;
const restartTheGameBtn:HTMLElement=document.getElementById("restartButton")!;
const theVisibleResetBtn:HTMLElement=document.getElementById("assistsUI__theVisibleResetBtn")!;
const wonTheGameDiv:HTMLElement=document.getElementById("wonTheGame")!;
interface AssistPanelElement{
    AssistBtnPanel:HTMLElement;
    populateAssistPanelElement:()=>void;
    emptyAssistPanelElement:()=>void;
}
interface ScorePanelElement{
    scorePanel:HTMLElement;
    emptyScorePanelElement:()=>void;
    populateScorePanelElement:()=>void;
    updateScorePanelUiFocusToNextStage:()=>void;
}
interface QuestionElements{
    theQuestion:HTMLElement;
    theOpA: HTMLElement;
    theOpB: HTMLElement;
    theOpC: HTMLElement;
    theOpD: HTMLElement;
    allOp: HTMLCollectionOf<HTMLElement>;
    populateQuestionDomElements:()=>void;
    resetPotentialAssistsModifications:()=>void;
}

const domAssistPanelElement:AssistPanelElement={
    AssistBtnPanel:document.getElementById("assistsUI__Buttons")!,
    populateAssistPanelElement(){
        const assists = theQuiz.getAllAssists();
        for (const assist in assists) { 
            let daAssist=assists[assist];
            const assistDiv:HTMLElement = document.createElement("div");
            assistDiv.id=`assistD_${assist}`;
            assistDiv.textContent=daAssist.getUIdescription();
            assistDiv.className="assists";
            assistDiv.addEventListener("click",function(){
                thePlayer.useAssist(daAssist);
                if (daAssist.getUsed()){
                    assistDiv.classList.add("assistUsed");
                }
            })
            this.AssistBtnPanel.appendChild(assistDiv);

        }

    },
    emptyAssistPanelElement(){
        while(this.AssistBtnPanel.firstChild){
            this.AssistBtnPanel.removeChild(this.AssistBtnPanel.firstChild);
        } 
    }
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
            stageIndexDiv.className="n1_BorderInitialColor";

            const stageAnsweredTickDiv:HTMLElement = document.createElement("div");
            stageAnsweredTickDiv.id=`c_${s}`;
            stageAnsweredTickDiv.className="stageAnsweredTick";
            stageAnsweredTickDiv.textContent="";
        
            const stageTitleDiv:HTMLElement = document.createElement("div");
            stageTitleDiv.id=`m_${s}`;
            stageTitleDiv.textContent=theQuiz.getStagesBoard()[s]["stageTitle"].toString();
            stageTitleDiv.className="m1_BorderInitialProps";
        
            const stageDiv:HTMLElement = document.createElement("div");
            stageDiv.id=`s_${s}`;
            stageDiv.appendChild(stageIndexDiv);
            stageDiv.appendChild(stageAnsweredTickDiv);
            stageDiv.appendChild(stageTitleDiv);
            // add orange background to the first one
            if (s=="1"){
            stageDiv.classList.add("curStageBackground");
            stageIndexDiv.classList.add("BorderRightColorCurrent");    
            }
            this.scorePanel.insertBefore(stageDiv,this.scorePanel.firstChild);
        } 
        
        document.getElementById("m_1")!.classList.add("curStageBackground");
      
    },
    updateScorePanelUiFocusToNextStage(){

    let sc:number=theQuiz.getStageCounter();

    let prevStageDom:HTMLElement=document.getElementById(`s_${sc-1}`)!;
    prevStageDom.classList.remove("curStageBackground");
    document.getElementById(`m_${sc-1}`)!.classList.remove("curStageBackground");
    document.getElementById(`n_${sc-1}`)!.classList.remove("BorderRightColorCurrent");
    

    prevStageDom.classList.add("previousStageBackground");
    document.getElementById(`m_${sc-1}`)!.classList.add("previousStageBackground");
    document.getElementById(`n_${sc-1}`)!.classList.add("BorderRightColorPrevious");

    prevStageDom.querySelector(".stageAnsweredTick")!.textContent="*";

    let curStageDom:HTMLElement=document.getElementById(`s_${sc}`)!;
    curStageDom.classList.add("curStageBackground");
    document.getElementById(`m_${sc}`)!.classList.add("curStageBackground");
    document.getElementById(`n_${sc}`)!.classList.add("BorderRightColorCurrent");
    }
}

const domQuestionElements:QuestionElements={
    theQuestion:document.getElementById("theQuestion")!,
    theOpA:document.getElementById("theOptions__AB__A__text")!,
    theOpB:document.getElementById("theOptions__AB__B__text")!,
    theOpC:document.getElementById("theOptions__CD__C__text")!,
    theOpD:document.getElementById("theOptions__CD__D__text")!,
    allOp:document.getElementsByClassName("qOptionText") as HTMLCollectionOf<HTMLElement>,

    populateQuestionDomElements(){
        let sc:number=theQuiz.getStageCounter();
        this.theQuestion.textContent=theQuiz.getStagesBoard()[sc].getQuestion().getTheQuestion();
        //trying with json type...array instead of methods
        this.theOpA.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][0];
        this.theOpB.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][1];
        this.theOpC.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][2];
        this.theOpD.textContent=theQuiz.getStagesBoard()[sc]["question"]["options"][3];
    },
    resetPotentialAssistsModifications(){
        for(const p of this.allOp){
            //reset 50-50 assist
            p.style.pointerEvents = "auto";
        }
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

    public useAssist(theAssist:Assist):void{
        if (!theAssist.getUsed()){
            theAssist.modifyTheQuiz();
        }        
    }

    public toString():string{
    return `Player name: ${this.name.toString()} holds so far ${this.moneyEarned}`;
    }
}

type difficultyLevel=1|2|3|4|5|6|7|8;
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
    public constructor(private stageNumber: number,private stageTitle:String,private assistUsed:boolean, private question: Question){        
    }

    public getStageNumber():number{
        return this.stageNumber;
    }

    public getstageTitle():String{
        return this.stageTitle;
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


abstract class Assist{
    constructor(private used:boolean=false , private description:string,private UIdescription:string){

    }
    public getUIdescription():string{
        return this.UIdescription;
    }
    public getUsed():boolean{
        return this.used;
    }
    public setUsed(b:boolean):void{
        this.used=b;
    }
    public abstract modifyTheQuiz():void;
}

class AssistFiftyFifty extends Assist{
    constructor(){
        super(false,"Hides 2 out of 4 incorrect options","50-50");
    }
    public modifyTheQuiz():void{
        let indexOfCorrectAnswer;
        let numberOfHidden:number=0;
        let indexNumbersToBeHidden:number[]=[];       
       for(let k=0; k <= domQuestionElements.allOp.length; k++){
         if (domQuestionElements.allOp[k].textContent===theQuiz.getCurrentCorrectAnswer()){
            indexOfCorrectAnswer=k;
            break;
         }
       }
       while(numberOfHidden<2){
            let r=randomizer(0,domQuestionElements.allOp.length);
            if (r!=indexOfCorrectAnswer && !indexNumbersToBeHidden.includes(r)){
                indexNumbersToBeHidden.push(r);
                domQuestionElements.allOp[r].textContent="";
                domQuestionElements.allOp[r].style.pointerEvents="none";
                numberOfHidden++;
            }
       }
       super.setUsed(true);
    }
}

class TheQuiz{
    private thePlayer:Player;
    private timeSinceQuizStarted:number;
    private stageCounter:number=0;
    private stagesBoard: Record<number, Stage> = {};
    private theAssists:Record<string, Assist> = {};

    public constructor(thePlayer:Player,timeSinceQuizStarted:number,stageCounter:number){
        this.thePlayer=thePlayer;
        this.timeSinceQuizStarted=timeSinceQuizStarted;
        this.stageCounter=stageCounter;
        let assistFiftyFifty=new AssistFiftyFifty();
        this.theAssists.assistFiftyFifty=assistFiftyFifty;

    }

    public setTimeSinceQuizStarted(timeSinceQuizStarted:number):void{
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

    public getAllAssists(){
        return this.theAssists;
    }

    public getAnAssist(nameOfAssist:string):Assist{
        return this.theAssists[nameOfAssist];
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

    public getCurrentCorrectAnswer():string{
        return this.stagesBoard[this.stageCounter].getQuestion().getTheCorrectAnswer();
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
                });
        });
}

async function initializeQuizUi():Promise<void>{
await loadInTheQuiz("./build/jsons/stageOnePartA.json",1,2,1);
await loadInTheQuiz("./build/jsons/stageOnePartB.json",3,4,2);
await loadInTheQuiz("./build/jsons/stageTwoPartA.json",5,6,3);
await loadInTheQuiz("./build/jsons/stageTwoPartB.json",7,8,4);
await loadInTheQuiz("./build/jsons/stageThreePartA.json",9,10,5);
await loadInTheQuiz("./build/jsons/stageThreePartB.json",11,12,6);
await loadInTheQuiz("./build/jsons/masters.json",13,14,7);
await loadInTheQuiz("./build/jsons/masterDrEfremidis.json",9,15,8);
domAssistPanelElement.emptyAssistPanelElement();//in Case of reset
domAssistPanelElement.populateAssistPanelElement();
domScorePanelElement.emptyScorePanelElement();//in Case of reset
domScorePanelElement.populateScorePanelElement();
domQuestionElements.populateQuestionDomElements();
}

function updateStage():void{
    domScorePanelElement.updateScorePanelUiFocusToNextStage();
    domQuestionElements.resetPotentialAssistsModifications();
    domQuestionElements.populateQuestionDomElements();
}

function wonTheGame():void{
    theQuizUI.parentElement!.style.pointerEvents="none";
    theQuizUI.parentElement!.classList.add("animationForWinning");
    setTimeout(function(){
        theQuizUI.parentElement!.style.display="none";
        wonTheGameDiv.style.display="flex";
        wonTheGameDiv.classList.add("animationForWinningOnWon");
    },5000)
    
}
theVisibleResetBtn.addEventListener("click",function(){
    resetTheGame();
});
restartTheGameBtn.addEventListener("click",function(){
    resetTheGame();
});

async function resetTheGame():Promise<void>{   
thePlayer=new Player("John",0);
theQuiz=new TheQuiz(thePlayer,0,1);
await initializeQuizUi();
wonTheGameDiv.style.display="none";
wonTheGameDiv.classList.remove("animationForWinningOnWon");   
theQuizUI.parentElement!.classList.remove("animationForWinning");
theQuizUI.parentElement!.style.pointerEvents="auto";
theQuizUI.parentElement!.style.display="flex";
}

function randomizer(min:number,max:number):number{
    return Math.floor((Math.random() * (max-min))+min);
}

let thePlayer:Player=new Player("John",0);
let theQuiz:TheQuiz=new TheQuiz(thePlayer,0,1);
let isOnload:boolean=false;

for(let e=0;e<domQuestionElements.allOp.length;e++){

    domQuestionElements.allOp[e].parentElement!.addEventListener('click',function(){
        if(isOnload){
            return;
        }       
        isOnload=true;
       let parentElement=domQuestionElements.allOp[e].parentElement!;
       parentElement.classList.add("qWaitForAnswer");
        
        if (domQuestionElements.allOp[e].textContent==theQuiz.getCurrentCorrectAnswer()){
            setTimeout( function(){ 
                parentElement.classList.remove("qWaitForAnswer");
                parentElement.classList.add("qAnswerWasCorrect");
                    setTimeout(function(){
                        if (theQuiz.getStageCounter() + 1 >=16){
                            wonTheGame();
                            return;
                        }
                        theQuiz.increaseStageCounter();
                        updateStage();
                        parentElement.classList.remove("qAnswerWasCorrect");
                        isOnload=false;
                        console.log(theQuiz.getCurrentCorrectAnswer());
                    },2000)                    
            },3000 )
           
        }else{
            setTimeout( function(){ 
                parentElement.classList.remove("qWaitForAnswer");
                parentElement.classList.add("qAnswerWasWrong");
                showTheCorrectAnswer();
                    setTimeout(function(){
                        

                    },2000)                    
            },3000 )
        }         
    })
}
function showTheCorrectAnswer():void{
    for(let i=0;i<domQuestionElements.allOp.length;i++){
        if (domQuestionElements.allOp[i].textContent==theQuiz.getCurrentCorrectAnswer()){
            domQuestionElements.allOp[i].parentElement!.classList.add("qAnswerWasCorrect");
        }
    }
}



initializeQuizUi();
domQuestionElements.resetPotentialAssistsModifications();