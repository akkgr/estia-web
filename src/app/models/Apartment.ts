import { Person } from "./Person";
import { Entity } from "./Entity";

export interface Apartment extends Entity {
  buildingId: string;
  title: string;
  position: number;
  resident: Person;
  owner: Person;
  buildingTitle: String;
}
