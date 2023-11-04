import { CreateParcelDeliveryDto } from '@app/ep/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';
import { PackageType } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';

export const parcelDeliverySeeds: CreateParcelDeliveryDto[] = [
  {
    price: 20.4,
    pickupAt: new Date('2023-09-21').toISOString(),
    shipmentAt: new Date('2023-09-24').toISOString(),
    description: '',
    pickupAddress: {
      city: 'Wrocław',
      country: 'Poland',
      locationNumber: '20A',
      street: 'Sudecka',
      postalCode: '30-130',
    },
    deliveryAddress: {
      city: 'Kraków',
      country: 'Poland',
      locationNumber: '20A',
      street: 'Wadowicka',
      postalCode: '30-130',
    },
    packages: [
      {
        height: 12,
        length: 20,
        type: PackageType.BOX,
        weight: 30,
        width: 30,
      },
    ],
  },
  {
    price: 15.0,
    pickupAt: new Date('2023-09-05').toISOString(),
    shipmentAt: new Date('2023-09-09').toISOString(),
    description: 'Urgent document delivery',
    pickupAddress: {
      city: 'Warszawa',
      country: 'Poland',
      locationNumber: '15',
      street: 'Marszałkowska',
      postalCode: '00-674',
    },
    deliveryAddress: {
      city: 'Gdańsk',
      country: 'Poland',
      locationNumber: '10B',
      street: 'Powstańców Warszawy',
      postalCode: '80-262',
    },
    packages: [
      {
        height: 5,
        length: 10,
        type: PackageType.ENVELOPE,
        weight: 0.5,
        width: 7,
      },
    ],
  },
  {
    price: 18.5,
    pickupAt: new Date('2023-10-03').toISOString(),
    shipmentAt: new Date('2023-10-05').toISOString(),
    description: 'Fragile items for delivery',
    pickupAddress: {
      city: 'Poznań',
      country: 'Poland',
      locationNumber: '7C',
      street: 'Święty Marcin',
      postalCode: '61-808',
    },
    deliveryAddress: {
      city: 'Szczecin',
      country: 'Poland',
      locationNumber: '11',
      street: 'Aleja Wojska Polskiego',
      postalCode: '70-471',
    },
    packages: [
      {
        height: 15,
        length: 25,
        type: PackageType.BOX,
        weight: 20,
        width: 30,
      },
    ],
  },
  {
    price: 12.7,
    pickupAt: new Date('2023-10-28').toISOString(),
    shipmentAt: new Date('2023-10-30').toISOString(),
    description: 'Bulk delivery for warehouse restock',
    pickupAddress: {
      city: 'Katowice',
      country: 'Poland',
      locationNumber: '42',
      street: 'Chorzowska',
      postalCode: '40-101',
    },
    deliveryAddress: {
      city: 'Łódź',
      country: 'Poland',
      locationNumber: '18',
      street: 'Piotrkowska',
      postalCode: '90-001',
    },
    packages: [
      {
        height: 10,
        length: 40,
        type: PackageType.BOX,
        weight: 50,
        width: 40,
      },
    ],
  },
  {
    price: 22.0,
    pickupAt: new Date('2023-10-12').toISOString(),
    shipmentAt: new Date('2023-10-16').toISOString(),
    description: 'Special delivery for event materials',
    pickupAddress: {
      city: 'Gdynia',
      country: 'Poland',
      locationNumber: '6',
      street: 'Morska',
      postalCode: '81-036',
    },
    deliveryAddress: {
      city: 'Częstochowa',
      country: 'Poland',
      locationNumber: '22',
      street: 'Jasnogórska',
      postalCode: '42-217',
    },
    packages: [
      {
        height: 8,
        length: 15,
        type: PackageType.BOX,
        weight: 15,
        width: 25,
      },
    ],
  },
];
