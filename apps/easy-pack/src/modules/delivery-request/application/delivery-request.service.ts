import { Inject, Injectable } from '@nestjs/common';
import { EstimateDeliveryRequestCostDto } from '@app/ep/modules/delivery-request/infra/http/dtos/estimate-delivery-request-cost.dto';
import { IMapOperator } from '@app/ep/modules/delivery-request/domain/interface/maps-provider.interface';

@Injectable()
export class DeliveryRequestService {
  constructor(
    @Inject(IMapOperator) private readonly mapOperator: IMapOperator,
  ) {}

  async estimateCosts({
    type,
    pickUpAddress,
    shipmentUpAddress,
    packagesCount,
  }: EstimateDeliveryRequestCostDto) {
    const { distance } = await this.mapOperator.calculateDistance(
      [pickUpAddress],
      [shipmentUpAddress],
    );

    return {
      distance,
    };
  }
}
