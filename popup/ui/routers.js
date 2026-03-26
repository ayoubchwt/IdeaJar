import { resetForms } from "./forms.js"
const homePage = document.getElementById("home-page");
const addPage = document.getElementById("add-page");
const editPage = document.getElementById("edit-page");

export const navigateToHome = () => {
    editPage.style.display = "none";
    addPage.style.display = "none";
    homePage.style.display = "flex";
    resetForms();
};
export const navigateToEdit = () => {
    homePage.style.display = "none";
    editPage.style.display = "flex";
};
export const navigateToAdd = () => {
    homePage.style.display = "none";
    addPage.style.display = "flex";
};