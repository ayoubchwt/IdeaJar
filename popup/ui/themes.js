import * as themeService from "../../service/themeService.js"

export const applyTheme = async (themeName) => {
    document.documentElement.className = "";
    if (themeName && themeName !== "eclipse")
        document.documentElement.classList.add(themeName);
    await themeService.setTheme(themeName);
}

export const initializeThemes = () => {
    const themeOptions = document.querySelectorAll(".theme-option");

    themeOptions.forEach(option => {
        option.addEventListener("click", async () => {
            const selectedTheme = option.dataset.theme;
            await applyTheme(selectedTheme);
        });
    });
}
