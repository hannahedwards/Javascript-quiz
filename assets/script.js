var startButton = document.querySelector(".start-button");
var questionsEL = document.querySelector(".questions");
var answersEL = document.querySelector(".answers");
var currentQuestion = 0;
var rightAnswers = 0;
var submitButton;
var questions = { //stores all questions that will be asked as well as the right answer
    'Commonly used data types DO NOT include: ': ['1: Strings', '2: Booleans', '3: Alerts', '4: Numbers', 2],
    'The condition in an if/else statement is enclosed with ______: ': ['1: Quotes', '2: Curly Brackets', '3: Parenthesis', '4: Square Brackets', 2],
    'Arrays in JavaScript can be used to store ______:': ['1: Numbers and Strings', '2: Other arrays', '3: Booleans', '4: all of the above', 3],
    'String values must be inclosed with _______ when being assigned to variables: ': ['1: Commas', '2: Curly Brackets', '3: Quotes', '4: Parenthesis', 2],
    'A very useful tool used during development and debugging for printing content to the debugger is: ': ['1: JavaScript', '2: Terminal/Bash', '3: For Loops', '4: Console.log', 3],
};

function pullQuestion(currentQuestion) {//adds questions to page
    var question = Object.keys(questions)[currentQuestion];
    questionsEL.innerHTML = '';
    questionsEL.innerHTML = question;
};

function pullAnswers(currentQuestion) { //finds the answer
    var answers = questions[Object.keys(questions)[currentQuestion]];
    answersEL.innerHTML = '';
    for (var i = 0; i < answers.length - 1; i += 1) {
        var createButton = document.createElement('button'),
            text = document.createTextNode(answers[i]);
        createButton.appendChild(text);
        createButton.addEventListener("click", checkAnswer(i, answers));
        answersEL.appendChild(createButton);
    }
};

function checkAnswer(i, arr) {//docks time if answered wrong
    return function () {
        var inputAnswer = i,
            correctAnswer = arr[arr.length - 1];
        if (inputAnswer === correctAnswer) {
            rightAnswers += 1;
        } else {
            timerCount = timerCount - 5;
        }
        if (question < Object.keys(questions).length - 1) {
            question += 1;
            pullQuestion(question);
            pullAnswers(question);
        } else {
            answersEL.innerHTML = '';
            allDone();
        }
    };
};

var timerEl = document.querySelector(".timer");
function score() {
    location.reload();
}
function allDone() {//finishes out the test and gets your score and initals
    var inputEL = document.createElement("input");
    var inputElLabel = document.createElement("label");
    submitButton = document.createElement("button");
    inputElLabel.setAttribute("for", inputEL);
    submitButton.textContent = "Submit";
    inputElLabel.textContent = " Add your initials: ";
    inputEL.type = "text";
    timerCount = 0;
    timerEl.textContent = timerCount;
    clearInterval(timer);
    questionsEL.textContent = "all done!";
    answersEL.textContent = "Finishing score is: " + rightAnswers;
    answersEL.appendChild(inputElLabel);
    answersEL.appendChild(inputEL);
    answersEL.appendChild(submitButton);
    submitButton.addEventListener("click", score);
}

var timer;
var timerCount;
function startTimer() {
    timerCount = 60;
    timerEl.textContent = timerCount;
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            startButton.disabled = true;
        }
    }, 1000);
};

function startTest() {//
    question = 0;
    document.getElementById("start-button").style.visibility = "hidden";
    startTimer();
    pullQuestion(question);
    pullAnswers(question);
};

function init() {//and finally your test is triggered to start here!
    startButton.addEventListener("click", startTest);
};
init();