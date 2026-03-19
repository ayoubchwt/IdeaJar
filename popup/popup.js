import * as promptService from "../service/PromptService.js";
import { Prompt } from "../model/prompts.js";
import { renderPromptList } from "../utils/renderers.js";
// buttons
const ToggleStatsButton = document.getElementById("toggle-stats");
const addButton = document.getElementById("add-button");
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
// states
let promptState = "";
// saving toggle status
const saveToggleStatus = () => {
  const isHidden = stats.classList.contains("hidden");
  localStorage.setItem("IdeaJar_Stats_Hidden", isHidden);
};
// validators (later on)
const validateInputs = () => {};
// refreshing prompts
const refreshPrompts = async () => {
  const list = await promptService.getAll();
  renderPromptList(prompts, list);
};
// events handling
document.addEventListener("DOMContentLoaded", async () => {
  await refreshPrompts();
  const isHidden = localStorage.getItem("IdeaJar_Stats_Hidden");
  if (isHidden === "true") {
    stats.classList.add("hidden");
    homePage.classList.add("home-page-expanded");
    prompts.classList.add("prompts-expanded");
    const promptParagraphs = document.querySelectorAll(".paragraph"); // putted this here cuz the new paragaphs are not getting detected
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
  const promptParagraphs = document.querySelectorAll(".paragraph"); // putted this here cuz the new paragaphs are not getting detected
  promptParagraphs.forEach((paragraph) => {
    paragraph.classList.toggle("paragraph-expanded");
  });
});
addButton.addEventListener("click", () => {
  navigateToAdd();
});
// delete and update
prompts.addEventListener("click", (e) => {
  const editButton = e.target.closest(".edit-button");
  if (editButton) {
    promptState = editButton.id;
    console.log("id to edit: ", promptState);
    navigateToEdit();
  }
  const deleteButton = e.target.closest(".delete-button");
  if (deleteButton) {
    promptState = deleteButton.id;
    console.log("id to delete: ", promptState);
  }
});
cancelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navigateToHome();
  });
});
// create
createButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const prompt = new Prompt(
    addFormTitle.value,
    addFormBody.value,
    addFormFavorite.checked,
  );
  await promptService.add(prompt);
  await refreshPrompts();
  navigateToHome();
});
saveButton.addEventListener("click", () => {
  // editing logic will be done here
  navigateToHome();
});
