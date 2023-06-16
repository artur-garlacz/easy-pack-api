import { ENTITY_TYPE, EVENT_TYPE, IEvent } from 'src/shared/events/events';

export class CourierAssignedToParcelEvent implements IEvent {
  constructor(
    public eventVersion: string,
    public entityId: string,
    public type: EVENT_TYPE.COURIER_ASSIGNED_TO_PARCEL,
    public entityType: ENTITY_TYPE.PARCEL_DELIVERY,
    public payload: { userId: string },
  ) {}
}
