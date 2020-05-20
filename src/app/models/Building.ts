import { Address } from "./Address";
import { Entity } from "./Entity";

export interface Building extends Entity {
  address: Address;
}
