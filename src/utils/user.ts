/**
 * Get user initials for buttons etc.
 */
export const getUserInitials = (name: string) => {
  if (!name) return "";

  const nameArr = name.split(" ");
  let initials = nameArr[0].split("")[0];

  if (nameArr[1]) {
    initials = initials + nameArr[1].split("")[0];
  }

  return initials;
};
