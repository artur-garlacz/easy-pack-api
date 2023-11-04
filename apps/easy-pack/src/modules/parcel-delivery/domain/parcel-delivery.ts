import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CourierAssignedToParcelEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { ParcelDeliveryCreatedEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/parcel-delivery-created.event';
import { ParcelDeliveryStatusUpdatedEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/parcel-delivery-status-updated.event';
import { ENTITY_TYPE, EVENT_TYPE } from '@app/ep/shared/events/events';

export class ParcelDelivery extends AggregateRoot {
  public id: string;
  public customerId: string;
  public userId: string;
  public trackingNumber: string;
  public price: number;
  public createdAt: string;
  public status: ParcelDeliveryStatus;

  create(customerId?: string) {
    this.id = randomUUID();
    this.trackingNumber = this.generateTrackingNumber();

    this.apply(
      new ParcelDeliveryCreatedEvent(
        '1.0.0',
        this.id,
        EVENT_TYPE.PARCEL_CREATED,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          trackingNumber: this.trackingNumber,
          customerId,
        },
      ),
    );
  }

  assignCourierToParcel({ userId }: { userId: string }) {
    this.userId = userId;

    this.apply(
      new CourierAssignedToParcelEvent(
        '1.0.0',
        this.id,
        EVENT_TYPE.COURIER_ASSIGNED_TO_PARCEL,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          userId,
        },
      ),
    );
  }

  updateStatus({
    userId,
    status,
  }: {
    userId: string;
    status: ParcelDeliveryStatus;
  }) {
    this.apply(
      new ParcelDeliveryStatusUpdatedEvent(
        '1.0.0',
        this.id,
        EVENT_TYPE.PARCEL_STATUS_UPDATED,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          userId,
          status,
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

export enum PackageType {
  ENVELOPE = 'ENVELOPE',
  BOX = 'BOX',
  OTHER = 'OTHER',
}

export enum ParcelDeliveryStatus {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}
