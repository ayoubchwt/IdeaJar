const STORAGE_KEY = "Idea_Jar_prompts";
export const getAll = async () => {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
};
export const add = async (prompt) => {
  const prompts = await getAll(prompt);
  prompts.push(prompt);
  await chrome.storage.local.set({ STORAGE_KEY: prompts });
};
export const update = async (prompt) => {
  const prompts = await getAll();
  const index = prompts.findIndex((p) => p.id === prompt.id);
  if (index !== -1) {
    prompts[index] = prompt;
    await chrome.storage.local.set({ STORAGE_KEY: prompts });
  }
};
export const remove = async (prompt) => {
  const prompts = await getAll();
  const index = prompts.findIndex((p) => p.id === prompt.id);
  if (index !== -1) {
    prompts.splice(index, 1);
    await chrome.storage.local.set({ STORAGE_KEY: prompts });
  }
};
