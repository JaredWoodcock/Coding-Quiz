var currentQuestionIndex = 0;
var timerInterval;
var timeSeconds = 59;
var userScore = [];

// This variable contains all of the questions, along with the options and the correct answer
var questions = [
    {
        question: "What is one of the core technologies of the World Wide Web, alongside HTML and CSS?",
        options: ["JavaScript", "HTML", "CSS", "The DOM"],
        answer: 0
    },
    {
        question: "In simple terms, what is JavaScript used for?",
        options: ["Adds in all of the colors that you see on a web page", "Allows you to see all of the words on a web page", "Helps you add in all pictures to a web page", "A scripting language for creating dynamic web page content"],
        answer: 3
    },
    {
        question: "What is the correct way to create a function in JavaScript?",
        options: ["function = nameOfFunction() {}", "function nameOfFunction() {}", "function() = nameOfFunction {}", "function() nameOfFunction {}"],
        answer: 1
    },
    {
        question: "Which of these is NOT a JavaScript data type?",
        options: ["Number", "Boolean", "Word", "String"],
        answer: 2
    },
    {
        question: "Which method is used to append a child element to a parent element in the DOM in JavaScript?",
        options: ["addElement()", "createElement()", "childAppend()", "appendChild()"],
        answer: 3
    },
];

// This function is tied to the View High Scores button and takes you to the leaderboard html
function viewHighScores() {
    window.location.href = "leaderboard.html"
}

var viewHighScoresbutton = document.getElementById("view-high-scores");

// This function is called when the Start Quiz button is clicked. It also calls the functions of startTimer, which starts the timer, and showQuestion, which brings you to the first question. 
function startQuiz() {
    var homePage = document.getElementById("home-page");
    var questionContainer = document.getElementById("question-container");
    
    homePage.style.display = "none";
    viewHighScoresbutton.style.display = "none";
    questionContainer.style.display = "block"
    
    startTimer();
    showQuestion();
}


// This function starts the timer, displays it, and the if function says that if timer reaches 0, calls the endQuiz function and clears the timer. 
function startTimer() {
    var timerElement = document.getElementById("timer");
    timerInterval = setInterval(function() {
        var seconds = timeSeconds % 60;

        timerElement.innerHTML = "Time Remaining: " + seconds.toString().padStart(2, "0") + " seconds";

        if (timeSeconds <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        timeSeconds--;
    }, 1000)
}

// This function shows the questions and pulls from the HTML div elements. 
function showQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");
    var currentQuestion = questions[currentQuestionIndex];
    var optionsHTML = "";

    currentQuestion.options.forEach(function(option, index) {
        optionsHTML += `<li><button onclick="checkAnswer(${index})">${option}</button></li>`;
    });

    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = optionsHTML;
    document.getElementById("result").innerText = "";
}


// This is the function that checks the answer to the question, and displays the corresponding text below the options depending on the user's answer. Also, the if function checks for the amount of questions left, and if there's none left, the endQuiz function is called. 
function checkAnswer(userAnswer) {
    var currentQuestion = questions[currentQuestionIndex];
    var resultElement = document.getElementById("result");

    if (userAnswer === currentQuestion.answer) {
        resultElement.innerText = "Correct Answer!";
    } else {
        resultElement.innerText = "Incorrect :("
        timeSeconds -= 5; 
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        endQuiz()
    }
}

// This function hides the question container and timer, stops the timer, and shows the end page, which is where initials are entered. 
function endQuiz() {
    var questionContainer = document.getElementById("question-container");
    var endPage = document.getElementById("end-page");
    var timerElement = document.getElementById("timer");

    clearInterval(timerInterval)

    questionContainer.style.display = "none";
    timerElement.style.display = "none";
    endPage.style.display = "block";
}


// This function stores the initials onto the leaderboard HTML in the local storage, and also calls the redirectToLeaderboard function. 
function submitScore(event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value;
    var score = timeSeconds;
    var existingScores = JSON.parse(localStorage.getItem("userScore")) || [];
    existingScores.push({initials: initials, score: score});
    existingScores.sort((a,b) => b.score - a.score);
    
    localStorage.setItem("userScore", JSON.stringify(existingScores));
    redirectToLeaderboard();
}


// This function takes you to the leaderboard HTML. 
function redirectToLeaderboard() {
    window.location.href = "leaderboard.html"
}


// The below code is what puts the leaderboard in a ranked order based on the results of the user's quiz. 
var highScores = JSON.parse(localStorage.getItem("userScore")) || [];
var highScoresElement = document.getElementById("high-scores");
var scoresHTML = "<ol>";

var displayScores = highScores.slice(0,5);

displayScores.sort((a,b) => b.score - a.score)

for (var i = 0; i < displayScores.length; i++) {
    scoresHTML += "<li>" + displayScores[i].initials + ": " + displayScores[i].score + " seconds" + "</li>";
}
scoresHTML += "</ol>";
highScoresElement.innerHTML = scoresHTML;

//This function is tied to the Return to Home button on the leaderboards HTML, and takes you back to the main page on the index.html
function returnToHome() {
    window.location.href = "index.html";
}