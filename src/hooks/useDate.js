const useDate = (inputDate) => {
  const parsedDate = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default useDate;
