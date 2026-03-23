export const search = (ideas, searchInput) => {
  if (!searchInput.trim() || searchInput.trim === "") return ideas;
  const term = searchInput.toLowerCase();
  return ideas.filter((idea) => {
    const titleMatch = idea.title?.toLowerCase().includes(term);
    const bodyMatch = idea.body?.toLowerCase().includes(term);
    return titleMatch || bodyMatch;
  });
};
export const favoriteFilter = (ideas) => {
  return ideas.filter(idea => idea.isFavorite);
};
export const sort = (ideas) => {
  return ideas.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
};