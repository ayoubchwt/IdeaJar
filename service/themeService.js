const STORAGE_KEY = "Idea_Jar_theme";

export const setTheme = async (themeName) => {
    await chrome.storage.local.set({ [STORAGE_KEY]: themeName });
};

export const getTheme = async () => {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || "eclipse";
};