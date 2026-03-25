import * as backupService from "../../service/backupService.js";
import { showInfoModal, showConfirmModal } from "./modals.js";
import * as ideaService from "../../service/IdeaService.js"
import { refreshIdeas } from "./list.js";
const importOption = document.getElementById("import-option");
const exportOption = document.getElementById("export-option");
const cleanOption = document.getElementById("clean-option");
const importInput = document.getElementById("import-input");
const exportStatusOuput = document.getElementById("export-status-ouput");

export const initializeBackups = () => {

    exportOption.addEventListener("click", async () => {
        await backupService.exportDatabase();
        exportStatusOuput.innerText = await backupService.getExportDate();
    });

    importOption.addEventListener("click", async () => {
        importInput.click();
    });

    importInput.addEventListener("change", async (e) => {
        const dataFile = e.target.files[0];
        if (!dataFile) return
        const response = await backupService.importDatabase(dataFile);
        if (response) {
            await refreshIdeas();
            showInfoModal("Import successful", "Your ideas have been imported successfully.", "done");
        }
        else {
            showInfoModal("Import failed", "We couldn't import your file. Please make sure it's a valid backup.", "Try Again");
        }
    });
    cleanOption.addEventListener("click", async () => {
        const confirmed = await showConfirmModal(
            "Are you sure you want to delete all your ideas?",
        );
        if (confirmed) {
            await ideaService.removeAll();
            await backupService.cleanMetadata();
            await refreshIdeas();
        }
    });
}