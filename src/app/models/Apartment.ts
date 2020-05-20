import { Person } from "app/models/Person";
import { Entity } from "app/models/Entity";

export interface Apartment extends Entity {
  buildingId: string;
  title: string;
  position: number;
  resident: Person;
  owner: Person;
  buildingTitle: String;
}
