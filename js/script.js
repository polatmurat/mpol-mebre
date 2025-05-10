const questions = [
    {
        id: 1,
        questionText: "Aşağıdakilerden hangisi arkaplan rengi vermek için kullanılan CSS property'sidir?",
        choices: {
            "A": "transition: all ease .3s;",
            "B": "border-radius: 7px;",
            "C": "background-color: #000;"
        },
        answer: 'C'
    },
    {
        id: 2,
        questionText: "Hangisi ekran üzerinde görünen imleci tıklanabilir bir el olarak göstertmeye yarar?",
        choices: {
            "A": "margin-bottom: 10px;",
            "B": "cursor: pointer;",
            "C": "text-align: center;"
        },
        answer: 'B'
    },
    {
        id: 3,
        questionText: "Aşağıdakilerden hangisi javascript'te parametre olarak verilen ifadenin, üzerinde kullanıldığı veri içerisinde bulunup bulunmadığını kontrol eder?",
        choices: {
            "A": ".replace(parameter)",
            "B": ".indexOf(parameter)",
            "C": ".includes(parameter)"
        },
        answer: 'C'
    }
];


function loadQuestion(questionNumber = 0) {    

    const questionContainer = document.querySelector("#questionContainer");    

    if (questions.length <= 0) {
        questionContainer.classList.add("flex", "items-center", "justify-center");
        questionContainer.innerHTML = 'Gösterilecek soru bulunamadı.'
        return;
    }

    questionContainer.querySelector("#questionIndex").innerHTML = `Soru ${questions[questionNumber].id}`
    questionContainer.querySelector("#questionText").innerHTML = questions[questionNumber].questionText;
    questionContainer.querySelector("#choiceA").innerHTML = "A) " + questions[questionNumber].choices.A;
    questionContainer.querySelector("#choiceB").innerHTML = "B) " + questions[questionNumber].choices.B;
    questionContainer.querySelector("#choiceC").innerHTML = "C) " + questions[questionNumber].choices.C;

}


function nextQuestion() {
    const questionContainer = document.querySelector("#questionContainer");
    const questionNumber = parseInt(questionContainer.getAttribute("questionNumber"));
    if(questionNumber < questions.length - 1) {
        questionContainer.setAttribute("questionNumber", questionNumber + 1);
        loadQuestion(questionNumber + 1);
    }

    if(questionNumber == questions.length - 2) {
        document.querySelector("#next").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed!")
    }

    document.querySelector("#previous").classList.remove("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed!")
    

}


function previousQuestion() {
    document.querySelector("#next").classList.remove("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed!")
    const questionContainer = document.querySelector("#questionContainer");
    const questionNumber = parseInt(questionContainer.getAttribute("questionNumber"));


    if(questionNumber >= 1) {
        loadQuestion(questionNumber - 1);
        questionContainer.setAttribute("questionNumber", questionNumber - 1);
    }

    if(questionNumber == 1) {
        document.querySelector("#previous").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed!");
    }
}



loadQuestion()
