import * as ideaService from "./IdeaService.js"

const STORAGE_KEY = "Idea_Jar_metadata";

export const exportDatabase = async () => {
    const ideas = await ideaService.getAll();
    const blob = new Blob([JSON.stringify(ideas, null, "\t")], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const temporaryLink = document.createElement("a");
    temporaryLink.href = url;
    const today = new Date().toISOString().split('T')[0];
    temporaryLink.download = `ideaJar_backup_${today}.json`;
    document.body.appendChild(temporaryLink);
    temporaryLink.click();
    document.body.removeChild(temporaryLink);
    URL.revokeObjectURL(url);
    await chrome.storage.local.set({ [STORAGE_KEY]: today });
}
export const getExportDate = async () => {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || "—";
}
export const cleanMetadata = async () => {
    await chrome.storage.local.remove(STORAGE_KEY);
}
export const importDatabase = async (file) => {
    if (!file) return false;
    const text = await file.text();
    let importedIdeas;
    try {
        importedIdeas = JSON.parse(text);
        if (!Array.isArray(importedIdeas)) {
            return false;
        }
        const existingIdeas = await ideaService.getAll();
        const existingIds = new Set(existingIdeas.map(i => i.id));
        const newIdeas = importedIdeas.filter(i => !existingIds.has(i.id));
        const mergedIdeas = [...existingIdeas, ...newIdeas];
        await ideaService.addAll(mergedIdeas);
        return true;
    } catch (e) {
        return false;
    }
};