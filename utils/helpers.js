export const calculatePassedTime = (updatedAt) => {
  const now = Date.now();
  const past = new Date(updatedAt).getTime();
  const gapInSeconds = Math.floor((now - past) / 1000);
  if (gapInSeconds < 60) return `${gapInSeconds} s`;
  const gapInMinutes = Math.floor(gapInSeconds / 60);
  if (gapInMinutes < 60) return `${gapInMinutes} min`;
  const gapInHours = Math.floor(gapInMinutes / 60);
  if (gapInHours < 24) return `${gapInHours} h`;
  const gapInDays = Math.floor(gapInHours / 24);
  return `${gapInDays} d`;
};
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};