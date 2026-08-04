// ================================
// Mentora AI Version 3
// script.js
// ================================

function askMentora() {

    const question = document.getElementById("questionBox").value.trim();
    const response = document.getElementById("responseArea");

    if (question === "") {
        response.innerHTML =
        "<div class='message'>⚠️ Please type a math question first.</div>";
        return;
    }

    let answer = "";

    const q = question.toLowerCase();

    if (q.includes("2+2")) {
        answer = "2 + 2 = 4.";
    }
    else if (q.includes("3x + 4 = 16")) {
        answer = "Subtract 4 from both sides to get 3x = 12. Then divide both sides by 3. x = 4.";
    }
    else if (q.includes("5x")) {
        answer = "Let's isolate the variable by moving constants to the other side, then divide by the coefficient.";
    }
    else {
        answer = "Great question! In the future, Mentora AI will generate a personalized step-by-step explanation for this problem.";
    }

    response.innerHTML = `
        <div class="message">
            <strong>You asked:</strong><br>
            ${question}
        </div>

        <div class="message">
            <strong>Mentora AI:</strong><br>
            ${answer}
        </div>
    `;

    document.getElementById("questionBox").value = "";
}

// Allow pressing Enter to submit
document.addEventListener("DOMContentLoaded", function () {

    const box = document.getElementById("questionBox");

    if (box) {
        box.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {
                askMentora();
            }

        });
    }

});

// Simple welcome message
console.log("Welcome to Mentora AI!");
