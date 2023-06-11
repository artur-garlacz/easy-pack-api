import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CannotAcceptBookingError } from 'src/modules/parcel-delivery/domain/parcel-order/error/cannot-accept-parcel.error';

export class ParcelDelivery extends AggregateRoot {
  private id: string;
  private status: RequestStatus;
  private rejectionReason?: string;
  private createdAt?: Date;

  constructor(public readonly parcelOrderId: string) {
    super();
  }

  accept() {
    this.id = randomUUID();
    this.changeStatus(RequestStatus.Accepted);
  }

  reject(rejectionReason: string) {
    this.changeStatus(RequestStatus.Rejected, rejectionReason);
  }

  changeStatus(status: RequestStatus, rejectionReason?: string) {
    if (this.status !== RequestStatus.Pending) {
      throw new CannotAcceptBookingError();
    }

    this.status = status;
  }
}

enum RequestStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
}
