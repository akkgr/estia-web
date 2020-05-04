export interface Person {
  lastName: string;
  firstName: string;
  telephone: string;
  mobile: string;
  email: string;
}

export const NewPerson = (): Person => {
  return {
    lastName: "",
    firstName: "",
    telephone: "",
    mobile: "",
    email: "",
  };
};

export const PersonTitle = (value: Person): string => {
  return `${value.lastName} ${value.firstName}`;
};

export const PersonTitleWithMobile = (value: Person): string => {
  if (value) {
    return `${value.lastName} ${value.firstName} (${value.mobile})`;
  } else {
    return "";
  }
};
