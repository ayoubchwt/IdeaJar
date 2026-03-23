import * as ideaService from "../service/IdeaService.js";
import * as backupService from "../service/backupService.js";
import * as themeService from "../service/themeService.js"
import { Idea } from "../model/Idea.js";
import { renderIdeaList } from "../utils/renderers.js";
import { validateIdea } from "../utils/validators.js";
import * as searchUtils from "../utils/filters.js";
import { copyToClipboard } from "../utils/helpers.js";

// buttons
const ToggleStatsButton = document.getElementById("toggle-stats");
const addButton = document.getElementById("add-button");
const cancelButtons = document.querySelectorAll(".cancel-button");
const createButton = document.getElementById("create-button");
const saveButton = document.getElementById("save-button");
const confirmActionButton = document.getElementById("confirm-action");
const cancelActionButton = document.getElementById("cancel-action");

const allOption = document.getElementById("all-option");
const favoriteOption = document.getElementById("favorite-option");

const confirmInfoButton = document.getElementById("confirm-info");

const importOption = document.getElementById("import-option");
const exportOption = document.getElementById("export-option");
const cleanOption = document.getElementById("clean-option");
// inputs
const addFormTitle = document.getElementById("add-form-title-input");
const addFormBody = document.getElementById("add-form-body-input");
const addFormFavorite = document.getElementById("add-form-favorite-input");

const editFormTitle = document.getElementById("edit-form-title-input");
const editFormBody = document.getElementById("edit-form-body-input");
const editFormFavorite = document.getElementById("edit-form-favorite-input");

const searchInput = document.getElementById("search-input");

const importInput = document.getElementById("import-input");
// errors
const addTitleError = document.getElementById("add-title-error");
const addBodyError = document.getElementById("add-body-error");
const editTitleError = document.getElementById("edit-title-error");
const editBodyError = document.getElementById("edit-body-error");
// components
const stats = document.getElementById("content-stats");
const ideas = document.getElementById("ideas");
const addFrom = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const confirmModal = document.getElementById("confirm-modal");
const infoModal = document.getElementById("info-modal");
const ideaNumberOutput = document.getElementById("idea-number-output");
const favoriteNumberOutput = document.getElementById("favorite-number-output");
const exportStatusOuput = document.getElementById("export-status-ouput");
const themeOptions = document.querySelectorAll(".theme-option");
// pages
const homePage = document.getElementById("home-page");
const addPage = document.getElementById("add-page");
const editPage = document.getElementById("edit-page");
// routing
const navigateToHome = () => {
  editPage.style.display = "none";
  addPage.style.display = "none";
  homePage.style.display = "flex";
  resetForms();
};
const resetForms = () => {
  editForm.reset();
  addFrom.reset();
  resetFormsErrors();
};
const resetFormsErrors = () => {
  addTitleError.classList.remove("error-visible");
  addBodyError.classList.remove("error-visible");
  editTitleError.classList.remove("error-visible");
  editBodyError.classList.remove("error-visible");
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
let ideaState = "";
let favoriteState = false;
// saving toggle status
const saveToggleStatus = () => {
  const isHidden = stats.classList.contains("hidden");
  localStorage.setItem("IdeaJar_Stats_Hidden", isHidden);
};
// refreshing ideas
const refreshIdeas = async () => {
  ideaNumberOutput.innerText = await ideaService.getIdeasNumber();
  favoriteNumberOutput.innerText = await ideaService.getFavoriteIdeasNumber();
  exportStatusOuput.innerHTML = await backupService.getExportDate();
  const allIdeas = await ideaService.getAll();
  let list = searchUtils.search(allIdeas, searchInput.value);
  if (favoriteState) {
    list = searchUtils.favoriteFilter(list);
  }
  list = searchUtils.sort(list);
  renderIdeaList(ideas, list, searchInput.value, favoriteState);
  if (stats.classList.contains("hidden")) {
    const ideaParagraphs = document.querySelectorAll(".paragraph");
    ideaParagraphs.forEach((paragraph) => {
      paragraph.classList.add("paragraph-expanded");
    });
  }
};
// confirmation
const showConfirmModal = (message) => {
  confirmModal.querySelector("p").innerText = message;
  confirmModal.style.display = "flex";

  return new Promise((resolve) => {
    confirmActionButton.onclick = () => {
      confirmModal.style.display = "none";
      resolve(true);
    };
    cancelActionButton.onclick = () => {
      confirmModal.style.display = "none";
      resolve(false);
    };
  });
};
const showInfoModal = (title, body, buttonText) => {
  infoModal.querySelector("h3").innerText = title;
  infoModal.querySelector("p").innerText = body;
  infoModal.querySelector("button").innerText = buttonText;
  infoModal.style.display = "flex";
  return new Promise((resolve) => {
    confirmInfoButton.onclick = () => {
      infoModal.style.display = "none";
      resolve(true);
    };
  });
}
// events handling
document.addEventListener("DOMContentLoaded", async () => {
  const savedTheme = await themeService.getTheme();
  await applyTheme(savedTheme);
  await refreshIdeas();
  const isHidden = localStorage.getItem("IdeaJar_Stats_Hidden");
  if (isHidden === "true") {
    stats.classList.add("hidden");
    homePage.classList.add("home-page-expanded");
    ideas.classList.add("ideas-expanded");
    const ideaParagraphs = document.querySelectorAll(".paragraph"); // putted this here cuz the new paragaphs are not getting detected
    ideaParagraphs.forEach((paragraph) => {
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
  ideas.classList.toggle("ideas-expanded");
  const ideaParagraphs = document.querySelectorAll(".paragraph"); // putted this here cuz the new paragaphs are not getting detected
  ideaParagraphs.forEach((paragraph) => {
    paragraph.classList.toggle("paragraph-expanded");
  });
});

addButton.addEventListener("click", () => {
  navigateToAdd();
});

cancelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navigateToHome();
  });
});

// card actions
ideas.addEventListener("click", async (e) => {
  const copyButton = e.target.closest(".copy-button");
  if (copyButton) {
    ideaState = await ideaService.getById(copyButton.id);
    const isCopied = await copyToClipboard(ideaState.body);
    if (isCopied) {
      const originalHtml = copyButton.innerHTML;
      copyButton.classList.add(".copy-button-expanded");
      copyButton.innerHTML = "Copied !";
      setTimeout(() => {
        copyButton.classList.remove(".copy-button-expanded");
        copyButton.innerHTML = originalHtml;
      }, 2000);
    }
  }
  const editButton = e.target.closest(".edit-button");
  if (editButton) {
    ideaState = await ideaService.getById(editButton.id);
    editFormTitle.value = ideaState.title;
    editFormBody.value = ideaState.body;
    editFormFavorite.checked = ideaState.isFavorite;
    navigateToEdit();
  }
  const deleteButton = e.target.closest(".delete-button");
  if (deleteButton) {
    ideaState = await ideaService.getById(deleteButton.id);
    const confirmed = await showConfirmModal(
      "Are you sure you want to delete this idea?",
    );
    if (confirmed) {
      await ideaService.remove(ideaState);
      await refreshIdeas();
    }
  }
  const favoriteButton = e.target.closest(".favorite-button");
  if (favoriteButton) {
    ideaState = await ideaService.getById(favoriteButton.id);
    await ideaService.toggleFavorite(ideaState);
    refreshIdeas();
  }
  const useButton = e.target.closest(".use-button");
  if (useButton) {
    ideaState = await ideaService.getById(useButton.id);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab && tab.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: "inject-idea",
        text: ideaState.body,
      });
      window.close();
    }
  }
});
// create
createButton.addEventListener("click", async (e) => {
  e.preventDefault();
  resetFormsErrors();
  const title = addFormTitle.value;
  const body = addFormBody.value;
  const errors = validateIdea(title, body);
  if (errors.isValid) {
    const idea = new Idea(title, body, addFormFavorite.checked);
    await ideaService.add(idea);
    await refreshIdeas();
    navigateToHome();
    showInfoModal("Idea Added", "Your new idea has been saved.", "done");
  } else {
    if (errors.hasTitleError) {
      addTitleError.classList.add("error-visible");
    }
    if (errors.hasBodyError) {
      addBodyError.classList.add("error-visible");
    }
  }
});
// save
saveButton.addEventListener("click", async (e) => {
  e.preventDefault();
  resetFormsErrors();
  const title = editFormTitle.value;
  const body = editFormBody.value;
  const errors = validateIdea(title, body);
  if (errors.isValid) {
    ideaState.title = title;
    ideaState.body = body;
    ideaState.isFavorite = editFormFavorite.checked;

    const confirmed = await showConfirmModal(
      "Are you sure you want to update this idea?",
    );
    if (confirmed) {
      await ideaService.update(ideaState);
      refreshIdeas();
      navigateToHome();
    }
  } else {
    if (errors.hasTitleError) {
      editTitleError.classList.add("error-visible");
    }
    if (errors.hasBodyError) {
      editBodyError.classList.add("error-visible");
    }
  }
});
searchInput.addEventListener("input", async () => {
  const searchInputValue = searchInput.value;
  let allIdeas = await ideaService.getAll();
  if (favoriteState) {
    allIdeas = searchUtils.favoriteFilter(allIdeas);
  }
  let filteredIdeas = searchUtils.search(allIdeas, searchInputValue);
  filteredIdeas = searchUtils.sort(filteredIdeas);
  renderIdeaList(ideas, filteredIdeas, searchInputValue, favoriteState);
  if (stats.classList.contains("hidden")) {
    const ideaParagraphs = document.querySelectorAll(".paragraph");
    ideaParagraphs.forEach((paragraph) => {
      paragraph.classList.add("paragraph-expanded");
    });
  }
});
allOption.addEventListener("click", () => {
  favoriteState = false;
  refreshIdeas();
});
favoriteOption.addEventListener("click", () => {
  favoriteState = true;
  refreshIdeas();
});
exportOption.addEventListener("click", async () => {
  await backupService.exportDatabase();
  exportStatusOuput.innerText = await backupService.getExportDate();
});
importOption.addEventListener("click", async () => {
  importInput.click();
});
importInput.addEventListener("change", async (e) => {
  const dataFile = e.target.files[0];
  if (!dataFile) return
  const response = await backupService.importDatabase(dataFile);
  if (response) {
    refreshIdeas();
    showInfoModal("Import successful", "Your ideas have been imported successfully.", "done");
  }
  else {
    showInfoModal("Import failed", "We couldn't import your file. Please make sure it's a valid backup.", "Try Again");
  }
});
cleanOption.addEventListener("click", async () => {
  const confirmed = await showConfirmModal(
    "Are you sure you want to delete all your ideas?",
  );
  if (confirmed) {
    await ideaService.removeAll();
    await backupService.cleanMetadata();
    refreshIdeas();
  }
});
themeOptions.forEach(option => {
  option.addEventListener("click", async () => {
    const selectedTheme = option.dataset.theme;
    await applyTheme(selectedTheme);
  });
});
const applyTheme = async (themeName) => {
  document.documentElement.className = "";
  if (themeName && themeName !== "eclipse")
    document.documentElement.classList.add(themeName);
  await themeService.setTheme(themeName);
}