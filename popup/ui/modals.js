const confirmActionButton = document.getElementById("confirm-action");
const cancelActionButton = document.getElementById("cancel-action");
const confirmInfoButton = document.getElementById("confirm-info");
const confirmModal = document.getElementById("confirm-modal");
const infoModal = document.getElementById("info-modal");

export const showConfirmModal = (message) => {
    confirmModal.querySelector("p").innerText = message;
    confirmModal.style.display = "flex";

    return new Promise((resolve) => {
        confirmActionButton.onclick = () => {
            confirmModal.style.display = "none";
            resolve(true);
        };
        cancelActionButton.onclick = () => {
            confirmModal.style.display = "none";
            resolve(false);
        };
    });
};
export const showInfoModal = (title, body, buttonText) => {
    infoModal.querySelector("h3").innerText = title;
    infoModal.querySelector("p").innerText = body;
    infoModal.querySelector("button").innerText = buttonText;
    infoModal.style.display = "flex";
    return new Promise((resolve) => {
        confirmInfoButton.onclick = () => {
            infoModal.style.display = "none";
            resolve(true);
        };
    });
}