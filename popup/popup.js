import * as promptService from "../service/PromptService.js";
import { Prompt } from "../model/prompts.js";
// buttons
const ToggleStatsButton = document.getElementById("toggle-stats");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const cancelButtons = document.querySelectorAll(".cancel-button");
const createButton = document.getElementById("create-button");
const saveButton = document.getElementById("save-button");
// inputs
const addFormTitle = document.getElementById("add-form-title-input");
const addFormBody = document.getElementById("add-form-body-input");
const addFormFavorite = document.getElementById("add-form-favorite-input");
// components
const stats = document.getElementById("content-stats");
const prompts = document.getElementById("prompts");
const promptParagraphs = document.querySelectorAll(".paragraph");
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
// saving toggle status
const saveToggleStatus = () => {
  const isHidden = stats.classList.contains("hidden");
  localStorage.setItem("IdeaJar_Stats_Hidden", isHidden);
};
//
const validateInputs = () => {};
// events handling
document.addEventListener("DOMContentLoaded", () => {
  const isHidden = localStorage.getItem("IdeaJar_Stats_Hidden");
  if (isHidden === "true") {
    stats.classList.add("hidden");
    homePage.classList.add("home-page-expanded");
    prompts.classList.add("prompts-expanded");
    promptParagraphs.forEach((paragraph) => {
      paragraph.classList.add("paragraph-expanded");
    });
  }
  // enabling animation after everything loads
  setTimeout(() => {
    document.body.classList.remove("preload");
  }, 50);
});
ToggleStatsButton.addEventListener("click", () => {
  stats.classList.toggle("hidden");
  saveToggleStatus();
  homePage.classList.toggle("home-page-expanded");
  prompts.classList.toggle("prompts-expanded");
  promptParagraphs.forEach((paragraph) => {
    paragraph.classList.toggle("paragraph-expanded");
  });
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
createButton.addEventListener("click", (e) => {
  e.preventDefault();
  const prompt = new Prompt(title.value, body.value, favorite.isChecked);
  promptService.add();
  navigateToHome();
});
saveButton.addEventListener("click", () => {
  // editing logic will be done here
  navigateToHome();
});
