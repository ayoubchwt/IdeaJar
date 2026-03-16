const ToggleStatsBtn = document.getElementById("toggle-stats");
const Stats = document.getElementById("content-stats");
const main = document.querySelector("main");
const prompts = document.getElementById("prompts");
ToggleStatsBtn.addEventListener("click", () => {
  Stats.classList.toggle("hidden");
  main.classList.toggle("main-expanded");
  prompts.classList.toggle("prompts-expanded");
});
