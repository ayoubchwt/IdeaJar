import * as layoutService from "../../service/layoutService.js"
const ToggleStatsButton = document.getElementById("toggle-stats");
const stats = document.getElementById("content-stats");
const ideas = document.getElementById("ideas");
const homePage = document.getElementById("home-page");

export const applyInitialLayout = async () => {
    const isHidden = await layoutService.getStatsHidden();

    if (isHidden) {
        stats.classList.add("hidden");
        homePage.classList.add("home-page-expanded");
        ideas.classList.add("ideas-expanded");
    }
}

export const initializeLayout = () => {
    ToggleStatsButton.addEventListener("click", async () => {
        stats.classList.toggle("hidden");
        const isCurrentlyHidden = stats.classList.contains("hidden");
        await layoutService.setStatsHidden(isCurrentlyHidden);

        homePage.classList.toggle("home-page-expanded");
        ideas.classList.toggle("ideas-expanded");

        const ideaParagraphs = document.querySelectorAll(".paragraph"); // putted this here cuz the new paragaphs are not getting detected
        ideaParagraphs.forEach((paragraph) => {
            paragraph.classList.toggle("paragraph-expanded");
        });
    });
}