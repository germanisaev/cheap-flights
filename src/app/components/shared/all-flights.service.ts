import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
//import 'rxjs/Rx';

// Import RxJS modules for 'side effects'.
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FlightAirlane } from './flight-card.model';
import { SearchFlights } from './flight-card.model';
/*import { ISearch } from './flight-search.interface';*/

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
    headers: Headers;
    options: RequestOptions;
    params: URLSearchParams;
    body: any;
    orders: IFlightCard[];
    order: IFlightCard;
    orderIndex: number;

    /*webApi = 'http://localhost:42420/api/Flights';*/
    //webApi = 'assets/mock/data.json';

    distinations: any[] = [
        { value: 'Barcelona', code: 'BSN', key: '04:05' },
        { value: 'Paris', code: 'PRS', key: '04:55' },
        { value: 'Rome', code: 'RME', key: '04:35' },
        { value: 'Rodos', code: 'RDS', key: '03:45' },
        { value: 'Berlin', code: 'BLN', key: '04:15' }
    ];

    constructor(private http: Http,
        localStorageService: LocalStorageService,
        cd: ChangeDetectorRef) {

        this.localStorageService = localStorageService;
    }
    /*
    search(term) {
        return this.http.get(this.webApi + term).map(res => {
            return res.json().map(item => {
                return item.word
            });
        });
    }
    */
    /***********************************************/
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
    public createOrder(cart: IFlightCard): Observable<number> {

        this.orders = this.loadOrders();
        this.order = {
            CardID: (new Date()).getTime(),
            FlightID: cart.FlightID,
            NumberFrom: cart.NumberFrom,
            NumberTo: cart.NumberTo,
            PointFrom: cart.PointFrom,
            TimeFrom: cart.TimeFrom,
            PointTo: cart.PointTo,
            TimeTo: cart.TimeTo,
            MyLocation: cart.MyLocation,
            CodeLocation: cart.CodeLocation,
            Distination: cart.Distination,
            CodeDistination: cart.CodeDistination,
            Airlane: cart.Airlane,
            Person: cart.Person,
            Baggage: cart.Baggage,
            Food: cart.Food,
            Price: cart.Price
        };

        this.localStorageService.setItem('orders', this.orders.concat(this.order));

        return (Observable.of(this.order.CardID));
    }
    /*
    public updateOrder(cart: IFlightCard): Observable<number> {

        var orders = this.loadOrders();
        var order = {
            FlightID: cart.FlightID,
            NumberFrom: cart.NumberFrom,
            NumberTo: cart.NumberTo,
            PointFrom: cart.PointFrom,
            TimeFrom: cart.TimeFrom,
            PointTo: cart.PointTo,
            TimeTo: cart.TimeTo,
            MyLocation: cart.MyLocation,
            CodeLocation: cart.CodeLocation,
            Distination: cart.Distination,
            CodeDistination: cart.CodeDistination,
            Airlane: cart.Airlane,
            Person: cart.Person,
            Baggage: cart.Baggage,
            Food: cart.Food,
            Price: cart.Price
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

        this.orders = this.loadOrders();
        this.orderIndex = this.orders.findIndex(
            (item: IFlightCard): boolean => {

                return (item.CardID === id);
            }
        );

        if (this.orderIndex >= 0) {

            this.orders = this.orders.slice();
            this.orders.splice(this.orderIndex, 1);

            this.localStorageService.setItem('orders', this.orders);

            return (Observable.of(null));

        } else {

            return (Observable.throw(new Error('Not Found')));
        }
    }

    // I load the friends collection from the persistent storage.
    private loadOrders(): IFlightCard[] {

        this.orders = <IFlightCard[]>this.localStorageService.getItem('orders');

        return (this.orders || []);
    }

    /***********************************************/

    postFlight(flight: FlightAirlane) {
        this.body = JSON.stringify(flight);
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ method: RequestMethod.Post, headers: this.headers });
        return this.http.post(environment.webApi, this.body, this.options).map(x => x.json());
    }

    putFlight(id, flight) {
        this.body = JSON.stringify(flight);
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ method: RequestMethod.Put, headers: this.headers });
        return this.http.put(environment.webApi + id, this.body, this.options).map(x => x.json());
    }

    deleteFlight(id: number) {
        return this.http.delete(environment.webApi + id).map(x => x.json());
    }

    getFlights(): Observable<FlightAirlane[]> {
        return this.http.get(environment.webApi)
            .map((response: Response) => <FlightAirlane[]>response.json());
    }

    /*
    getFlights(): Observable<FlightAirlane[]> {
        return this.http.get(this.webApi)
            .flatMap((response) => response.json())
            .filter((flight) => flight.PointFrom.getTime() < new Date().getTime())
            .map((flight) => "Dr. " + flight.)
            .subscribe((data) => {
                this.flightd.push(data);

                cd.detectChanges();
            });
    }
    */
    /*
let headers = new Headers({
‘Accept’: ‘application/json’,
‘Content-Type’: ‘application/json’
});
let request_data = new URLSearchParams();
request_data.set(‘sample_param’, “Sample_value”);
let request_option = new RequestOptions({ headers: this.headers});
request_option.params = request_data;
this.http.get(“http://…..your_api_url…..", request_option)
.map(res => res.json());

    */

    searchFlights(params: SearchFlights): Observable<FlightAirlane[]> {

        this.headers = new Headers();
        this.headers.set('Accept', 'application/json');
        this.headers.set('Content-Type', 'application/json');

        this.params = new URLSearchParams();
        this.params.set('FlightFrom', params.FlightFrom);
        this.params.set('FlightTo', params.FlightTo);
        this.params.set('DepartureDate', params.DepartureDate);
        this.params.set('ArrivalDate', params.ArrivalDate);
        this.params.set('Person', String(params.Person));
        this.options = new RequestOptions({ headers: this.headers });
        this.options.params = this.params;
        /*this.options = new RequestOptions({ headers: this.headers, params: this.params });*/

        return this.http.get(environment.webApi, this.options)
            .map((response: Response) => <FlightAirlane[]>response.json());
    }
}