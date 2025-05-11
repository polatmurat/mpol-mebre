const questions = [
    {
        id: 1,
        questionText: "Aşağıdakilerden hangisi arkaplan rengi vermek için kullanılan CSS property'sidir?",
        choices: {
            "A": "transition: all ease .3s;",
            "B": "border-radius: 7px;",
            "C": "background-color: #000;"
        },
        answer: 'C',
        point: 25
    },
    {
        id: 2,
        questionText: "Hangisi ekran üzerinde görünen imleci tıklanabilir bir el olarak göstertmeye yarar?",
        choices: {
            "A": "margin-bottom: 10px;",
            "B": "cursor: pointer;",
            "C": "text-align: center;"
        },
        answer: 'B',
        point: 25
    },
    {
        id: 3,
        questionText: "Aşağıdakilerden hangisi javascript'te parametre olarak verilen ifadenin, üzerinde kullanıldığı veri içerisinde bulunup bulunmadığını kontrol eder?",
        choices: {
            "A": ".replace(parameter)",
            "B": ".indexOf(parameter)",
            "C": ".includes(parameter)"
        },
        answer: 'C',
        point: 25
    },
        {
        id: 4,
        questionText: "Geri sayım yapıldıktan sonra çalışmasını istediğimiz, ve çalıştıktan sonra işlem yapmasının önüne geçtiğimiz bir yapıyı aşağıdakilerden hangisiyle kurabiliriz?",
        choices: {
            "A": "setUrl()",
            "B": "setTimeout()",
            "C": "setInterval"
        },
        answer: 'B',
        point: 25
    }
];

const choiceA = document.querySelector("#choiceA");
const choiceB = document.querySelector("#choiceB");
const choiceC = document.querySelector("#choiceC");
let points = 0;
const answeredQIndexes = new Set();

function loadQuestion(questionNumber = 0) {    

    const questionContainer = document.querySelector("#questionContainer");


    if (questions.length <= 0) {
        questionContainer.classList.add("flex", "items-center", "justify-center");
        questionContainer.innerHTML = 'Gösterilecek soru bulunamadı.'
        return;
    }

    questionContainer.querySelector("#questionIndex").innerHTML = `Soru ${questions[questionNumber].id}`
    questionContainer.querySelector("#questionText").innerHTML = questions[questionNumber].questionText;
    choiceA.innerHTML = "A) " + questions[questionNumber].choices.A;
    choiceB.innerHTML = "B) " + questions[questionNumber].choices.B;
    choiceC.innerHTML = "C) " + questions[questionNumber].choices.C;

    updateNavigationButtons()

}

function checkAnswer(choice) {
    const questionNumber = parseInt(document.querySelector("#questionContainer").getAttribute("questionNumber"));
    const isCorrect = questions[questionNumber].answer === choice;

    if(!answeredQIndexes.has(questionNumber)) {
        if(isCorrect) {
            points += parseInt(questions[questionNumber].point);
        }
        answeredQIndexes.add(questionNumber);
    } else {
        console.log("Bu soru zaten cevaplanmıştı");
    }

    if(questionNumber == questions.length - 1) {
        document.querySelector("#result").innerHTML = "Tebrikler, quiz bitti. Güncel puanınız : " + `<span class='font-bold text-green-800'>${points}</span>`;
        document.querySelector("#result").classList.add("mb-4", "text-lg", "text-center", "border", "px-5", "py-2.5");
    }

    choiceA.classList.remove("hover:bg-gray-200")
    choiceB.classList.remove("hover:bg-gray-200")
    choiceC.classList.remove("hover:bg-gray-200")


    if(choice.toUpperCase() === 'A') {
        if(isCorrect) {
            choiceA.classList.add("bg-green-800", "text-white");
        } else {
            choiceA.classList.add("bg-red-800", "text-white");
        }
        choiceB.classList.add("cursor-not-allowed!");
        choiceB.disabled = true;
        choiceC.classList.add("cursor-not-allowed!");
        choiceC.disabled = true;
    }
    
    if(choice.toUpperCase() == 'B') {
        if(isCorrect) {
            choiceB.classList.add("bg-green-800", "text-white");
        } else {
            choiceB.classList.add("bg-red-800", "text-white");
        }
        choiceB.classList.add("bg-green-800", "text-white")
        choiceA.classList.add("cursor-not-allowed!");
        choiceA.disabled = true;
        choiceC.classList.add("cursor-not-allowed!");
        choiceC.disabled = true;

    }

    if(choice.toUpperCase() == 'C') {
        if(isCorrect) {
            choiceC.classList.add("bg-green-800", "text-white");
        } else {
            choiceC.classList.add("bg-red-800", "text-white");
        }
        choiceC.classList.add("bg-green-800", "text-white")
        choiceA.classList.add("cursor-not-allowed!");
        choiceA.disabled = true;
        choiceB.classList.add("cursor-not-allowed!");
        choiceB.disabled = true;
    }

    // setTimeout(() => {
    //     nextQuestion();
    // }, 3000);
}

function updateNavigationButtons() {
    const questionContainer = document.querySelector("#questionContainer");
    const questionNumber = parseInt(questionContainer.getAttribute("questionNumber"));

    if(questionNumber <= 0 || answeredQIndexes.has(questionNumber - 1)) {
        document.querySelector("#previous").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#previous").disabled = true;
    } else {
        document.querySelector("#previous").classList.remove("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#previous").disabled = false;
    }

    if(questionNumber >= questions.length - 1) {
        document.querySelector("#next").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#next").disabled = true;
    } else {
        document.querySelector("#next").classList.remove("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#next").disabled = false; 
    }

}

function nextQuestion() {

    choiceA.classList.remove("bg-green-800", "text-white", "bg-red-800", "cursor-not-allowed!");
    choiceB.classList.remove("bg-green-800", "text-white", "bg-red-800", "cursor-not-allowed!");
    choiceC.classList.remove("bg-green-800", "text-white", "bg-red-800", "cursor-not-allowed!");

    choiceA.disabled = false;
    choiceB.disabled = false;
    choiceC.disabled = false;

    const questionContainer = document.querySelector("#questionContainer");
    const questionNumber = parseInt(questionContainer.getAttribute("questionNumber"));    

    console.log(questionNumber);
    console.log(answeredQIndexes);

    if(questionNumber <= 1 || answeredQIndexes.has(questionNumber)) {            
        document.querySelector("#previous").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#previous").disabled = true;        
    } else {
        document.querySelector("#previous").classList.remove("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#previous").disabled = false;        
    }

    if(questionNumber < questions.length - 1) {
        questionContainer.setAttribute("questionNumber", questionNumber + 1);
        loadQuestion(questionNumber + 1);
    }

    if(questionNumber == questions.length - 2) {
        document.querySelector("#next").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed")
        document.querySelector("#next").disabled = true;
    }    
}

function previousQuestion() {

    const questionContainer = document.querySelector("#questionContainer");
    const questionNumber = parseInt(questionContainer.getAttribute("questionNumber"));

    const prevQuestionIndex = questionNumber - 1;
    
    if(questionNumber >= 1 && !answeredQIndexes.has(prevQuestionIndex)) {
        loadQuestion(prevQuestionIndex);
        questionContainer.setAttribute("questionNumber", prevQuestionIndex);
    }

    if(questionNumber <= 1 || answeredQIndexes.has(questionNumber - 1)) {
        document.querySelector("#previous").classList.add("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
        document.querySelector("#previous").disabled = true;
    }

    document.querySelector("#next").classList.remove("border-gray-200", "bg-gray-200", "text-gray-600", "cursor-not-allowed");
    document.querySelector("#next").disabled = false;
}


loadQuestion()
