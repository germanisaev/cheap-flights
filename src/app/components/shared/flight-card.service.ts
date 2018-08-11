import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FlightCard } from './flight-card.model';


@Injectable()
export class FlightCardService {

  selectedCard: FlightCard;
  cardList: FlightCard[];
  
  constructor(private http: Http) { }

  postOrder(card: FlightCard) {
    var body = JSON.stringify(card);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post('http://localhost:5000/api/CardFlight', body, requestOptions).map(x => x.json());
  }

  putOrder(id, card) {
    var body = JSON.stringify(card);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    return this.http.put('http://localhost:5000/api/CardFlight' + id, body, requestOptions).map(x => x.json());
  }

  deleteOrder(id: number) {
    return this.http.delete('http://localhost:5000/api/CardFlight' + id).map(x => x.json());
  }

  getCardList() {
    this.http.get('http://localhost:5000/api/CardFlight')
    .map((data: Response) => {
      return data.json() as FlightCard[];
    }).toPromise().then(x => {
      this.cardList = x;
    });
  }

}
