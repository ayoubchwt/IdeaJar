export const validateIdea = (title, body) => {
  const errors = {
    hasTitleError: false,
    hasBodyError: false,
    isValid: true,
  };
  if (!title || title.trim().length < 2) {
    errors.hasTitleError = true;
    errors.isValid = false;
  }
  if (!body || body.trim().length < 2) {
    errors.hasBodyError = true;
    errors.isValid = false;
  }
  return errors;
};
