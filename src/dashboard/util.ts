export const capitalizeFirstLetter = (word: string) => {
  if (!word) {
    return word;
  }
  const capitalized = word[0].toUpperCase() + word.slice(1);
  return capitalized;
};
