import { ENTITY_TYPE, EVENT_TYPE, IEvent } from '@app/ep/shared/events/events';

export class ParcelDeliveryCreatedEvent implements IEvent {
  constructor(
    public eventVersion: string,
    public entityId: string,
    public type: EVENT_TYPE.PARCEL_CREATED,
    public entityType: ENTITY_TYPE.PARCEL_DELIVERY,
    public payload: { trackingNumber: string; customerId?: string },
  ) {}
}
