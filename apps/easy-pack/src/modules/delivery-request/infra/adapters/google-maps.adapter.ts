import { Injectable } from '@nestjs/common';
import {
  Client,
  Status,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { IMapOperator } from '@app/ep/modules/delivery-request/domain/interface/maps-provider.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleMapsAdapter implements IMapOperator {
  private readonly googleMapsClient: Client;

  constructor(private configService: ConfigService) {
    this.googleMapsClient = new Client({});
  }

  async calculateDistance(origins: string[], destinations: string[]) {
    const response = await this.googleMapsClient.distancematrix({
      params: {
        origins, //['Greenwich, England'],
        destinations, //['Manchester, England'],
        mode: TravelMode.driving,
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    const { status, rows } = response.data;

    if (status !== Status.OK || !rows.length) {
      throw new Error('Cannot calculate distance');
    }

    return rows[0].elements[0] || null;
  }
}
