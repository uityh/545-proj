import { getAllStudyForms, createStudyForm } from "./api.js";

async function loadStudyForms() {
    const studyForms = await getAllStudyForms();
    studyForms.forEach((studyForm) => {
        addCard(studyForm);
    });
}

loadStudyForms();

document.getElementById("add-btn").addEventListener("click", async () => {
    const studyFormName = prompt("Enter the name of this study plan");
    if (studyFormName) {
        const newStudyForm = {
            name: studyFormName,
            dateCreated: new Date().toISOString().split("T")[0],
            semester: "Fall 2023",
        };
        const result = await createStudyForm(newStudyForm);
        addCard(result);
    }
});

function addCard(studyForm) {
    const cardContainer = document.querySelector(".card-container");
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <h3>${studyForm.name}</h3>
        <p>Date created: ${studyForm.dateCreated}</p>
        <p>Semester: ${studyForm.semester}</p>
        <a class="delete" title="Delete" data-toggle="tooltip">
            <i class="material-icons">&#xE872;</i>
        </a>
    `;
    cardContainer.appendChild(card);
}

function updateHeader() {
    if (localStorage.getItem("loggedIn")) {
        document.getElementById("user-message").style.display = "block";
    }
}

updateHeader(); // Call the function on page load
