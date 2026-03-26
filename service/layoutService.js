const STORAGE_KEY = "Idea_Jar_Stats_Hidden";

export const setStatsHidden = async (statsHidden) => {
    await chrome.storage.local.set({ [STORAGE_KEY]: statsHidden });
};

export const getStatsHidden = async () => {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY];
};