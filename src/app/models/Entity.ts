export interface Entity {
  id: string | null;
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  updatedBy: string;
  deleted: boolean;
  deletedOn: string;
  deletedBy: string;
}
