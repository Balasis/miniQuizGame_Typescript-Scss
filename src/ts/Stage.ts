import {Question} from "./Question";
export class Stage{    
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