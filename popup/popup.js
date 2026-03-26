import * as themeService from "../service/themeService.js";
import { initializeThemes, applyTheme } from "./ui/themes.js";
import { initializeLayout, applyInitialLayout } from "./ui/layout.js";
import { initializeList, refreshIdeas } from "./ui/list.js";
import { initializeForms } from "./ui/forms.js";
import { initializeBackups } from "./ui/backup.js";

document.addEventListener("DOMContentLoaded", async () => {
  // theme setup
  const savedTheme = await themeService.getTheme();
  await applyTheme(savedTheme);
  initializeThemes();

  // stats layout / ideas layout
  await applyInitialLayout();
  initializeLayout();

  // backup suff 
  initializeBackups();

  // list (search filter clicks ext)
  initializeList();

  // add and edit forms
  initializeForms();

  // render the initial data on the screen
  await refreshIdeas();

  // enable animation after everything loads
  setTimeout(() => {
    document.body.classList.remove("preload");
  }, 50);
});