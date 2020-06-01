export interface Provider {
  providerType: ProviderType;
  providerName: string;
  customerName: string;
  contractNumber: string;
  connectionNumber: string;
  counterNumber: string;
  paymentCode: string;
  interval: number;
  day: number;
  office: boolean;
}

export enum ProviderType {
  Electricity,
  Water,
  Cas,
  Telecommunications,
}
