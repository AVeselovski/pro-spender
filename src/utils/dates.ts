/**
 * Temporary "quick and dirty" solution.
 */
export const formatStringDate = (dateString: string) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return dd + "." + mm + "." + yyyy;
};
