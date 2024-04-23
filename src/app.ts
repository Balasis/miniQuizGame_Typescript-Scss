import { Player } from "./ts/Player";
import {domQuestionElements} from "./ts/domPanels";
import {TheQuiz} from "./ts/TheQuiz";
import { anOptionWasChosen,initializeQuizUi } from "./ts/Controllers";
//functions in order other ts files have access to reset the values 
//since imports are read only 
export function setThePlayer(player: Player): void {
    thePlayer = player;
}

export function setTheQuiz(quiz: TheQuiz): void {
    theQuiz = quiz;
}

export let thePlayer:Player=new Player("John",0);
export let theQuiz:TheQuiz=new TheQuiz(thePlayer,0,1);
for(let e=0;e<domQuestionElements.allOp.length;e++){

    domQuestionElements.allOp[e].parentElement!.addEventListener('click',function(){
        anOptionWasChosen(e);       
    })
}
initializeQuizUi();
domQuestionElements.resetPotentialAssistsModifications();