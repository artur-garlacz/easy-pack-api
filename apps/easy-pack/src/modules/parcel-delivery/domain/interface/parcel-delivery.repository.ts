import {
  Address,
  ParcelAddress,
} from '@app/ep/modules/parcel-delivery/domain/address';
import { Package } from '@app/ep/modules/parcel-delivery/domain/package';
import {
  ParcelDelivery,
  ParcelDeliveryStatus,
} from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { Pagination } from '@app/ep/shared/utils/pagination';

export const IParcelDeliveryRepository = Symbol('IParcelDeliveryRepository');

export type ICreateParcelDeliveryArgs = {
  id: string;
  senderAddressId: string;
  recipientAddressId: string;
  trackingNumber: string;
  customerId: string;
  description?: string;
  price: number | string;
  pickupAt: string;
  shipmentAt: string;
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

export type IGetParcelDeliveriesArgs = {
  filters?: {
    userId?: string;
    status?: ParcelDeliveryStatus | ParcelDeliveryStatus[];
  };
  pagination: Pagination;
};

export type IGetParcelDeliveriesStatsArgs = {
  filters?: {
    date?: {
      from: string | Date;
      to: string | Date;
    };
    status?: ParcelDeliveryStatus;
  };
};

export type IParcelDeliveryDetails = {
  id: string;
  price: string;
  senderAddress: any;
  recipientAddress: any;
  packages: Array<Package>;
};

export interface IParcelDeliveryRepository {
  createParcelAddress: (
    parcel: Address,
  ) => Promise<ParcelAddress & { id: string }>;
  createPackage: (request: Package) => Promise<Package>;
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
  ) => Promise<IParcelDeliveryDetails | null>;
  getParcelDeliveriesStats: (
    args: IGetParcelDeliveriesStatsArgs,
  ) => Promise<any>;
}
