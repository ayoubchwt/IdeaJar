import { calculatePassedTime } from "./helpers.js";
const highlightText = (text, searchInput) => {
  if (!searchInput || searchInput === "") return text;
  const regrex = new RegExp(`(${searchInput})`, "gi");
  return text.replace(regrex, `<mark class="highlight">$1</mark>`);
};
const renderIdea = (idea, searchInput = "") => {
  const card = document.createElement("div");
  card.classList.add("idea-card");
  card.innerHTML = `
    <h3>Saved ${calculatePassedTime(idea.updatedAt)} ago</h3>
    <div class="idea-container">
      <h1>${highlightText(idea.title, searchInput)}</h1>
      <p class="paragraph">${highlightText(idea.body, searchInput)}</p>
    </div>
    <div class="card-buttons">
      <button type="button" class="use-button" id="${idea.id}">Use</button>
      <div class="card-actions">
        <button type="button" class="edit-button" id="${idea.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" class="delete-button" id="${idea.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button type="button" class="favorite-button" id="${idea.id}">
        ${idea.isFavourite ? '<i class="fa-solid fa-star"></i>' : ' <i class="fa-regular fa-star"></i>'}  
        </button>
      </div>
    </div>
  `;
  return card;
};
export const renderIdeaList = (ideas, list, searchInput = "") => {
  ideas.innerHTML = "";
  const isSearching = searchInput.trim().length > 0;
  if (isSearching && list.length === 0) {
    ideas.innerHTML = `<p class="empty-error"> No ideas Found. </p>`;
    return;
  }
  if (!isSearching && list.length === 0) {
    ideas.innerHTML = `<p class="empty-error"> No ideas saved yet. Add one </p>`;
    return;
  }
  list.forEach((idea) => {
    const card = renderIdea(idea, searchInput);
    ideas.appendChild(card);
  });
};
