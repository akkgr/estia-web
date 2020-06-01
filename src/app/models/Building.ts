import { Address } from "./Address";
import { Provider } from "./Provider";
import { Person } from "./Person";
import { Entity } from "./Entity";

export interface Building extends Entity {
  address: Address;
  active: boolean;
  management: boolean;
  managementStart: string;
  managementEnd: string;
  reserve: number;
  heatingType: HeatingType;
  caloriesCounter: boolean;
  closedApartmentParticipation: number;
  litersPerCm: number;
  bankReason: string;
  providers: Provider[];
  managers: Person[];
}

export enum HeatingType {
  Central,
  Oil,
  Gas,
}
