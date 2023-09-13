import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetParcelDeliveryDetailsQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-delivery-details.queries';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { EventStoreService } from 'src/shared/event-store/event-store.service';
import { ENTITY_TYPE, EVENT_TYPE } from 'src/shared/events/events';

@QueryHandler(GetParcelDeliveryDetailsQuery)
export class GetParcelDeliveryDetailsHandler
  implements IQueryHandler<GetParcelDeliveryDetailsQuery>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async execute({
    args: { parcelId, trackingNumber },
  }: GetParcelDeliveryDetailsQuery) {
    const parcelDelivery =
      await this.parcelDeliveryRepository.getParcelDeliveryDetails({
        trackingNumber,
        id: parcelId,
      });

    if (!parcelDelivery || !parcelDelivery?.id) {
      return null;
    }

    const events = await this.eventStoreService.getEvents({
      entityType: ENTITY_TYPE.PARCEL_DELIVERY,
      entityId: parcelDelivery?.id,
    });

    return {
      details: parcelDelivery,
      history: events.map((event) => ({
        status:
          event.type === EVENT_TYPE.PARCEL_STATUS_UPDATED
            ? event.payload['status']
            : event.type,
        createdAt: event.createdAt,
      })),
    };
  }
}
