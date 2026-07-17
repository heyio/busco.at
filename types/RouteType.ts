export type DestinationType = {
  data?: {
    attributes?: {
      name?: string;
    };
  };
  attributes?: {
    name?: string;
  };
  name?: string;
};

export type RouteType = {
  from: DestinationType;
  to: DestinationType;
  distanceInKm: number;
  image: string;
  additionalCosts: number;
  description: string;
};
