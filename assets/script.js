var currentQuestionIndex = 0;
// var timer = document.getElementById('timer');
var timerInterval;
var timeSeconds = 59;
var userScore = [];

var questions = [
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 0
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 0
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 0
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 0
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 0
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 0
    },
];

function viewHighScores() {
    window.location.href = "leaderboard.html"
}

function startQuiz() {
    var homePage = document.getElementById("home-page");
    var questionContainer = document.getElementById("question-container");
    
    homePage.style.display = "none";
    questionContainer.style.display = "block"
    
    startTimer();
    showQuestion();
}

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

function showQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");
    var currentQuestion = questions[currentQuestionIndex];
    var optionsHTML = "";

    currentQuestion.options.forEach(function(option, index) {
        optionsHTML += `<button onclick="checkAnswer(${index})">${option}</button>`;
    });

    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = optionsHTML;
    document.getElementById("result").innerText = "";
}

function checkAnswer(userAnswer) {
    var currentQuestion = questions[currentQuestionIndex];
    var resultElement = document.getElementById("result");

    if (userAnswer === currentQuestion.answer) {
        resultElement.innerText = "Correct Answer!";
    } else {
        resultElement.innerText = "Incorrect :("
        timeSeconds -= 10; 
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        endQuiz()
    }
}

function endQuiz() {
    var questionContainer = document.getElementById("question-container");
    var endPage = document.getElementById("end-page");
    var timerElement = document.getElementById("timer");

    questionContainer.style.display = "none";
    timerElement.style.display = "none";
    endPage.style.display = "block";
}

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

function redirectToLeaderboard() {
    window.location.href = "leaderboard.html"
}



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


function returnToHome() {
    window.location.href = "index.html";
}