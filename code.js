var baseURL = 'https://spreadsheets.google.com/feeds/cells/19myfA_LHx4m120PixgI8tFmBVRI4A03nRxoyr9llifU/1/public/full?alt=json';
fetch(baseURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        var faqDiv = document.getElementById("faq-campus-unpaz");

        var questions = [];
        var answers = [];

        myJson.feed.entry.forEach(element => {
            if (element.title.$t.startsWith("A") && element.gs$cell.row > 1)
                questions.push(element.content.$t);
            else if (element.title.$t.startsWith("B") && element.gs$cell.row > 1)
                answers.push(element.content.$t);
        });

        if (questions.length == answers.length) {
            for (let index = 0; index < questions.length; index++) {
                var questionContainer = document.createElement("div");
                questionContainer.setAttribute("style", "margin-bottom:1%;");

                var questionBtn = document.createElement("button");
                questionBtn.classList.add("lfrias-faq-collapsible");
                questionBtn.addEventListener("click", function () {
                    this.classList.toggle("lfrias-faq-active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
                questionBtn.appendChild(document.createTextNode(questions[index]))

                var answerDiv = document.createElement("div");
                answerDiv.classList.add("lfrias-faq-content");
                var answerText = document.createElement("p");
                answerText.innerHTML = answers[index]
                answerDiv.appendChild(answerText);


                questionContainer.appendChild(questionBtn);
                questionContainer.appendChild(answerDiv);

                faqDiv.appendChild(questionContainer);

            }
        }
    });