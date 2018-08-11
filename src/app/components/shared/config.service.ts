// service that  load the configuration
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from './config.model';

@Injectable()
export class ConfigService {
    private config: Configuration;
    constructor(private http: Http) { }

    load(url: string) {

        return new Promise((resolve) => {
            this.http.get(url).map(res => res.json())
                .subscribe(config => {
                    this.config = config;
                    resolve();
                });
        });

    }

    getConfiguration(): Configuration {

        return this.config;
    }
}




