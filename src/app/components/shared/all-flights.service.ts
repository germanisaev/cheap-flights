import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// Import RxJS modules for 'side effects'.
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FlightAirlane } from './flight-card.model';
//import { ISearch } from './flight-search.interface';

// Import the application components and services.
import { LocalStorageService } from './local-storage.service';

export interface IFlightCard {
    CardID: number;
    FlightID: number;
    NumberFrom: string;
    NumberTo: string;
    PointFrom: string;
    TimeFrom: string;
    PointTo: string;
    TimeTo: string;
    MyLocation: string;
    CodeLocation: string;
    Distination: string;
    CodeDistination: string;
    Airlane: string;
    Person: number;
    Baggage: boolean;
    Food: boolean;
    Price: number;
}

@Injectable()
export class FlightAirlaneService {

    selectedFlight: FlightAirlane;
    flightList: FlightAirlane[];
    private localStorageService: LocalStorageService;

    //webApi = 'http://localhost:42420/api/Flights';
    webApi = 'assets/mock/data.json';

    constructor(private http: Http, localStorageService: LocalStorageService) {

        this.localStorageService = localStorageService;
    }

    //--------------------------------------------------------------------
    /*
    CardID: number;
    PointFrom: string;
    TimeFrom: string;
    PointTo: string;
    TimeTo: string;
    MyLocation: string;
    CodeLocation: string;
    Distination: string;
    CodeDistination: string;
    Airlane: string;
    Person: number;
    Baggage: boolean;
    Food: boolean;
    Price: number;
    */
    // I create a new order with the given name and return the new observable id.
    public createOrder(
        cardID: number,
        flightID: number,
        numberFrom: string,
        numberTo: string,
        pointFrom: string,
        timeFrom: string,
        pointTo: string,
        timeTo: string,
        myLocation: string,
        codeLocation: string,
        distination: string,
        codeDistination: string,
        airlane: string,
        person: number,
        baggage: boolean,
        food: boolean,
        price: number): Observable<number> {

        var orders = this.loadOrders();
        var order = {
            CardID: (new Date()).getTime(),
            FlightID: flightID,
            NumberFrom: numberFrom,
            NumberTo: numberTo,
            PointFrom: pointFrom,
            TimeFrom: timeFrom,
            PointTo: pointTo,
            TimeTo: timeTo,
            MyLocation: myLocation,
            CodeLocation: codeLocation,
            Distination: distination,
            CodeDistination: codeDistination,
            Airlane: airlane,
            Person: person,
            Baggage: baggage,
            Food: food,
            Price: price
        };

        this.localStorageService.setItem('orders', orders.concat(order));

        return (Observable.of(order.CardID));
    }
    /*
    public updateOrder(
        cardID: number,
        flightID: number,
        numberFrom: string,
        numberTo: string,
        pointFrom: string,
        timeFrom: string,
        pointTo: string,
        timeTo: string,
        myLocation: string,
        codeLocation: string,
        distination: string,
        codeDistination: string,
        airlane: string,
        person: number,
        baggage: boolean,
        food: boolean,
        price: number): Observable<number> {

        var orders = this.loadOrders();
        var order = {
            CardID: (new Date()).getTime(),
            FlightID: flightID,
            NumberFrom: numberFrom,
            NumberTo: numberTo,
            PointFrom: pointFrom,
            TimeFrom: timeFrom,
            PointTo: pointTo,
            TimeTo: timeTo,
            MyLocation: myLocation,
            CodeLocation: codeLocation,
            Distination: distination,
            CodeDistination: codeDistination,
            Airlane: airlane,
            Person: person,
            Baggage: baggage,
            Food: food,
            Price: price
        };

        this.localStorageService.setItem('orders', orders.concat(order));

        return (Observable.of(order.CardID));
    }
    */

    // I return an observable collection of orders.
    public getOrders(): Observable<IFlightCard[]> {

        return (Observable.of(this.loadOrders()));

    }

    // I remove the friend with the given id. Returns an observable confirmation.
    public removeOrder(id: number): Observable<void> {

        var orders = this.loadOrders();
        var orderIndex = orders.findIndex(
            (item: IFlightCard): boolean => {

                return (item.CardID === id);
            }
        );

        if (orderIndex >= 0) {

            orders = orders.slice();
            orders.splice(orderIndex, 1);

            this.localStorageService.setItem('orders', orders);

            return (Observable.of(null));

        } else {

            return (Observable.throw(new Error('Not Found')));
        }
    }

    // I load the friends collection from the persistent storage.
    private loadOrders(): IFlightCard[] {

        var orders = <IFlightCard[]>this.localStorageService.getItem('orders');

        return (orders || []);

    }

    //--------------------------------------------------------------------

    postFlight(flight: FlightAirlane) {
        var body = JSON.stringify(flight);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.webApi, body, requestOptions).map(x => x.json());
    }

    putFlight(id, flight) {
        var body = JSON.stringify(flight);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
        return this.http.put(this.webApi + id, body, requestOptions).map(x => x.json());
    }

    deleteFlight(id: number) {
        return this.http.delete(this.webApi + id).map(x => x.json());
    }

    getFlights(): Observable<FlightAirlane[]> {
        return this.http.get(this.webApi)
            .map((response: Response) => <FlightAirlane[]>response.json());
    }

    searchFlights(flightFrom: string, flightTo: string, departureDate: string, arrivalDate: string, person: string): Observable<FlightAirlane[]> {

        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Accept', 'text/plain');

        let myParams = new URLSearchParams();
        myParams.set('FlightFrom', flightFrom);
        myParams.set('FlightTo', flightTo);
        myParams.set('DepartureDate', departureDate);
        myParams.set('ArrivalDate', arrivalDate);
        myParams.set('Person', person);
        let options = new RequestOptions({ headers: myHeaders, params: myParams });

        return this.http.get(this.webApi, options)
            .map((response: Response) => <FlightAirlane[]>response.json());
    }



}