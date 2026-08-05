function askMentora() {

    let question = document.getElementById("questionBox").value;

    let responseArea = document.getElementById("responseArea");


    if (question.trim() === "") {

        responseArea.innerHTML = `
        <div class="message">
        Please enter a question first.
        </div>
        `;

        return;
    }


    responseArea.innerHTML = `

    <div class="message">
    Student: ${question}
    </div>


    <div class="message">
    Mentora AI:
    Great question! Let's work through this step-by-step.

    First, identify what information we know.
    Then determine what we need to solve.

    I'm here to guide you, not just give you the answer.
    </div>

    `;

}
