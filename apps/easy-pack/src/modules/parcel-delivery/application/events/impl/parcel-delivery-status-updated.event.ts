import { ParcelDeliveryStatus } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { ENTITY_TYPE, EVENT_TYPE, IEvent } from '@app/ep/shared/events/events';

export class ParcelDeliveryStatusUpdatedEvent implements IEvent {
  constructor(
    public eventVersion: string,
    public entityId: string,
    public type: EVENT_TYPE.PARCEL_STATUS_UPDATED,
    public entityType: ENTITY_TYPE.PARCEL_DELIVERY,
    public payload: { status: ParcelDeliveryStatus; userId: string },
  ) {}
}
