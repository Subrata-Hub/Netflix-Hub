const useDate = (inputDate) => {
  if (!inputDate || "") return null;
  const parsedDate = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default useDate;
