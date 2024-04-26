/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setThePlayer: () => (/* binding */ setThePlayer),\n/* harmony export */   setTheQuiz: () => (/* binding */ setTheQuiz),\n/* harmony export */   thePlayer: () => (/* binding */ thePlayer),\n/* harmony export */   theQuiz: () => (/* binding */ theQuiz)\n/* harmony export */ });\n/* harmony import */ var _ts_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ts/Player */ \"./src/ts/Player.ts\");\n/* harmony import */ var _ts_domPanels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ts/domPanels */ \"./src/ts/domPanels.ts\");\n/* harmony import */ var _ts_TheQuiz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ts/TheQuiz */ \"./src/ts/TheQuiz.ts\");\n/* harmony import */ var _ts_Controllers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ts/Controllers */ \"./src/ts/Controllers.ts\");\n\n\n\n\n//functions in order other ts files have access to reset the values \n//since imports are read only \nfunction setThePlayer(player) {\n    thePlayer = player;\n}\nfunction setTheQuiz(quiz) {\n    theQuiz = quiz;\n}\nlet thePlayer = new _ts_Player__WEBPACK_IMPORTED_MODULE_0__.Player(\"John\", 0);\nlet theQuiz = new _ts_TheQuiz__WEBPACK_IMPORTED_MODULE_2__.TheQuiz(thePlayer, 0, 1);\nfor (let e = 0; e < _ts_domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp.length; e++) {\n    _ts_domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp[e].parentElement.addEventListener('click', function () {\n        (0,_ts_Controllers__WEBPACK_IMPORTED_MODULE_3__.anOptionWasChosen)(e);\n    });\n}\n(0,_ts_Controllers__WEBPACK_IMPORTED_MODULE_3__.initializeQuizUi)();\n_ts_domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.resetPotentialAssistsModifications();\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/ts/Assist.ts":
/*!**************************!*\
  !*** ./src/ts/Assist.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Assist: () => (/* binding */ Assist),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Assist {\n    used;\n    description;\n    UIdescription;\n    constructor(used = false, description, UIdescription) {\n        this.used = used;\n        this.description = description;\n        this.UIdescription = UIdescription;\n    }\n    getUIdescription() {\n        return this.UIdescription;\n    }\n    getUsed() {\n        return this.used;\n    }\n    setUsed(b) {\n        this.used = b;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Assist);\n\n\n//# sourceURL=webpack:///./src/ts/Assist.ts?");

/***/ }),

/***/ "./src/ts/AssistFiftyFifty.ts":
/*!************************************!*\
  !*** ./src/ts/AssistFiftyFifty.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AssistFiftyFifty: () => (/* binding */ AssistFiftyFifty)\n/* harmony export */ });\n/* harmony import */ var _Assist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Assist */ \"./src/ts/Assist.ts\");\n/* harmony import */ var _domPanels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domPanels */ \"./src/ts/domPanels.ts\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app */ \"./src/app.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utilities */ \"./src/ts/Utilities.ts\");\n\n\n\n\nclass AssistFiftyFifty extends _Assist__WEBPACK_IMPORTED_MODULE_0__.Assist {\n    constructor() {\n        super(false, \"Hides 2 out of 4 incorrect options\", \"50-50\");\n    }\n    modifyTheQuiz() {\n        let indexOfCorrectAnswer;\n        let numberOfHidden = 0;\n        let indexNumbersToBeHidden = [];\n        for (let k = 0; k <= _domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp.length; k++) {\n            if (_domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp[k].textContent === _app__WEBPACK_IMPORTED_MODULE_2__.theQuiz.getCurrentCorrectAnswer()) {\n                indexOfCorrectAnswer = k;\n                break;\n            }\n        }\n        while (numberOfHidden < 2) {\n            let r = (0,_Utilities__WEBPACK_IMPORTED_MODULE_3__.randomizer)(0, _domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp.length);\n            if (r != indexOfCorrectAnswer && !indexNumbersToBeHidden.includes(r)) {\n                indexNumbersToBeHidden.push(r);\n                _domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp[r].textContent = \"\";\n                _domPanels__WEBPACK_IMPORTED_MODULE_1__.domQuestionElements.allOp[r].style.pointerEvents = \"none\";\n                numberOfHidden++;\n            }\n        }\n        super.setUsed(true);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ts/AssistFiftyFifty.ts?");

/***/ }),

/***/ "./src/ts/Controllers.ts":
/*!*******************************!*\
  !*** ./src/ts/Controllers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   anOptionWasChosen: () => (/* binding */ anOptionWasChosen),\n/* harmony export */   initializeQuizUi: () => (/* binding */ initializeQuizUi)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/ts/Player.ts\");\n/* harmony import */ var _Question__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Question */ \"./src/ts/Question.ts\");\n/* harmony import */ var _Stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stage */ \"./src/ts/Stage.ts\");\n/* harmony import */ var _domPanels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domPanels */ \"./src/ts/domPanels.ts\");\n/* harmony import */ var _TheQuiz__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TheQuiz */ \"./src/ts/TheQuiz.ts\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app */ \"./src/app.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utilities */ \"./src/ts/Utilities.ts\");\n\n\n\n\n\n\n\n\nconst theQuizUI = document.getElementById(\"theQuizUI\");\nconst restartTheGameBtn = document.getElementById(\"restartButton\");\nconst theVisibleResetBtn = document.getElementById(\"assistsUI__theVisibleResetBtn\");\nconst wonTheGameDiv = document.getElementById(\"wonTheGame\");\nlet isOnload = false;\nfunction loadInTheQuiz(path, startingIndexStage, endingIndexStage, dif) {\n    let indexesOfQuestionsUsed = [];\n    return fetch(path)\n        .then(response => { return response.json(); })\n        .then(questionsFetch => {\n        return fetch(\"./build/moneyBoard.json\")\n            .then(responsee => { return responsee.json(); })\n            .then(moneyBoardFetch => {\n            for (let i = startingIndexStage; i <= endingIndexStage; i++) {\n                let theRandom;\n                do {\n                    theRandom = (0,_Utilities__WEBPACK_IMPORTED_MODULE_6__.randomizer)(1, questionsFetch.length);\n                } while (indexesOfQuestionsUsed.indexOf(theRandom) !== -1);\n                indexesOfQuestionsUsed.push(theRandom);\n                let aQuestion = new _Question__WEBPACK_IMPORTED_MODULE_1__.Question(questionsFetch[theRandom].question, questionsFetch[theRandom].options, questionsFetch[theRandom].correctAnswer, 1);\n                let aStage = new _Stage__WEBPACK_IMPORTED_MODULE_2__.Stage(i, moneyBoardFetch[i], false, aQuestion);\n                _app__WEBPACK_IMPORTED_MODULE_5__.theQuiz.addStageToStagesBoard(i, aStage);\n            }\n        });\n    });\n}\nasync function initializeQuizUi() {\n    await loadInTheQuiz(\"./build/jsons/stageOnePartA.json\", 1, 2, 1);\n    await loadInTheQuiz(\"./build/jsons/stageOnePartB.json\", 3, 4, 2);\n    await loadInTheQuiz(\"./build/jsons/stageTwoPartA.json\", 5, 6, 3);\n    await loadInTheQuiz(\"./build/jsons/stageTwoPartB.json\", 7, 8, 4);\n    await loadInTheQuiz(\"./build/jsons/stageThreePartA.json\", 9, 10, 5);\n    await loadInTheQuiz(\"./build/jsons/stageThreePartB.json\", 11, 12, 6);\n    await loadInTheQuiz(\"./build/jsons/masters.json\", 13, 14, 7);\n    await loadInTheQuiz(\"./build/jsons/masterDrEfremidis.json\", 9, 15, 8);\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domAssistPanelElement.emptyAssistPanelElement(); //in Case of reset\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domAssistPanelElement.populateAssistPanelElement();\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domScorePanelElement.emptyScorePanelElement(); //in Case of reset\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domScorePanelElement.populateScorePanelElement();\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.resetClassesOfOptions();\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.populateQuestionDomElements();\n}\nfunction updateStage() {\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domScorePanelElement.updateScorePanelUiFocusToNextStage();\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.resetPotentialAssistsModifications();\n    _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.populateQuestionDomElements();\n}\nfunction wonTheGame() {\n    theQuizUI.parentElement.style.pointerEvents = \"none\";\n    theQuizUI.parentElement.classList.add(\"animationForWinning\");\n    setTimeout(function () {\n        theQuizUI.parentElement.style.display = \"none\";\n        wonTheGameDiv.style.display = \"flex\";\n        wonTheGameDiv.classList.add(\"animationForWinningOnWon\");\n    }, 5000);\n}\ntheVisibleResetBtn.addEventListener(\"click\", function () {\n    resetTheGame();\n});\nrestartTheGameBtn.addEventListener(\"click\", function () {\n    resetTheGame();\n});\nasync function resetTheGame() {\n    if (isOnload) {\n        return;\n    }\n    (0,_app__WEBPACK_IMPORTED_MODULE_5__.setThePlayer)(new _Player__WEBPACK_IMPORTED_MODULE_0__.Player(\"John\", 0));\n    (0,_app__WEBPACK_IMPORTED_MODULE_5__.setTheQuiz)(new _TheQuiz__WEBPACK_IMPORTED_MODULE_4__.TheQuiz(_app__WEBPACK_IMPORTED_MODULE_5__.thePlayer, 0, 1));\n    await initializeQuizUi();\n    wonTheGameDiv.style.display = \"none\";\n    wonTheGameDiv.classList.remove(\"animationForWinningOnWon\");\n    theQuizUI.parentElement.classList.remove(\"animationForWinning\");\n    theQuizUI.parentElement.style.pointerEvents = \"auto\";\n    theQuizUI.parentElement.style.display = \"flex\";\n}\nfunction showTheCorrectAnswer() {\n    for (let i = 0; i < _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.allOp.length; i++) {\n        if (_domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.allOp[i].textContent == _app__WEBPACK_IMPORTED_MODULE_5__.theQuiz.getCurrentCorrectAnswer()) {\n            _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.allOp[i].parentElement.classList.add(\"qAnswerWasCorrect\");\n        }\n    }\n}\nfunction anOptionWasChosen(index) {\n    if (isOnload) {\n        return;\n    }\n    isOnload = true;\n    let parentElement = _domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.allOp[index].parentElement;\n    parentElement.classList.add(\"qWaitForAnswer\");\n    if (_domPanels__WEBPACK_IMPORTED_MODULE_3__.domQuestionElements.allOp[index].textContent == _app__WEBPACK_IMPORTED_MODULE_5__.theQuiz.getCurrentCorrectAnswer()) {\n        setTimeout(function () {\n            parentElement.classList.remove(\"qWaitForAnswer\");\n            parentElement.classList.add(\"qAnswerWasCorrect\");\n            setTimeout(function () {\n                if (_app__WEBPACK_IMPORTED_MODULE_5__.theQuiz.getStageCounter() + 1 >= 16) {\n                    wonTheGame();\n                    isOnload = false;\n                    return;\n                }\n                _app__WEBPACK_IMPORTED_MODULE_5__.theQuiz.increaseStageCounter();\n                updateStage();\n                parentElement.classList.remove(\"qAnswerWasCorrect\");\n                isOnload = false;\n                console.log(_app__WEBPACK_IMPORTED_MODULE_5__.theQuiz.getCurrentCorrectAnswer());\n            }, 2000);\n        }, 3000);\n    }\n    else {\n        setTimeout(function () {\n            parentElement.classList.remove(\"qWaitForAnswer\");\n            parentElement.classList.add(\"qAnswerWasWrong\");\n            showTheCorrectAnswer();\n            isOnload = false;\n        }, 3000);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ts/Controllers.ts?");

/***/ }),

/***/ "./src/ts/Player.ts":
/*!**************************!*\
  !*** ./src/ts/Player.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    name;\n    moneyEarned;\n    constructor(name, moneyEarned) {\n        this.name = name;\n        this.moneyEarned = moneyEarned;\n    }\n    setName(name) {\n        this.name = name;\n    }\n    setMoneyEarned(moneyEarnedNum) {\n        this.moneyEarned = moneyEarnedNum;\n    }\n    getName() {\n        return this.name;\n    }\n    getMoneyEarned() {\n        return this.moneyEarned;\n    }\n    useAssist(theAssist) {\n        if (!theAssist.getUsed()) {\n            theAssist.modifyTheQuiz();\n        }\n    }\n    toString() {\n        return `Player name: ${this.name.toString()} holds so far ${this.moneyEarned}`;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ts/Player.ts?");

/***/ }),

/***/ "./src/ts/Question.ts":
/*!****************************!*\
  !*** ./src/ts/Question.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Question: () => (/* binding */ Question)\n/* harmony export */ });\nclass Question {\n    question;\n    options;\n    correctAnswer;\n    difficulty;\n    constructor(question, options, correctAnswer, difficulty) {\n        this.question = question;\n        this.options = options;\n        this.correctAnswer = correctAnswer;\n        this.difficulty = difficulty;\n    }\n    getTheQuestion() {\n        return this.question;\n    }\n    getTheCorrectAnswer() {\n        return this.correctAnswer;\n    }\n    getOption(index) {\n        return this.options[index];\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ts/Question.ts?");

/***/ }),

/***/ "./src/ts/Stage.ts":
/*!*************************!*\
  !*** ./src/ts/Stage.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Stage: () => (/* binding */ Stage)\n/* harmony export */ });\nclass Stage {\n    stageNumber;\n    stageTitle;\n    assistUsed;\n    question;\n    constructor(stageNumber, stageTitle, assistUsed, question) {\n        this.stageNumber = stageNumber;\n        this.stageTitle = stageTitle;\n        this.assistUsed = assistUsed;\n        this.question = question;\n    }\n    getStageNumber() {\n        return this.stageNumber;\n    }\n    getstageTitle() {\n        return this.stageTitle;\n    }\n    getQuestion() {\n        return this.question;\n    }\n    getAssistedUsed() {\n        return this.assistUsed;\n    }\n    setAssistedUsed(assistedYorN) {\n        this.assistUsed = assistedYorN;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ts/Stage.ts?");

/***/ }),

/***/ "./src/ts/TheQuiz.ts":
/*!***************************!*\
  !*** ./src/ts/TheQuiz.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TheQuiz: () => (/* binding */ TheQuiz)\n/* harmony export */ });\n/* harmony import */ var _AssistFiftyFifty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssistFiftyFifty */ \"./src/ts/AssistFiftyFifty.ts\");\n\nclass TheQuiz {\n    thePlayer;\n    timeSinceQuizStarted;\n    stageCounter = 0;\n    stagesBoard = {};\n    theAssists = {};\n    constructor(thePlayer, timeSinceQuizStarted, stageCounter) {\n        this.thePlayer = thePlayer;\n        this.timeSinceQuizStarted = timeSinceQuizStarted;\n        this.stageCounter = stageCounter;\n        let assistFiftyFifty = new _AssistFiftyFifty__WEBPACK_IMPORTED_MODULE_0__.AssistFiftyFifty();\n        this.theAssists.assistFiftyFifty = assistFiftyFifty;\n    }\n    setTimeSinceQuizStarted(timeSinceQuizStarted) {\n        this.timeSinceQuizStarted = timeSinceQuizStarted;\n    }\n    increaseStageCounter() {\n        this.stageCounter = this.stageCounter + 1;\n    }\n    resetStageCounter() {\n        this.stageCounter = 0;\n    }\n    addStageToStagesBoard(stageNumber, stage) {\n        this.stagesBoard[stageNumber] = stage;\n    }\n    getAllAssists() {\n        return this.theAssists;\n    }\n    getAnAssist(nameOfAssist) {\n        return this.theAssists[nameOfAssist];\n    }\n    getStagesBoard() {\n        return this.stagesBoard;\n    }\n    gettimeSinceQuizStarted() {\n        return this.timeSinceQuizStarted;\n    }\n    getStageCounter() {\n        return this.stageCounter;\n    }\n    getCurrentCorrectAnswer() {\n        return this.stagesBoard[this.stageCounter].getQuestion().getTheCorrectAnswer();\n    }\n    toString() {\n        return `timeSinceQuizStarted: ${this.timeSinceQuizStarted.toString()} with\r\n     stage ${this.stageCounter}\r\n     and the player being ${this.thePlayer.getName()}\r\n     `;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ts/TheQuiz.ts?");

/***/ }),

/***/ "./src/ts/Utilities.ts":
/*!*****************************!*\
  !*** ./src/ts/Utilities.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   randomizer: () => (/* binding */ randomizer)\n/* harmony export */ });\nfunction randomizer(min, max) {\n    return Math.floor((Math.random() * (max - min)) + min);\n}\n\n\n//# sourceURL=webpack:///./src/ts/Utilities.ts?");

/***/ }),

/***/ "./src/ts/domPanels.ts":
/*!*****************************!*\
  !*** ./src/ts/domPanels.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   domAssistPanelElement: () => (/* binding */ domAssistPanelElement),\n/* harmony export */   domQuestionElements: () => (/* binding */ domQuestionElements),\n/* harmony export */   domScorePanelElement: () => (/* binding */ domScorePanelElement)\n/* harmony export */ });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ \"./src/app.ts\");\n\nconst domAssistPanelElement = {\n    AssistBtnPanel: document.getElementById(\"assistsUI__Buttons\"),\n    populateAssistPanelElement() {\n        const assists = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getAllAssists();\n        for (const assist in assists) {\n            let daAssist = assists[assist];\n            const assistDiv = document.createElement(\"div\");\n            assistDiv.id = `assistD_${assist}`;\n            assistDiv.textContent = daAssist.getUIdescription();\n            assistDiv.className = \"assists\";\n            assistDiv.addEventListener(\"click\", function () {\n                _app__WEBPACK_IMPORTED_MODULE_0__.thePlayer.useAssist(daAssist);\n                if (daAssist.getUsed()) {\n                    assistDiv.classList.add(\"assistUsed\");\n                }\n            });\n            this.AssistBtnPanel.appendChild(assistDiv);\n        }\n    },\n    emptyAssistPanelElement() {\n        while (this.AssistBtnPanel.firstChild) {\n            this.AssistBtnPanel.removeChild(this.AssistBtnPanel.firstChild);\n        }\n    }\n};\nconst domScorePanelElement = {\n    scorePanel: document.getElementById(\"scorePanel\"),\n    emptyScorePanelElement() {\n        while (this.scorePanel.firstChild) {\n            this.scorePanel.removeChild(this.scorePanel.firstChild);\n        }\n    },\n    populateScorePanelElement() {\n        for (const s in _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()) {\n            const stageIndexDiv = document.createElement(\"div\");\n            stageIndexDiv.id = `n_${s}`;\n            stageIndexDiv.textContent = s;\n            stageIndexDiv.className = \"n1_BorderInitialColor\";\n            const stageAnsweredTickDiv = document.createElement(\"div\");\n            stageAnsweredTickDiv.id = `c_${s}`;\n            stageAnsweredTickDiv.className = \"stageAnsweredTick\";\n            stageAnsweredTickDiv.textContent = \"\";\n            const stageTitleDiv = document.createElement(\"div\");\n            stageTitleDiv.id = `m_${s}`;\n            stageTitleDiv.textContent = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()[s][\"stageTitle\"].toString();\n            stageTitleDiv.className = \"m1_BorderInitialProps\";\n            const stageDiv = document.createElement(\"div\");\n            stageDiv.id = `s_${s}`;\n            stageDiv.appendChild(stageIndexDiv);\n            stageDiv.appendChild(stageAnsweredTickDiv);\n            stageDiv.appendChild(stageTitleDiv);\n            // add orange background to the first one\n            if (s == \"1\") {\n                stageDiv.classList.add(\"curStageBackground\");\n                stageIndexDiv.classList.add(\"BorderRightColorCurrent\");\n            }\n            this.scorePanel.insertBefore(stageDiv, this.scorePanel.firstChild);\n        }\n        document.getElementById(\"m_1\").classList.add(\"curStageBackground\");\n    },\n    updateScorePanelUiFocusToNextStage() {\n        let sc = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStageCounter();\n        let prevStageDom = document.getElementById(`s_${sc - 1}`);\n        prevStageDom.classList.remove(\"curStageBackground\");\n        document.getElementById(`m_${sc - 1}`).classList.remove(\"curStageBackground\");\n        document.getElementById(`n_${sc - 1}`).classList.remove(\"BorderRightColorCurrent\");\n        prevStageDom.classList.add(\"previousStageBackground\");\n        document.getElementById(`m_${sc - 1}`).classList.add(\"previousStageBackground\");\n        document.getElementById(`n_${sc - 1}`).classList.add(\"BorderRightColorPrevious\");\n        prevStageDom.querySelector(\".stageAnsweredTick\").textContent = \"*\";\n        let curStageDom = document.getElementById(`s_${sc}`);\n        curStageDom.classList.add(\"curStageBackground\");\n        document.getElementById(`m_${sc}`).classList.add(\"curStageBackground\");\n        document.getElementById(`n_${sc}`).classList.add(\"BorderRightColorCurrent\");\n    }\n};\nconst domQuestionElements = {\n    theQuestion: document.getElementById(\"theQuestion\"),\n    theOpA: document.getElementById(\"theOptions__AB__A__text\"),\n    theOpB: document.getElementById(\"theOptions__AB__B__text\"),\n    theOpC: document.getElementById(\"theOptions__CD__C__text\"),\n    theOpD: document.getElementById(\"theOptions__CD__D__text\"),\n    allOp: document.getElementsByClassName(\"qOptionText\"),\n    // as HTMLCollectionOf<HTMLElement>\n    resetClassesOfOptions() {\n        for (let i = 0; i < this.allOp.length; i++) {\n            if (this.allOp[i].parentElement.classList.contains(\"qAnswerWasCorrect\")) {\n                this.allOp[i].parentElement?.classList.remove(\"qAnswerWasCorrect\");\n            }\n            if (this.allOp[i].parentElement.classList.contains(\"qWaitForAnswer\")) {\n                this.allOp[i].parentElement?.classList.remove(\"qWaitForAnswer\");\n            }\n            if (this.allOp[i].parentElement.classList.contains(\"qAnswerWasWrong\")) {\n                this.allOp[i].parentElement?.classList.remove(\"qAnswerWasWrong\");\n            }\n        }\n    },\n    populateQuestionDomElements() {\n        let sc = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStageCounter();\n        this.theQuestion.textContent = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()[sc].getQuestion().getTheQuestion();\n        //trying with json type...array instead of methods\n        this.theOpA.textContent = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()[sc][\"question\"][\"options\"][0];\n        this.theOpB.textContent = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()[sc][\"question\"][\"options\"][1];\n        this.theOpC.textContent = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()[sc][\"question\"][\"options\"][2];\n        this.theOpD.textContent = _app__WEBPACK_IMPORTED_MODULE_0__.theQuiz.getStagesBoard()[sc][\"question\"][\"options\"][3];\n    },\n    resetPotentialAssistsModifications() {\n        // Convert HTMLCollection to array\n        const optionsArray = Array.from(this.allOp);\n        for (const p of optionsArray) {\n            // Reset 50-50 assist\n            p.style.pointerEvents = \"auto\";\n        }\n    }\n};\n\n\n//# sourceURL=webpack:///./src/ts/domPanels.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;