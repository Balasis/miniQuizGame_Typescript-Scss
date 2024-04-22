export class Stage {
    stageNumber;
    stageTitle;
    assistUsed;
    question;
    constructor(stageNumber, stageTitle, assistUsed, question) {
        this.stageNumber = stageNumber;
        this.stageTitle = stageTitle;
        this.assistUsed = assistUsed;
        this.question = question;
    }
    getStageNumber() {
        return this.stageNumber;
    }
    getstageTitle() {
        return this.stageTitle;
    }
    getQuestion() {
        return this.question;
    }
    getAssistedUsed() {
        return this.assistUsed;
    }
    setAssistedUsed(assistedYorN) {
        this.assistUsed = assistedYorN;
    }
}
