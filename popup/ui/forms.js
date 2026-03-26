import { Idea } from "../../model/Idea.js";
import { navigateToHome } from "./routers.js"
import * as ideaService from "../../service/IdeaService.js"
import { validateIdea } from "../../utils/validators.js";
import { refreshIdeas } from "./list.js";
import { showConfirmModal, showInfoModal } from "./modals.js";
const addFrom = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");

const addTitleError = document.getElementById("add-title-error");
const addBodyError = document.getElementById("add-body-error");

const editTitleError = document.getElementById("edit-title-error");
const editBodyError = document.getElementById("edit-body-error");

const addFormTitle = document.getElementById("add-form-title-input");
const addFormBody = document.getElementById("add-form-body-input");
const addFormFavorite = document.getElementById("add-form-favorite-input");

const editFormTitle = document.getElementById("edit-form-title-input");
const editFormBody = document.getElementById("edit-form-body-input");
const editFormFavorite = document.getElementById("edit-form-favorite-input");

const createButton = document.getElementById("create-button");
const saveButton = document.getElementById("save-button");
const cancelButtons = document.querySelectorAll(".cancel-button");

let ideaState = null;

export const setIdea = (idea) => {
    ideaState = idea;
    
    editFormTitle.value = idea.title;
    editFormBody.value = idea.body;
    editFormFavorite.checked = idea.isFavorite
}

export const resetForms = () => {
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
// create
export const initializeForms = () => {
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
    cancelButtons.forEach((button) => {
        button.addEventListener("click", () => {
            navigateToHome();
        });
    });
}
