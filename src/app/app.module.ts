
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AllFlightsComponent } from './components/all-flights/all-flights.component';

import { FlightAirlaneService } from './components/shared/all-flights.service';
import { LocalStorageService } from './components/shared/local-storage.service';
import { FlightCardService } from './components/shared/flight-card.service';
/*
import { AllFlightsComponent } from './components/all-flights/all-flights.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { OrderFlightComponent } from './components/order-flights/order-flight.component';
import { OrdersFlightComponent } from './components/orders-flights/orders-flight.component';

import { FlightAirlaneService } from './components/shared/all-flights.service';
import { LocalStorageService } from './components/shared/local-storage.service';
import { FlightCardService } from './components/shared/flight-card.service';
//import { FlightService } from "./components/shared/orders-flight.service";

*/
@NgModule({
  declarations: [
    AppComponent,
    AllFlightsComponent,
    /*SearchFlightsComponent,
    OrderFlightComponent,
    OrdersFlightComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    BsDatepickerModule,
    ToastrModule
  ],
  providers: [
    FlightAirlaneService,
    LocalStorageService,
    FlightCardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { OrderFlightComponent } from './components/order-flight/order-flight.component';
import { OrdersFlightComponent } from './components/orders-flight/orders-flight.component';

import { FlightAirlaneService } from './components/shared/all-flights.service';
import { FlightCardService } from './components/shared/flight-card.service';
import { LocalStorageService } from "./components/shared/local-storage.service";
import { FlightService } from "./components/shared/orders-flight.service";

import { AllFlightsComponent } from './components/all-flights/all-flights.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    //OrderFlightComponent,
    //OrdersFlightComponent,
    AllFlightsComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    HttpModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule, 
    BsDatepickerModule.forRoot()
  ],
  providers: [
    FlightCardService, 
    LocalStorageService, 
    //FlightService,
    FlightAirlaneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
