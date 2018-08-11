// Import the core angular services.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Import RxJS modules for 'side effects'.
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Import the application components and services.
import { LocalStorageService } from './local-storage.service';


export interface IFlight {
    id: number;
    name: string;
}


@Injectable()
export class FlightService {

    private localStorageService: LocalStorageService;


    // I initialize the friend service.
    constructor( localStorageService: LocalStorageService ) {

        this.localStorageService = localStorageService;

    }


    // ---
    // PUBLIC METHODS.
    // ---

    // I create a new friend with the given name and return the new observable id.
    public createFlight( name: string ): Observable<number> {

        var flights = this.loadFlights();
        var flight = {
            id: ( new Date() ).getTime(),
            name: name
        };

        this.localStorageService.setItem( 'flights', flights.concat( flight ) );

        return( Observable.of( flight.id ) );

    }


    // I return an observable collection of friends.
    public getFlights(): Observable<IFlight[]> {

        return( Observable.of( this.loadFlights() ) );

    }


    // I remove the friend with the given id. Returns an observable confirmation.
    public removeFlight( id: number ): Observable<void> {

        var flights = this.loadFlights();
        var flightIndex = flights.findIndex(
            ( item: IFlight ) : boolean => {

                return( item.id === id );

            }
        );

        if ( flightIndex >= 0 ) {

            flights = flights.slice();
            flights.splice( flightIndex, 1 );

            this.localStorageService.setItem( 'flights', flights );

            return( Observable.of( null ) );

        } else {

            return( Observable.throw( new Error( 'Not Found' ) ) );

        }

    }


    // ---
    // PRIVATE METHODS.
    // ---

    // I load the friends collection from the persistent storage.
    private loadFlights(): IFlight[] {

        var flights = <IFlight[]>this.localStorageService.getItem( 'flights' );

        return( flights || [] );

    }

}