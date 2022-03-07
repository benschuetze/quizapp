let questions = [
    {
        "question": "Seit wann beobachten die Menschen das Wetter systematisch?",
        "answer_1": "bereits seit der Steinzeit",
        "answer_2": "seit dem 4. Jahrhundert vor Christus",
        "answer_3": "seit Ende des 17. Jahrhunderts",
        "answer_4": "seit der Neuzeit (etwa seit 1500)",
        "right_answer": 4
    },
    {
        "question": "Womit misst man die Luftfeuchtigkeit?",
        "answer_1": "Thermometer",
        "answer_2": "Niederschlagsmesser",
        "answer_3": "Hygrometer",
        "answer_4": "Barometer",
        "right_answer": 3
    },
    {
        "question": "Es liegen sechs Sekunden zwischen Blitz und Donner. Wie weit ist das Gewitter entfernt?",
        "answer_1": "Sechs Kilometer",
        "answer_2": "Zwei Kilometer",
        "answer_3": "500 Meter",
        "answer_4": "Es ist direkt über einem.",
        "right_answer": 2
    },
    {
        "question": "Wann spricht man von einer Tropennacht?",
        "answer_1": "wenn in der Nacht besonders viele Mücken unterwegs sind",
        "answer_2": "wenn die Nacht in den Tropen verbracht wird",
        "answer_3": "wenn die Temperatur nachts nicht unter 25°C fällt",
        "answer_4": "wenn die Temperatur nachts nicht unter 20°C fällt",
        "right_answer": 4
    },
    {
        "question": "Worauf müssen wir uns einstellen, wenn am Himmel die Cumulonimbuswolke zu sehen ist?",
        "answer_1": "Es wird ein schweres Unwetter kommen.",
        "answer_2": "Es ist mit einer Kältefront zu rechnen.",
        "answer_3": "Eine Warmfront ist auf dem Weg zu uns.",
        "answer_4": "Das Wetter bleibt beständig.",
        "right_answer": 1
    },
    {
        "question": "Wo auf der Erde gibt es keine Jahrezeiten?",
        "answer_1": "im Norden von Skandinavien",
        "answer_2": "in Australien",
        "answer_3": "in Südafrika",
        "answer_4": "am Äquator",
        "right_answer": 4
    },
    {
        "question": "Wo tritt das Wetterphänomen El Niño auf?",
        "answer_1": "im Pazifik vor Peru und Ecuador",
        "answer_2": "im Atlantik vor Portugal",
        "answer_3": "im Indischen Ozean vor Südafrika",
        "answer_4": "im Mittelmeer vor Spanien",
        "right_answer": 1
    },
    {
        "question": "Wie wird die gesamte Witterung einer Region über mehrere Jahre oder Jahrzehnte genannt?",
        "answer_1": "Monsune",
        "answer_2": "Klima",
        "answer_3": "Troposphäre",
        "answer_4": "Makrowetter",
        "right_answer": 2
    },
];

let currentQuestion = 0;
let correctAnswers = 0;
let submitted = false;

function init() {
    let nrOfQ = document.getElementById('nr-of-q');
    nrOfQ.innerHTML = '';
    nrOfQ.innerHTML = questions.length;
    showQuestion();
    showTime();
}

function showQuestion() {
    let question = questions[currentQuestion];
    let q = document.getElementById('q');
    let qIndex = document.getElementById('q-index');
    let a1 = document.getElementById('answer_1');
    let a2 = document.getElementById('answer_2');
    let a3 = document.getElementById('answer_3');
    let a4 = document.getElementById('answer_4');
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    if (currentQuestion >= questions.length) {
        document.getElementById('end-screen').style.display = '';
        document.getElementById('q-body').style.display = 'none';
        document.getElementById('correct-answers').innerHTML = `${correctAnswers}`;
        document.getElementById('nr-of-q-endscreen').innerHTML = `${questions.length}`;
        document.getElementById('restart').style = '';
        document.getElementById('next').style = 'display: none';
    } else {
        q.innerHTML = questionHTML(question);
        a1.innerHTML = a1HTML(question);
        a2.innerHTML = a2HTML(question);
        a3.innerHTML = a3HTML(question);
        a4.innerHTML = a4HTML(question);
        qIndex.innerHTML = '';
        qIndex.innerHTML = currentQuestion + 1;
        document.getElementById('progress-bar').innerHTML = `${percent}%`;
        document.getElementById('progress-bar').style = `width: ${percent}%`;
        showTime();
        //timer();
    }
}

function buttonDNone() {
    document.getElementById('next').style.display = 'none';
}

function questionHTML(question) {
    return /*html*/ `${question['question']}`
}

function a1HTML(question) {
    return /*html*/ `${question['answer_1']}`
}

function a2HTML(question) {
    return /*html*/ `${question['answer_2']}`
}

function a3HTML(question) {
    return /*html*/ `${question['answer_3']}`
}

function a4HTML(question) {
    return /*html*/ `${question['answer_4']}`
}

function showTime() {
    var sec = 10; //set time limit
    var time = setInterval(myTimer, 1000); //every second the method myTimer gets called
    document.getElementById('timer').style.display = '';
    function myTimer() {
        document.getElementById('timer').innerHTML = sec; 
        sec--; 
        if (sec == -1) {
            submitAnswer(`answer_${questions[currentQuestion]['right_answer']}`);
            clearInterval(time);
            document.getElementById('timer').style.display = 'none';
        }
    }
}

function submitAnswer(selection) {
    let question = questions[currentQuestion]; // current question
    let selectedAnswerNumber = selection.slice(-1); // select last digit of 'selection'
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    document.getElementById('timer').style.display = 'none';
    if (selectedAnswerNumber == question['right_answer']) { // check, if last digit of 'selection' is equalt to 'question' at the key 'right_answer'
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightAnswer();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function rightAnswer() {
    correctAnswers++;
}

function restartGame() {
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('q-body').style.display = '';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('next').style.display = '';
    init();
    showTime();
}