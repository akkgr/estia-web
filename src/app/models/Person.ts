export interface Person {
  lastName: string;
  firstName: string;
  fatherName: string;
  telephone: string;
  mobile: string;
  email: string;
  afm: string;
  doy: string;
  roleType: RoleType;
}

export enum RoleType {
  None,
  Manager,
  Oil,
  Heat,
  Repairs,
}

export const NewPerson = (): Person => {
  return {
    lastName: "",
    firstName: "",
    telephone: "",
    mobile: "",
    email: "",
    fatherName: "",
    afm: "",
    doy: "",
    roleType: RoleType.None,
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
