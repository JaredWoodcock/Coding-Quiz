var currentQuestionIndex = 0;
var timer = document.getElementById('timer');
var time = 60;
var userScore = [];

var questions = [
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
    {
        question: "1",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
];


function startQuiz() {
    var homePage = document.getElementById("home-page");
    var questionContainer = document.getElementById("question-container");
    
    homePage.style.display = "none";
    questionContainer.style.display = "block"
    
    startTimer();
    showQuestion();
}

function startTimer() {
    var timer = setInterval(function() {
        var seconds = time % 60;

        timerElement.innerHTML = "Time: " + seconds.toString().padStart(2, "0");

        if (time <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        time--;
    }, 1000)
}

function showQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");
    var currentQuestion = questions[currentQuestionIndex];
    var optionsHTML = "";

    currentQuestion.options.forEach(function(option, index) {
        optionsHTML += `<button oneclick="checkAnswer(${index})">${option}</button>`;
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
        time -= 10; 
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

    questionContainer.style.display = "none";
    timerElement.style.display = "none";
    endPage.style.display = "block";
}

function submitScore(event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value;
    userScore.push({
        initials: initials,
        score: time
    });

    localStorage.setItem("userScore", JSON.stringify(userScore));
    redirectToLeaderboard();
}

function redirectToLeaderboard() {
    window.location.href = "leaderboard.html"
}