export const IMapOperator = Symbol('IMapOperator');

type Distance = {
  value: number;
  text: string;
};
export type DistanceResult = {
  duration: Distance;
  distance: Distance;
};

export interface IMapOperator {
  calculateDistance(
    origin: string[],
    destination: string[],
  ): Promise<DistanceResult | null>;
}
