import {theQuiz} from "../app.js";
import {thePlayer} from "../app.js";


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
    resetClassesOfOptions:()=>void;
}


export const domAssistPanelElement:AssistPanelElement={
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

export const domScorePanelElement:ScorePanelElement={
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

 export const domQuestionElements:QuestionElements={
    theQuestion:document.getElementById("theQuestion")!,
    theOpA:document.getElementById("theOptions__AB__A__text")!,
    theOpB:document.getElementById("theOptions__AB__B__text")!,
    theOpC:document.getElementById("theOptions__CD__C__text")!,
    theOpD:document.getElementById("theOptions__CD__D__text")!,
    allOp:document.getElementsByClassName("qOptionText") as HTMLCollectionOf<HTMLElement>,

    resetClassesOfOptions(){
        for (let i=0;i<this.allOp.length;i++){
            if (this.allOp[i].parentElement!.classList.contains("qAnswerWasCorrect")){
                this.allOp[i].parentElement?.classList.remove("qAnswerWasCorrect");
            }
            if (this.allOp[i].parentElement!.classList.contains("qWaitForAnswer")){
                this.allOp[i].parentElement?.classList.remove("qWaitForAnswer");
            }
            if (this.allOp[i].parentElement!.classList.contains("qAnswerWasWrong")){
                this.allOp[i].parentElement?.classList.remove("qAnswerWasWrong");
            }

        }
    },

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
