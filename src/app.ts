//Some utilities: types for shortcuts and methods for random numbers e.t.c
type SorN=string|number;//trying to save some space




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


type difficultyLevels=1|2|3;
class Question{
    private question:string | null=null;
    private options: SorN[]  | null=null;
    private correctAnswer:string | null=null;
    private readonly difficulty:difficultyLevels;
    public constructor(difficulty:difficultyLevels){
        this.difficulty=difficulty;        
        this.fetchQuestion(this.difficulty);
        // this.question=question;
        // this.options=[op1,op2,op3,op4];
    }
    public getTheQuestion():SorN | null{
        return this.question;
    }

    public getTheCorrectAnswer():SorN | null{
        return this.correctAnswer;
    }
    
    public getOption(index:number):SorN | null{
        return this.options ? this.options[index] : null;
    }

    private fetchQuestion(difficulty:difficultyLevels):void{
        let jsonQuestionPath:string;
        if (difficulty==1){
            jsonQuestionPath="./build/easyQuestions.json";
        }else if(difficulty==2){
            jsonQuestionPath="./build/easyQuestions.json";
        }else{
            jsonQuestionPath="./build/easyQuestions.json";
        }
        fetch(jsonQuestionPath)
            .then(response=>{return response.json();})
            .then(DaResponse=>{
                console.log(DaResponse);
                this.question=DaResponse.question;
                this.options=DaResponse.options;
            })      
    }
}




class Stage{
    private question: Question;
    
    public constructor(private stageNumber: number,private stageMoney:number,private assistUsed:boolean,question:Question){
        this.question=question;
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
    public constructor(private timeSinceQuizStarted:number,private stageCounter:number=0,thePlayer:Player){
        this.thePlayer=thePlayer;
    }

    public settimeSinceQuizStarted(timeSinceQuizStarted:number):void{
        this.timeSinceQuizStarted=timeSinceQuizStarted;
    }

    public setStageCounter(StageCounterNum:number):void{
        this.stageCounter=StageCounterNum;
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

console.log(new TheQuiz(0,0,new Player("John",0)).toString());
console.log(new Question(1).getTheQuestion());