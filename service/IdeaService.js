const STORAGE_KEY = "Idea_Jar_ideas";
export const getAll = async () => {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
};
export const getById = async (id) => {
  const ideas = await getAll();
  const idea = ideas.find((idea) => idea.id === id);
  return idea || null;
};
export const add = async (idea) => {
  const ideas = await getAll(idea);
  ideas.push(idea);
  await chrome.storage.local.set({ [STORAGE_KEY]: ideas });
};

export const addAll = async (ideas) => {
  await chrome.storage.local.set({ [STORAGE_KEY]: ideas });
};
export const update = async (idea) => {
  const ideas = await getAll();
  const index = ideas.findIndex((p) => p.id === idea.id);
  if (index !== -1) {
    idea.updatedAt = new Date().toISOString();
    ideas[index] = idea;
    await chrome.storage.local.set({ [STORAGE_KEY]: ideas });
  }
};
export const remove = async (idea) => {
  const ideas = await getAll();
  const index = ideas.findIndex((p) => p.id === idea.id);
  if (index !== -1) {
    ideas.splice(index, 1);
    await chrome.storage.local.set({ [STORAGE_KEY]: ideas });
  }
};
export const removeAll = async () => {
  await chrome.storage.local.remove(STORAGE_KEY);
}
