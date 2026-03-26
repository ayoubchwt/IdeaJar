import * as backupService from "../../service/backupService.js"

const importInput = document.getElementById("import-input");
const importButton = document.getElementById("import-button");

importButton.addEventListener("click", () => {
    importInput.click();
});
importInput.addEventListener("change", async (e) => {

    const dataFile = e.target.files[0];

    if (!dataFile) {
        chrome.runtime.sendMessage({ type: "IMPORT_COMPLETE", success: false });
        window.close();
        return;
    }
    const response = await backupService.importDatabase(dataFile);
    chrome.runtime.sendMessage({ type: "IMPORT_COMPLETE", success: response });
    window.close();
});