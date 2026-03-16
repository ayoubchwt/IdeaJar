const ToggleStatsBtn = document.getElementById("toggle-stats");
const Stats = document.getElementById("content-stats");
const homePage = document.getElementById("home-page");
const prompts = document.getElementById("prompts");
const addButton = document.getElementById("add-button");
const addForm = document.getElementById("add-form");
const editFrom = document.getElementById("edit-form");
ToggleStatsBtn.addEventListener("click", () => {
  Stats.classList.toggle("hidden");
  homePage.classList.toggle("home-page-expanded");
  prompts.classList.toggle("prompts-expanded");
});
addButton.addEventListener("click", () => {
  homePage.style.display = "none";
  addForm.style.display = "flex";
});
