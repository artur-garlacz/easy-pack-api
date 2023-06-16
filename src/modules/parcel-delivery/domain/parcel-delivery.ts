import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CourierAssignedToParcelEvent } from 'src/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { ParcelDeliveryCreatedEvent } from 'src/modules/parcel-delivery/application/events/impl/parcel-delivery-created.event';
import { ENTITY_TYPE, EVENT_TYPE } from 'src/shared/events/events';

export class ParcelDelivery extends AggregateRoot {
  private _id: string;
  private _deliveryRequestId: string;
  private _userId: string;
  private _trackingNumber: string;
  private _status: ParcelDeliveryStatus;

  create({ deliveryRequestId }: { deliveryRequestId: string }) {
    this._id = randomUUID();
    this._deliveryRequestId = deliveryRequestId;
    this._trackingNumber = this.generateTrackingNumber();

    this.apply(
      new ParcelDeliveryCreatedEvent(
        '1.0.0',
        this._id,
        EVENT_TYPE.PARCEL_CREATED,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          deliveryRequestId,
          trackingNumber: this._trackingNumber,
        },
      ),
    );
  }

  assignCourierToParcel({ userId }: { userId: string }) {
    this._userId = userId;

    this.apply(
      new CourierAssignedToParcelEvent(
        '1.0.0',
        this._id,
        EVENT_TYPE.COURIER_ASSIGNED_TO_PARCEL,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          userId,
        },
      ),
    );
  }

  generateTrackingNumber() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return `EP${result}`;
  }
}

export enum ParcelDeliveryStatus {
  CREATED = 'CREATED',
}
