import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

/*import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
//import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
//import { ISearch } from '../shared/flight-search.interface';*/

import { FlightAirlane } from '../shared/flight-card.model';
import { FilterPipe } from '../shared/filter.component';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FlightAirlaneService } from '../shared/all-flights.service';
import { IFlightCard } from '../shared/all-flights.service';
import { SearchFlights } from '../shared/flight-card.model';

declare var $: any;

/*
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      let notMatchingField = Object.keys(filter)
        .find(key => item[key] !== filter[key]);

      return !notMatchingField; // true if matches all fields
    });
  }
}
*/

@Component({
  selector: 'app-all-flights',
  templateUrl: './all-flights.component.html',
  styleUrls: ['./all-flights.component.scss'],
  providers: [FlightAirlaneService]
})
export class AllFlightsComponent implements OnInit {

  flights: FlightAirlane[];
  oSearch: SearchFlights;
  Form: any;
  /*
  _localeKey = 'he';
  bsValueFrom: Date = null;
  bsValueTo: Date = null;
  public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  */
  flightFilter: any;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  person: number[] = [];
  baggage: boolean[] = [];
  food: boolean[] = [];
  isDesibled: boolean[] = [];
  TotalPrice: number[] = [];
  isMessage: boolean[] = [];
  isEdit: boolean[] = [];
  isShow: boolean;
  isDown: boolean;

  arrival: string;
  distination: string;
  selectedOption;
  arr: any[] = [];

  distinations: any[] = [
    { value: 'Barcelona', code: 'BSN', key: '04:05' },
    { value: 'Paris', code: 'PRS', key: '04:55' },
    { value: 'Rome', code: 'RME', key: '04:35' },
    { value: 'Rodos', code: 'RDS', key: '03:45' },
    { value: 'Berlin', code: 'BLN', key: '04:15' }
  ];

  public form: IFlightCard;

  public service: {
    baggage: number;
    food: number;
  };

  public oStorage: {
    baggage: boolean;
    food: boolean;
  };

  public orders: IFlightCard[];

  private flightAirlaneService: FlightAirlaneService;

  constructor(flightAirlaneService: FlightAirlaneService) {

    this.arrival = 'Tel Aviv (TLV)';
    this.flightAirlaneService = flightAirlaneService;
    this.orders = [];

    this.service = {
      baggage: 50,
      food: 25,
    };

    this.oStorage = {
      baggage: false,
      food: false,
    };

    this.flights = [];

    this.distination = '-1';

    this.isDown = false;

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  onToggleSelect() {
    this.isDown = !this.isDown;
  }
  onToggle() {
    this.isShow = !this.isShow;
  }

  onEdit(i: number, order: IFlightCard): void {
    this.isEdit[i] = !this.isEdit[i];
  }

  onUpdate(i: number, order: IFlightCard): void {
    this.isEdit[i] = !this.isEdit[i];
    alert('save data to database by stored procedure update');
  }

  onClose(i: number) {

    this.reload();

    this.isEdit[i] = !this.isEdit[i];
    /*
    this.oStorage = JSON.parse(localStorage.getItem('storage-card'));
    console.log(this.oStorage);
    //localStorage.setItem('storagecard', JSON.stringify(this.oStorage));
    console.log(localStorage.getItem('storage-card'));
    if (typeof (this.oStorage) !== 'undefined' || this.oStorage !== null) {
      // get chooses from local storage
      order.Baggage = this.oStorage.baggage;
      order.Food = this.oStorage.food;
      // by default storage object
      this.oStorage.baggage = false;
      this.oStorage.food = false;
    } else {
      // Sorry! No Web Storage support..
    }
    localStorage.removeItem('storage-card');
    */
  }

  onApproval(i: number, order: IFlightCard) {
    alert('save data to database by stored procedure insert');
  }

  requestData() {
    this.flightAirlaneService.getFlights()
      .subscribe((flightsData) => {
        this.flights = flightsData;
        for (let i = 0; i < this.flights.length; i++) {
          this.person[i] = 1;
          this.isDesibled[i] = true;
          this.TotalPrice[i] = this.flights[i].FlightPrice;
          this.baggage[i] = false;
          this.food[i] = false;
          this.isMessage[i] = false;
        }
      }
      );
  }
  /*
  getProducts(categoryId?: number): void {
    if (categoryId) {
        this.productService.getProducts()
            .then(products => {
                this.products = products.filter((product: Product) => product.categoryId === categoryId);
            });
    } else {
        this.productService.getProducts()
            .then(products => this.products = products);
    }
  }

  : Observer<FlightAirlane[]>
  */
  search() {

    this.oSearch = {
      FlightFrom: 'Tel Aviv',
      FlightTo: this.selectedOption,
      DepartureDate: '',
      ArrivalDate: '',
      Person: 0
    };

    this.searchData(this.oSearch);
  }

  searchData(params: SearchFlights) {

    this.flightAirlaneService.searchFlights(params)
      .subscribe(flights => {
        this.flights = flights.filter((flight: FlightAirlane) => flight.FlightTo === params.FlightTo
          /*
          {
            valid: boolean = true;
            if(flight.FlightFrom === params.FlightFrom)
              valid = true;
          }
          */
        );
      });
    /*.subscribe((flightsData) => this.flights = flightsData);*/
  }

  getTotalFlightsCount(): number {
    return this.flights.length;
  }

  onSerach() {
    this.arr = [];
    this.arr.push(this.arrival);
    this.arr.push(this.distination);
    this.arr.push(this.bsValue);
    this.arr.push(this.maxDate);
    this.arr.push(this.person);

    /*this.searchData(this.arr);*/
  }

  onChangePlus(i: number) {

    if (this.person[i] <= 5) {
      if (this.flights[i].Capacity > 0) {

        this.person[i] = this.person[i] + 1;

        if (Number(this.flights[i].Capacity) === Number(this.person[i])) {
          this.isMessage[i] = true;
        } else {
          this.isMessage[i] = false;
        }
        this.calculateTotalPrice(i);
        if (this.person[i] > 1) {
          this.isDesibled[i] = false;
        }
      }
    }
  }

  onChangeMinus(i: number) {

    if (this.person[i] > 0) {
      this.person[i] = this.person[i] - 1;

      if (this.person[i] === 1) {
        this.isDesibled[i] = true;
      }
      if (this.flights[i].Capacity > 0) {
        this.isMessage[i] = false;
      }
      if (this.flights[i].Capacity >= this.person[i]) {
        this.calculateTotalPrice(i);
      }
    }
  }

  calculateTotalPrice(i: number) {
    if (this.baggage[i]) {
      if (this.food[i]) {
        this.TotalPrice[i] = Math.round(this.flights[i].FlightPrice * this.person[i]) + (Number(this.service.food) * this.person[i]) + (Number(this.service.baggage) * this.person[i]);
      } else {
        this.TotalPrice[i] = Math.round(this.flights[i].FlightPrice * this.person[i]) + (Number(this.service.baggage) * this.person[i]);
      }
    } else {
      if (this.food[i]) {
        this.TotalPrice[i] = Math.round(this.flights[i].FlightPrice * this.person[i]) + (Number(this.service.food) * this.person[i]);
      } else {
        this.TotalPrice[i] = Math.round(this.flights[i].FlightPrice * this.person[i]);
      }
    }
  }

  onChangeBaggage(i: number) {
    if (this.baggage[i]) {
      this.TotalPrice[i] = Number(this.TotalPrice[i]) + (Number(this.service.baggage) * Number(this.person[i]));
    } else {
      this.TotalPrice[i] = Number(this.TotalPrice[i]) - (Number(this.service.baggage) * Number(this.person[i]));
    }
  }

  onChangeFood(i: number) {
    if (this.food[i]) {
      this.TotalPrice[i] = Number(this.TotalPrice[i]) + (Number(this.service.food) * Number(this.person[i]));
    } else {
      this.TotalPrice[i] = Number(this.TotalPrice[i]) - (Number(this.service.food) * Number(this.person[i]));
    }
  }

  onChangeBaggageCard(card: IFlightCard) {
    if (card.Baggage) {
      card.Price = Number(card.Price) + (Number(this.service.baggage) * Number(card.Person));
    } else {
      card.Price = Number(card.Price) - (Number(this.service.baggage) * Number(card.Person));
    }
  }

  onChangeFoodCard(card: IFlightCard) {
    if (card.Food) {
      card.Price = Number(card.Price) + (Number(this.service.food) * Number(card.Person));
    } else {
      card.Price = Number(card.Price) - (Number(this.service.food) * Number(card.Person));
    }
  }

  public addOrder(i: number): void {

    if (this.flights[i].Capacity > 0) {
      this.form = {
        CardID: (new Date()).getTime(),
        FlightID: this.flights[i].FlightID,
        NumberFrom: this.flights[i].FlightNumberFrom,
        NumberTo: this.flights[i].FlightNumberTo,
        PointFrom: this.flights[i].DepartureDate,
        TimeFrom: this.flights[i].DepartureTime,
        PointTo: this.flights[i].ArrivalDate,
        TimeTo: this.flights[i].ArrivalTime,
        MyLocation: this.flights[i].FlightFrom,
        CodeLocation: this.flights[i].CodeFrom,
        Distination: this.flights[i].FlightTo,
        CodeDistination: this.flights[i].CodeTo,
        Airlane: this.flights[i].Airlane,
        Person: this.person[i],
        Baggage: this.baggage[i],
        Food: this.food[i],
        Price: this.TotalPrice[i],
      };

      this.flightAirlaneService
        .createOrder(this.form)
        .subscribe(
          (CardID: number): void => {

            this.reload();

            this.flights[i].Capacity = Math.round(Number(this.flights[i].Capacity) - Number(this.person[i]));
          }
        )
        ;
    }
  }

  ngOnInit(): void {
    /*
    for (var card in this.orders) {
      this.oStorage.food = card.Food;
      this.oStorage.baggage = card.Baggage;
      localStorage.setItem('storage-card', JSON.stringify(this.oStorage));
    }
    */

    this.requestData();

    this.reload();

    for (let x = 0; x < this.orders.length; x++) {
      this.isEdit[x] = true;
    }

  }

  /*****************************************/
  calcTime() {
    let d1: number;
    let d2: number;
    d1 = Date.parse('08/10/2018 02:50:00');
    d2 = Date.parse('08/10/2018 05:55:00');

    /*alert(diff_minutes(d1,d2));
    //alert(d1);
    //alert(d2);
    let d3: number = d2 - d1;
    alert(msToTime(d2 - d1));*/

  }

  // I reload the list of friends.
  public reload(): void {

    this.flightAirlaneService
      .getOrders()
      .subscribe(
        (orders: IFlightCard[]): void => {

          this.orders = orders;
        }
      )
      ;
  }

  // I remove the given friend from the collection.
  public remove(order: IFlightCard): void {

    /*alert('save data to database by stored procedure update (airplane capacity)');

    //this.flights[order.FlightID - 1].Capacity = this.flights[order.FlightID - 1].Capacity + order.Person;*/

    // Optimistically remove from local collection.
    this.orders = this.orders.filter(
      (value: IFlightCard): boolean => {

        return (value !== order);
      }
    );

    this.flightAirlaneService
      .removeOrder(order.CardID)
      .subscribe(
        (): void => {

          this.reload();

          this.flights[order.FlightID - 1].Capacity = Number(this.flights[order.FlightID - 1].Capacity) + Number(order.Person);
        }
      );
  }

}

/*
$(function () {
  $('#datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
  }).datepicker('update', new Date());
});
*/
/*
function diff_minutes(dt2, dt1) {

  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));

}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  //if(hrs < 10)
  //  hrs = '0' + String(hrs);

  //if(mins < 10)
  //  mins = '0' + String(mins);

  return hrs + ':' + mins; //+ ':' + secs + '.' + ms;
}

function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  return minutes + ':' + seconds;
}
*/

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });
  // scroll body to 0px on click
  $('#back-to-top').click(function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  $('#back-to-top').tooltip('show');

});

