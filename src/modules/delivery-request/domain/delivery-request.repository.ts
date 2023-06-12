import { DeliveryRequestAddress } from 'src/modules/delivery-request/domain/entity/address';
import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from 'src/modules/delivery-request/domain/entity/delivery-request';
import { Package } from 'src/modules/delivery-request/domain/entity/package';

export const IDeliveryRequestRepository = Symbol('IDeliveryRequestRepository');

export type UpdateDeliveryRequest = {
  id: string;
  status: DeliveryRequestStatus;
};

export interface IDeliveryRequestRepository {
  createDeliveryRequestAddress: (
    request: DeliveryRequestAddress,
  ) => Promise<DeliveryRequestAddress>;
  createDeliveryRequest: (request: DeliveryRequest) => Promise<DeliveryRequest>;
  createPackage: (request: Package) => Promise<Package>;
  getAll: () => Promise<DeliveryRequest[]>;
  getById: (id: string) => Promise<DeliveryRequest>;
  getByCustomerId: (id: string) => Promise<DeliveryRequest>;
  updateDeliveryRequestStatus: (
    args: UpdateDeliveryRequest,
  ) => Promise<DeliveryRequest>;
}
