import { calculatePassedTime } from "./helpers.js";
const renderIdea = (idea) => {
  const card = document.createElement("div");
  card.classList.add("idea-card");
  card.innerHTML = `
    <h3>Saved ${calculatePassedTime(idea.updatedAt)} ago</h3>
    <div class="idea-container">
      <h1>${idea.title}</h1>
      <p class="paragraph">${idea.body}</p>
    </div>
    <div class="card-buttons">
      <button type="button" class="use-button">Use</button>
      <div class="actions">
        <button type="button" class="edit-button" id="${idea.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" class="delete-button" id="${idea.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button type="button" class="favorite-button">
        ${idea.isFavourite ? '<i class="fa-solid fa-star"></i>' : ' <i class="fa-regular fa-star"></i>'}  
        </button>
      </div>
    </div>
  `;
  return card;
};
export const renderIdeaList = (ideas, list) => {
  ideas.innerHTML = "";
  if (list.length === 0) {
    ideas.innerHTML = `<p class="empty-error"> No ideas saved yet. Add one </p>`;
    return;
  }
  list.forEach((idea) => {
    const card = renderIdea(idea);
    ideas.appendChild(card);
  });
};
