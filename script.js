// Page Navigation

const buttons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const targetPage = button.getAttribute("data-page");


        // Hide all pages
        pages.forEach(page => {

            page.classList.remove("active");

        });


        // Show selected page
        const selectedPage = document.getElementById(targetPage);

        if(selectedPage){

            selectedPage.classList.add("active");

        }


        // Update active button
        buttons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


    });

});




// Hamburger Menu

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");


if(menuButton && sideMenu){

    menuButton.addEventListener("click", () => {

        sideMenu.classList.toggle("open");

    });

}



// Close menu when selecting a page

buttons.forEach(button => {

    button.addEventListener("click", () => {

        if(sideMenu){

            sideMenu.classList.remove("open");

        }

    });

});




// AI Tutor Demo

function askMentora(){

    const question = document.getElementById("questionBox").value;

    const response = document.getElementById("responseArea");


    if(question === ""){

        response.innerHTML =
        "<div class='message'>Please ask me a question first.</div>";

        return;

    }


    response.innerHTML =
    "<div class='message'>Great question! Let me break that down step by step for you.</div>";

}
