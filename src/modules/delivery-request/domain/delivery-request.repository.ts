import { DeliveryRequestAddress } from 'src/modules/delivery-request/domain/entity/address';
import { DeliveryRequest } from 'src/modules/delivery-request/domain/entity/delivery-request';
import { Package } from 'src/modules/delivery-request/domain/entity/package';

export const IDeliveryRequestRepository = Symbol('IDeliveryRequestRepository');

export interface IDeliveryRequestRepository {
  createDeliveryRequestAddress: (
    request: DeliveryRequestAddress,
  ) => Promise<DeliveryRequestAddress>;
  createDeliveryRequest: (request: DeliveryRequest) => Promise<DeliveryRequest>;
  createPackage: (request: Package) => Promise<Package>;
  getAll: () => Promise<DeliveryRequest[]>;
  getByCustomerId: (id: string) => Promise<DeliveryRequest>;
}
