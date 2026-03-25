import * as ideaService from "../../service/IdeaService.js";
import * as searchUtils from "../../utils/filters.js";
import { renderIdeaList } from "../../utils/renderers.js";
import { copyToClipboard } from "../../utils/helpers.js";
import { showConfirmModal } from "./modals.js";
import { navigateToEdit, navigateToAdd } from "./routers.js";
import { setIdea } from "./forms.js";

const ideas = document.getElementById("ideas");
const searchInput = document.getElementById("search-input");
const allOption = document.getElementById("all-option");
const favoriteOption = document.getElementById("favorite-option");
const addButton = document.getElementById("add-button");
const stats = document.getElementById("content-stats");
const ideaNumberOutput = document.getElementById("idea-number-output");
const favoriteNumberOutput = document.getElementById("favorite-number-output");

let favoriteState = false;

export const refreshIdeas = async () => {
    ideaNumberOutput.innerText = await ideaService.getIdeasNumber();
    favoriteNumberOutput.innerText = await ideaService.getFavoriteIdeasNumber();

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

export const initializeList = () => {
    addButton.addEventListener("click", navigateToAdd);

    searchInput.addEventListener("input", refreshIdeas);

    allOption.addEventListener("click", () => {
        favoriteState = false;
        refreshIdeas();
    });

    favoriteOption.addEventListener("click", () => {
        favoriteState = true;
        refreshIdeas();
    });

    ideas.addEventListener("click", async (e) => {
        const copyButton = e.target.closest(".copy-button");
        if (copyButton) {
            const ideaState = await ideaService.getById(copyButton.id);
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
            const ideaState = await ideaService.getById(editButton.id);
            setIdea(ideaState);
            navigateToEdit();
        }

        const deleteButton = e.target.closest(".delete-button");
        if (deleteButton) {
            const ideaState = await ideaService.getById(deleteButton.id);
            const confirmed = await showConfirmModal("Are you sure you want to delete this idea?");
            if (confirmed) {
                await ideaService.remove(ideaState);
                await refreshIdeas();
            }
        }

        const favoriteButton = e.target.closest(".favorite-button");
        if (favoriteButton) {
            const ideaState = await ideaService.getById(favoriteButton.id);
            await ideaService.toggleFavorite(ideaState);
            await refreshIdeas();
        }

        const useButton = e.target.closest(".use-button");
        if (useButton) {
            const ideaState = await ideaService.getById(useButton.id);
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.id) {
                chrome.tabs.sendMessage(tab.id, { action: "inject-idea", text: ideaState.body });
                window.close();
            }
        }
    });
};