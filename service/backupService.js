import * as ideaService from "./IdeaService.js"
export const exportDatabase = async () => {
    const ideas = await ideaService.getAll();
    const blob = new Blob([JSON.stringify(ideas, null, "\t")], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const temporaryLink = document.createElement("a");
    temporaryLink.href = url;
    temporaryLink.download = `ideaJar_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(temporaryLink);
    temporaryLink.click();
    document.body.removeChild(temporaryLink);
    URL.revokeObjectURL(temporaryLink);
}
export const importDatabase = async (file) => {
    if (!file) return false;
    const text = await file.text();
    let importedIdeas;
    try {
        importedIdeas = JSON.parse(text);
    } catch (e) {
        return false;
    }
    if (!Array.isArray(importedIdeas)) {
        return false;
    }
    const existingIdeas = await ideaService.getAll();
    const existingIds = new Set(existingIdeas.map(i => i.id));
    const newIdeas = importedIdeas.filter(i => !existingIds.has(i.id));
    const mergedIdeas = [...existingIdeas, ...newIdeas];
    await ideaService.addAll(mergedIdeas);
    return true;
};