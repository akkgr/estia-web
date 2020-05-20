import { Address } from "app/models/Address";
import { Entity } from "app/models/Entity";

export interface Building extends Entity {
  address: Address;
}
