export class FlightCard {
    CardID: number;
    PointFrom: Date;
    PointTo: Date;
    MyLocation: string;
    Destination: string;
    Person: number;
    Baggage: boolean;
    Food: boolean;
    Price: number;
}

export class FlightAirlane {
    FlightID: number;
    FlightNumberFrom: string;
    FlightNumberTo: string;
    FlightFrom: string;
    CodeFrom: string;
    FlightTo: string;
    CodeTo: string;
    DepartureDate: string;
    DepartureTime: string;
    ArrivalDate: string;
    ArrivalTime: string;
    FlightPrice: number;
    Airlane: string;
    Capacity: number;
}

export class SearchFlights {
    FlightFrom: string;
    FlightTo: string;
    DepartureDate?: string;
    ArrivalDate?: string;
    Person?: number;
}
