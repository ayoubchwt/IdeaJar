export const search = (ideas, searchInput) => {
  if (!searchInput.trim() || searchInput.trim === "") return ideas;
  const term = searchInput.toLowerCase();
  return ideas.filter((idea) => {
    const titleMatch = idea.title?.toLowerCase().includes(term);
    const bodyMatch = idea.body?.toLowerCase().includes(term);
    return titleMatch || bodyMatch;
  });
};
export const favoriteFilter = (ideas) => {};
