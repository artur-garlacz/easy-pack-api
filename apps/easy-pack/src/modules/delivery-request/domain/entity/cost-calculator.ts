export class CostCalculator {
  deliveryAt: string;
  pickUpAt: string;
  additionalCost = 0;

  constructor({
    deliveryAt,
    pickUpAt,
  }: {
    distanceInKm: number;
    numPackages: number;
    deliveryAt: string;
    pickUpAt: string;
    totalWeight: number;
    measures: string;
  }) {
    this.deliveryAt = deliveryAt;
    this.pickUpAt = pickUpAt;
  }

  isUrgent() {
    return false;
  }

  //   calculate() {
  //     if()
  //   }

  getDiffBetweenCurrAndPickUpDate() {
    return calculateDateDifference(new Date(), this.pickUpAt);
  }

  getDiffBetweenPickUpAndDeliveryDate() {
    return calculateDateDifference(this.pickUpAt, this.deliveryAt);
  }
}
