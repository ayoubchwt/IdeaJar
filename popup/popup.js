// buttons
const ToggleStatsButton = document.getElementById("toggle-stats");
const addButton = document.getElementById("add-button");
// components
const Stats = document.getElementById("content-stats");
const prompts = document.getElementById("prompts");
// pages
const homePage = document.getElementById("home-page");
const addPage = document.getElementById("add-page");
const editPage = document.getElementById("edit-page");
ToggleStatsButton.addEventListener("click", () => {
  Stats.classList.toggle("hidden");
  homePage.classList.toggle("home-page-expanded");
  prompts.classList.toggle("prompts-expanded");
});
addButton.addEventListener("click", () => {
  homePage.style.display = "none";
  addPage.style.display = "flex";
});
