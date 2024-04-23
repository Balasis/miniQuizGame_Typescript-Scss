import { Assist } from "./Assist.js";
import { domQuestionElements } from "./domPanels.js";
import { theQuiz } from "../app.js";
import { randomizer } from "./Utilities.js";
export class AssistFiftyFifty extends Assist {
    constructor() {
        super(false, "Hides 2 out of 4 incorrect options", "50-50");
    }
    modifyTheQuiz() {
        let indexOfCorrectAnswer;
        let numberOfHidden = 0;
        let indexNumbersToBeHidden = [];
        for (let k = 0; k <= domQuestionElements.allOp.length; k++) {
            if (domQuestionElements.allOp[k].textContent === theQuiz.getCurrentCorrectAnswer()) {
                indexOfCorrectAnswer = k;
                break;
            }
        }
        while (numberOfHidden < 2) {
            let r = randomizer(0, domQuestionElements.allOp.length);
            if (r != indexOfCorrectAnswer && !indexNumbersToBeHidden.includes(r)) {
                indexNumbersToBeHidden.push(r);
                domQuestionElements.allOp[r].textContent = "";
                domQuestionElements.allOp[r].style.pointerEvents = "none";
                numberOfHidden++;
            }
        }
        super.setUsed(true);
    }
}
