const STORAGE_KEY = "Idea_Jar_ideas";
export const exportDatabase = async () => {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    const ideas = data[STORAGE_KEY];
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