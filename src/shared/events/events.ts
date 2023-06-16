export enum EVENT_TYPE {
  PARCEL_CREATED = 'PARCEL_CREATED',
  COURIER_ASSIGNED_TO_PARCEL = 'COURIER_ASSIGNED_TO_PARCEL',
  COURIER_UNASSIGNED_FROM_PARCEL = 'COURIER_UNASSIGNED_FROM_PARCEL',
  PARCEL_STATUS_UPDATED = 'PARCEL_STATUS_UPDATED',
  PARCEL_ARCHIVED = 'PARCEL_ARCHIVED',
}

export enum ENTITY_TYPE {
  PARCEL_DELIVERY = 'PARCEL_DELIVERY',
}

export interface IEvent {
  eventVersion: string;
  entityId: string;
  type: EVENT_TYPE;
  entityType: ENTITY_TYPE;
  payload: any;
}

export const mapEventStoreTable = (type: ENTITY_TYPE) => {
  switch (type) {
    case ENTITY_TYPE.PARCEL_DELIVERY:
      return 'ParcelDeliveryEvent';
    default:
      return 'Event';
  }
};
