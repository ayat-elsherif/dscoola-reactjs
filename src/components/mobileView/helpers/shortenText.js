export const shortenText = (text, textLength) => {
  if (text?.length > textLength) return text.slice(0, textLength) + "...";
  else return text;
};
