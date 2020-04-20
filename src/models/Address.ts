export interface Address {
  area: string;
  street: string;
  streetnumber: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
}

export const NewAddress = (): Address => {
  return {
    area: "",
    street: "",
    streetnumber: "",
    postalCode: "",
    country: "",
    lat: 0,
    lng: 0,
  };
};

export const AddressTitle = (value: Address): string => {
  return `${value.street} ${value.streetnumber}, ${value.area}`;
};
