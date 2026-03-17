// buttons
const ToggleStatsButton = document.getElementById("toggle-stats");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const cancelButtons = document.querySelectorAll(".cancel-button");
const createButton = document.getElementById("create-button");
const saveButton = document.getElementById("save-button");
// components
const Stats = document.getElementById("content-stats");
const prompts = document.getElementById("prompts");
const promptParagraph = document.getElementById("paragraph");
const addFrom = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
// pages
const homePage = document.getElementById("home-page");
const addPage = document.getElementById("add-page");
const editPage = document.getElementById("edit-page");
// routing
const navigateToHome = () => {
  editPage.style.display = "none";
  addPage.style.display = "none";
  editForm.reset();
  addFrom.reset();
  homePage.style.display = "flex";
};
const navigateToEdit = () => {
  homePage.style.display = "none";
  editPage.style.display = "flex";
};
const navigateToAdd = () => {
  homePage.style.display = "none";
  addPage.style.display = "flex";
};
// events handling
ToggleStatsButton.addEventListener("click", () => {
  Stats.classList.toggle("hidden");
  homePage.classList.toggle("home-page-expanded");
  prompts.classList.toggle("prompts-expanded");
  promptParagraph.classList.toggle("paragraph-expanded");
});
addButton.addEventListener("click", () => {
  navigateToAdd();
});
editButton.addEventListener("click", () => {
  navigateToEdit();
});
cancelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navigateToHome();
  });
});
createButton.addEventListener("click", () => {
  // adding logic will be done here
  navigateToHome();
});
saveButton.addEventListener("click", () => {
  // editing logic will be done here
  navigateToHome();
});
