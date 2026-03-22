const favoriteFilter = document.getElementById("favorite-filter");
const filterTrigger = document.getElementById("filter-trigger");
const allOption = document.getElementById("all-option");
const favoriteOption = document.getElementById("favorite-option");
const filterTriggerLabel = document.getElementById("filter-trigger-label");
filterTrigger.addEventListener("click", () => {
    favoriteFilter.classList.toggle("open");
});
document.addEventListener("click", (e) => {
    if (!favoriteFilter.contains(e.target))
        favoriteFilter.classList.remove("open");
});
allOption.addEventListener("click", () => {
    filterTriggerLabel.textContent = "Show All";
    favoriteFilter.classList.remove("open");
});
favoriteOption.addEventListener("click", () => {
    filterTriggerLabel.textContent = "Favorite";
    favoriteFilter.classList.remove("open");
});