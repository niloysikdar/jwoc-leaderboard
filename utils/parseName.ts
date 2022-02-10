export const parseName = (name: string): string => {
  if (name.length === 0) {
    return "";
  }
  if (name.split(" ").length !== 2) {
    return name;
  } else {
    const [firstName, lastName] = name.split(" ");
    const newFirst =
      firstName.charAt(0).toUpperCase() + firstName.toLowerCase().substring(1);
    const newLast =
      lastName.charAt(0).toUpperCase() + lastName.toLowerCase().substring(1);

    return `${newFirst} ${newLast}`;
  }
};
