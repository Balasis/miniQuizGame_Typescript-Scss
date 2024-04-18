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


type difficultyLevel=1|2|3;
class Question{    
    private readonly difficulty:difficultyLevel;
    public constructor(private readonly question:string,private readonly options: SorN[],private readonly correctAnswer:string,difficulty:difficultyLevel){
        this.difficulty=difficulty;   
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




            let jsonQuestionPath:string;

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
                .then(response=>{return response.json();})
                .then(DaResponse=>{
                    let aQuestion=new Question(DaResponse.question,DaResponse.options,DaResponse.correctAnswer,1);
                    let aStage=new Stage(1,500000,false,aQuestion);
                    console.log(aStage.getQuestion().getOption(0));
                })
    


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