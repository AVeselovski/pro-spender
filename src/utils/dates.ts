/**
 * Temporary "quick and dirty" solution.
 */
export function formatStringDate(date: string) {
  const _date = new Date(date);
  const yyyy = _date.getFullYear();
  let mm: number | string = _date.getMonth() + 1;
  let dd: number | string = _date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "." + mm + "." + yyyy;
}
