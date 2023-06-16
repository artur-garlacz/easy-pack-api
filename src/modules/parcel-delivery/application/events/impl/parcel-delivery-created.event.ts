import { ENTITY_TYPE, EVENT_TYPE, IEvent } from 'src/shared/events/events';

export class ParcelDeliveryCreatedEvent implements IEvent {
  constructor(
    public eventVersion: string,
    public entityId: string,
    public type: EVENT_TYPE.PARCEL_CREATED,
    public entityType: ENTITY_TYPE.PARCEL_DELIVERY,
    public payload: { deliveryRequestId: string; trackingNumber: string },
  ) {}
}
