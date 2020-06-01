import { Person } from "app/models/Person";
import { Entity } from "app/models/Entity";

export interface Apartment extends Entity {
  buildingId: string;
  title: string;
  position: number;
  resident: Person;
  owner: Person;
  closed: boolean;
  infoType: InfoType;
  common: number;
  lift: number;
  ei: number;
  fi: number;
  owners: number;
  special: number;
  special1: number;
  special2: number;
  special3: number;
  special4: number;
  heat: number;
  label: string;
  buildingTitle: string;
}

export enum InfoType {
  Post,
  Phone,
  Fax,
  Email,
  Sms,
  EmailOwner,
  EmailResident,
  Appointment,
}
