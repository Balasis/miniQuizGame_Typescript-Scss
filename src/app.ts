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
class Question{
    private readonly question:string;
    private readonly options: SorN[];
    public constructor(question:string,op1:SorN,op2:SorN,op3:SorN,op4:SorN){
        this.question=question;
        this.options=[op1,op2,op3,op4];
    }
    public getTheQuestion():SorN{
        return this.question;
    }
    
    public getOption(index:number):SorN{
        return this.options[index];
    }
}

type difficultyLevels=1|2|3;

class EasyQuestion extends Question{
    private readonly difficultyLevel:difficultyLevels=1;
    public constructor(question:string,op1:SorN,op2:SorN,op3:SorN,op4:SorN){
        super(question,op1,op2,op3,op4);
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