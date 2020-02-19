var baseURL = 'https://spreadsheets.google.com/feeds/cells/19myfA_LHx4m120PixgI8tFmBVRI4A03nRxoyr9llifU/1/public/full?alt=json';
fetch(baseURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        let faqDiv = document.getElementById("faq-campus-unpaz");

        let questions = [];
        let answers = [];

        myJson.feed.entry.forEach(element => {
            if (element.title.$t.startsWith("A") && element.gs$cell.row > 1)
                questions.push(element.content.$t);
            else if (element.title.$t.startsWith("B") && element.gs$cell.row > 1)
                answers.push(element.content.$t);
        });

        if (questions.length == answers.length) {
            faqDiv.classList.remove("lfrias-preloader");
            for (let i = 0; i < questions.length; i++)
                faqDiv.appendChild(createFaqDiv(questions[i], answers[i]));
        }
    });

function createFaqDiv(question, answer) {
    let questionContainer = document.createElement("div");
    questionContainer.setAttribute("style", "margin-bottom:10px;");

    let questionBtn = document.createElement("button");
    questionBtn.classList.add("lfrias-faq-collapsible");
    questionBtn.addEventListener("click", function () {
        if (!isVisible(this.nextElementSibling) && !this.classList.contains("lfrias-faq-active")) {
            let activeQuestionsBtns = document.getElementsByClassName("lfrias-faq-active");

            if (activeQuestionsBtns.length > 0) {
                for (let index = 0; index < activeQuestionsBtns.length; index++) {
                    hideElement(activeQuestionsBtns.item(index).nextElementSibling);
                    activeQuestionsBtns.item(index).classList.remove("lfrias-faq-active");
                }
            }
            showElement(this.nextElementSibling);
            this.classList.add("lfrias-faq-active");
        }else{
            hideElement(this.nextElementSibling);
            this.classList.remove("lfrias-faq-active");
        }

    });
    questionBtn.appendChild(document.createTextNode(question))

    let answerDiv = document.createElement("div");
    answerDiv.classList.add("lfrias-faq-content");
    let answerText = document.createElement("p");
    answerText.innerHTML = answer;
    answerDiv.appendChild(answerText);


    questionContainer.appendChild(questionBtn);
    questionContainer.appendChild(answerDiv);

    return questionContainer;
}

function hideElement(element) {
    if (element.style.maxHeight) {
        element.style.maxHeight = null;
    }
}

function showElement(element) {
    element.style.maxHeight = element.scrollHeight + "px";
}

function isVisible(element) {
    return element.style.maxHeight
}