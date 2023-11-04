import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from '@app/ep/modules/delivery-request/domain/entity/delivery-request';
import { Package } from '@app/ep/modules/parcel-delivery/domain/package';
import { Pagination } from '@app/ep/shared/utils/pagination';

export const IDeliveryRequestRepository = Symbol('IDeliveryRequestRepository');

export type IUpdateDeliveryRequestArgs = {
  id: string;
  status: DeliveryRequestStatus;
};

export type IGetDeliveryRequestsArgs = {
  filters?: {
    customerId?: string;
    status?: DeliveryRequestStatus;
  };
  pagination: Pagination;
};

export interface IDeliveryRequestRepository {
  createPackage: (request: Package) => Promise<Package>;
  getRequests: (args: IGetDeliveryRequestsArgs) => Promise<DeliveryRequest[]>;
  getNumberOfRequests: (
    args: Omit<IGetDeliveryRequestsArgs, 'pagination'>,
  ) => Promise<number>;
  getById: (id: string) => Promise<DeliveryRequest>;
  getByCustomerId: (id: string) => Promise<DeliveryRequest>;
  updateDeliveryRequestStatus: (
    args: IUpdateDeliveryRequestArgs,
  ) => Promise<DeliveryRequest>;
}
