console.log("am inside components");
const favoriteFilter = document.getElementById("favorite-filter");
const filterTrigger = document.getElementById("filter-trigger");
filterTrigger.addEventListener("click", () => {
    favoriteFilter.classList.toggle("open");
});