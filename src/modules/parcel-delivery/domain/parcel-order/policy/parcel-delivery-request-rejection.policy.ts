export interface IParcelOrderRejectionPolicy {
  canReject: () => boolean;
}

export class ParcelOrderRejectionPolicy implements IParcelOrderRejectionPolicy {
  constructor(private readonly deps: any) {}

  canReject() {
    return false;
  }
}
