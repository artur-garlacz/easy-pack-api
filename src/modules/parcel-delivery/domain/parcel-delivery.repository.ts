import {
  ParcelDelivery,
  ParcelDeliveryStatus,
} from 'src/modules/parcel-delivery/domain/parcel-delivery';

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

export interface IParcelDeliveryRepository {
  createParcelDelivery: (
    args: ICreateParcelDeliveryArgs,
  ) => Promise<ParcelDelivery>;
  updateParcelDelivery: (
    args: IUpdateParcelDeliveryArgs,
  ) => Promise<ParcelDelivery>;
  getParcelDelivery: (id: string) => Promise<ParcelDelivery | null>;
  getAllParcelDeliveries: (args?: {
    userId?: string;
  }) => Promise<ParcelDelivery[]>;
  getParcelDeliveryDetails: (
    args: IGetParcelDeliveryArgs,
  ) => Promise<IGetParcelDelivery>;
}
