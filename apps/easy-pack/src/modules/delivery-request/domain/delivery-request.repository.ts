import { DeliveryRequestAddress } from '@app/ep/modules/delivery-request/domain/entity/address';
import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from '@app/ep/modules/delivery-request/domain/entity/delivery-request';
import { Package } from '@app/ep/modules/delivery-request/domain/entity/package';

export const IDeliveryRequestRepository = Symbol('IDeliveryRequestRepository');

export type IUpdateDeliveryRequestArgs = {
  id: string;
  status: DeliveryRequestStatus;
};

export type IGetDeliveryRequestsArgs = {
  customerId?: string;
  status?: DeliveryRequestStatus;
};

export interface IDeliveryRequestRepository {
  createDeliveryRequestAddress: (
    request: DeliveryRequestAddress,
  ) => Promise<DeliveryRequestAddress>;
  createDeliveryRequest: (request: DeliveryRequest) => Promise<DeliveryRequest>;
  createPackage: (request: Package) => Promise<Package>;
  getCustomerRequests: (
    args?: IGetDeliveryRequestsArgs,
  ) => Promise<DeliveryRequest[]>;
  getAllRequests: (
    args?: Pick<IGetDeliveryRequestsArgs, 'status'>,
  ) => Promise<DeliveryRequest[]>;
  getById: (id: string) => Promise<DeliveryRequest>;
  getByCustomerId: (id: string) => Promise<DeliveryRequest>;
  updateDeliveryRequestStatus: (
    args: IUpdateDeliveryRequestArgs,
  ) => Promise<DeliveryRequest>;
}
