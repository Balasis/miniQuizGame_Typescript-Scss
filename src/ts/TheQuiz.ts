import { Player } from "./Player.js";
import { Assist } from "./Assist.js";
import { Stage } from "./Stage.js";
import { AssistFiftyFifty } from "./AssistFiftyFifty.js";

export class TheQuiz{
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