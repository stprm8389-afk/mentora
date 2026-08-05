// Mentora AI Application Script


// Page Navigation System

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");


function showPage(pageId) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage = document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    navButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.page === pageId) {

            button.classList.add("active");

        }

    });

}



navButtons.forEach(button => {


    button.addEventListener("click", function() {


        const page = this.dataset.page;


        showPage(page);


    });


});



// Start on Home page

showPage("home");

// Mentora AI Tutor Demo


function askMentora() {


    const question = document.getElementById("questionBox").value;

    const responseArea = document.getElementById("responseArea");



    if (question.trim() === "") {

        responseArea.innerHTML = `
        <div class="message">
        Please enter a question so I can help you learn.
        </div>
        `;

        return;

    }



    let response = "";



    if (question.includes("3x") || question.includes("equation")) {


        response = `
        Step 1: Start with the equation.

        3x + 4 = 16

        Step 2: Subtract 4 from both sides.

        3x = 12

        Step 3: Divide both sides by 3.

        x = 4

        Great job! Keep practicing.
        `;


    } else {


        response = `
        I can help you understand:

        • Mathematics
        • Science
        • English
        • History
        • Computer Science
        • Life Skills

        Try asking me a specific question!
        `;

    }



    responseArea.innerHTML = `

    <div class="message">

    ${response}

    </div>

    `;


}
// Add smooth page transitions

pages.forEach(page => {

    page.style.transition = "opacity 0.3s ease";

});
// Hamburger Menu

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");


if (menuButton && sideMenu) {

    menuButton.addEventListener("click", () => {

        sideMenu.classList.toggle("open");

    });

}


// Close menu after selecting a page

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (sideMenu) {

            sideMenu.classList.remove("open");

        }

    });

});
