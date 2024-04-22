export abstract class Assist{
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

export default Assist;