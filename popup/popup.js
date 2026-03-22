import * as ideaService from "../service/IdeaService.js";
import { Idea } from "../model/Idea.js";
import { renderIdeaList } from "../utils/renderers.js";
import { validateIdea } from "../utils/validators.js";
import * as searchUtils from "../utils/filters.js";
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
// inputs
const addFormTitle = document.getElementById("add-form-title-input");
const addFormBody = document.getElementById("add-form-body-input");
const addFormFavorite = document.getElementById("add-form-favorite-input");

const editFormTitle = document.getElementById("edit-form-title-input");
const editFormBody = document.getElementById("edit-form-body-input");
const editFormFavorite = document.getElementById("edit-form-favorite-input");

const searchInput = document.getElementById("search-input");
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
const modal = document.getElementById("confirm-modal");
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
// validators (later on)
const validateInputs = () => { };
// refreshing ideas
const refreshIdeas = async () => {
  const allIdeas = await ideaService.getAll();
  let list = searchUtils.search(allIdeas, searchInput.value);
  if (favoriteState) {
    list = searchUtils.favoriteFilter(list);
  }
  renderIdeaList(ideas, list, searchInput.value, favoriteState);
  if (stats.classList.contains("hidden")) {
    const ideaParagraphs = document.querySelectorAll(".paragraph");
    ideaParagraphs.forEach((paragraph) => {
      paragraph.classList.add("paragraph-expanded");
    });
  }
};
// confirmation
const showConfirm = (message) => {
  modal.querySelector("p").innerText = message;
  modal.style.display = "flex";

  return new Promise((resolve) => {
    confirmActionButton.onclick = () => {
      modal.style.display = "none";
      resolve(true);
    };
    cancelActionButton.onclick = () => {
      modal.style.display = "none";
      resolve(false);
    };
  });
};
// events handling
document.addEventListener("DOMContentLoaded", async () => {
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
  const editButton = e.target.closest(".edit-button");
  if (editButton) {
    ideaState = await ideaService.getById(editButton.id);
    editFormTitle.value = ideaState.title;
    editFormBody.value = ideaState.body;
    editFormFavorite.checked = ideaState.isFavourite;
    navigateToEdit();
  }
  const deleteButton = e.target.closest(".delete-button");
  if (deleteButton) {
    ideaState = await ideaService.getById(deleteButton.id);
    const confirmed = await showConfirm(
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
    ideaState.isFavorite = !ideaState.isFavorite;
    await ideaService.update(ideaState);
    refreshIdeas();
  }
  const useButton = e.target.closest(".use-button");
  if (useButton) {
    //console.log("use button id : ", useButton.id);
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
    ideaState.isFavourite = editFormFavorite.checked;

    const confirmed = await showConfirm(
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
  const filteredIdeas = searchUtils.search(allIdeas, searchInputValue);
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