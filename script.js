// ---------- Page Navigation ----------

const buttons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");
const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");

function showPage(targetPage) {
    pages.forEach(page => page.classList.remove("active"));

    const selectedPage = document.getElementById(targetPage);
    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    buttons.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-page") === targetPage);
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const targetPage = button.getAttribute("data-page");
        if (targetPage) {
            showPage(targetPage);
        }
        closeMenu();
    });
});


// ---------- Hamburger Menu ----------

function closeMenu() {
    if (sideMenu) {
        sideMenu.classList.remove("open");
    }
}

if (menuButton && sideMenu) {
    menuButton.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
    });

    // Tap anywhere outside the menu to close it
    document.addEventListener("click", (e) => {
        const clickedMenu = sideMenu.contains(e.target);
        const clickedButton = menuButton.contains(e.target);
        if (!clickedMenu && !clickedButton) {
            closeMenu();
        }
    });
}


// ---------- Login State ----------

// Hide the hamburger until we know the visitor is logged in
if (menuButton) {
    menuButton.style.display = "none";
}

function showLoggedOut() {
    // Show a Log in button where the hamburger would be
    if (!menuButton) return;
    const loginBtn = document.createElement("button");
    loginBtn.className = "hamburger";
    loginBtn.textContent = "Log in";
    loginBtn.addEventListener("click", () => {
        window.location.href = "/signin";
    });
    menuButton.insertAdjacentElement("afterend", loginBtn);
}

function showLoggedIn() {
    if (menuButton) {
        menuButton.style.display = "";
    }

    // Turn the menu's "Log in" button into "Log out"
    const menuButtons = sideMenu ? sideMenu.querySelectorAll("button") : [];
    menuButtons.forEach(btn => {
        if (btn.textContent.trim() === "Log in") {
            btn.textContent = "Log out";
            btn.onclick = async () => {
                await fetch("/logout", { method: "POST" });
                window.location.href = "/";
            };
        }
    });

    // Start Learning now goes to the dashboard
    const startBtn = document.querySelector(".primary-button");
    if (startBtn) {
        startBtn.onclick = () => showPage("dashboard");
    }
}

fetch("/me")
    .then(res => {
        if (res.ok) {
            showLoggedIn();
        } else {
            showLoggedOut();
        }
    })
    .catch(() => showLoggedOut());


// ---------- AI Tutor Demo ----------

function askMentora() {
    const question = document.getElementById("questionBox").value;
    const response = document.getElementById("responseArea");

    if (question === "") {
        response.innerHTML =
            "<div class='message'>Please ask me a question first.</div>";
        return;
    }

    response.innerHTML =
        "<div class='message'>Great question! Let me break that