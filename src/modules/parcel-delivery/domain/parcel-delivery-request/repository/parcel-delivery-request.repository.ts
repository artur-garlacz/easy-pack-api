import { ParcelDeliveryRequest } from '../entity/parcel-delivery-request';

export interface ParcelDeliveryRequestRepository {
  get: (id: string) => Promise<ParcelDeliveryRequest>;
  find: (id: string) => Promise<ParcelDeliveryRequest | null>;
  add: (parcelDeliveryRequest: ParcelDeliveryRequest) => Promise<void>;
  save: (parcelDeliveryRequest: ParcelDeliveryRequest) => Promise<void>;
}
