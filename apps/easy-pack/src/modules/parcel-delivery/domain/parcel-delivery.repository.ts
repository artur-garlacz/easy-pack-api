import {
  ParcelDelivery,
  ParcelDeliveryStatus,
} from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { Pagination } from '@app/ep/shared/utils/pagination';

export const IParcelDeliveryRepository = Symbol('IParcelDeliveryRepository');

export type ICreateParcelDeliveryArgs = {
  id: string;
  deliveryRequestId: string;
  trackingNumber: string;
  userId?: string;
};

export type IUpdateParcelDeliveryArgs = {
  id: string;
  userId?: string;
  status?: ParcelDeliveryStatus;
};

export type IGetParcelDeliveryArgs = {
  id?: string;
  trackingNumber?: string;
};

export type IGetParcelDelivery = {
  id: string;
  senderDetails: any;
  recipientDetails: any;
};

export type IGetParcelDeliveriesArgs = {
  filters?: {
    userId?: string;
    status?: ParcelDeliveryStatus;
  };
  pagination: Pagination;
};

export interface IParcelDeliveryRepository {
  createParcelDelivery: (
    args: ICreateParcelDeliveryArgs,
  ) => Promise<ParcelDelivery>;
  updateParcelDelivery: (
    args: IUpdateParcelDeliveryArgs,
  ) => Promise<ParcelDelivery>;
  getParcelDelivery: (id: string) => Promise<ParcelDelivery | null>;
  getParcelDeliveries: (
    args: IGetParcelDeliveriesArgs,
  ) => Promise<ParcelDelivery[]>;
  getNumberOfParcels: (
    args: Pick<IGetParcelDeliveriesArgs, 'filters'>,
  ) => Promise<number>;
  getParcelDeliveryDetails: (
    args: IGetParcelDeliveryArgs,
  ) => Promise<IGetParcelDelivery | null>;
}
