import { calculatePassedTime } from "./helpers.js";
const renderPrompt = (prompt) => {
  const card = document.createElement("div");
  card.classList.add("prompt-card");
  card.innerHTML = `
    <h3>Saved ${calculatePassedTime(prompt.updatedAt)} ago</h3>
    <div class="prompt-container">
      <h1>${prompt.title}</h1>
      <p class="paragraph">${prompt.body}</p>
    </div>
    <div class="card-buttons">
      <button type="button" class="use-button">Use</button>
      <div class="actions">
        <button type="button" class="edit-button" id="${prompt.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" class="delete-button" id="${prompt.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button type="button" class="favorite-button">
        ${prompt.isFavourite ? '<i class="fa-solid fa-star"></i>' : ' <i class="fa-regular fa-star"></i>'}  
        </button>
      </div>
    </div>
  `;
  return card;
};
export const renderPromptList = (prompts, list) => {
  prompts.innerHTML = "";
  if (list.length === 0) {
    prompts.innerHTML = `<h2 class="empty-error" style="color:white"> No prompts saved yet. Add one </h2>`;
    return;
  }
  list.forEach((prompt) => {
    const card = renderPrompt(prompt);
    prompts.appendChild(card);
  });
};
