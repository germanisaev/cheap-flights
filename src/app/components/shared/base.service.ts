//import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { environment } from '../../../environments/environment';
//import { Navbar } from '../models/navbar';

@Injectable()
export class BaseService {
    protected url = this.configService.getConfiguration().webApiUrl;
    
    constructor(protected http: Http,
                private configService: ConfigService) { }

    getData(method: string) {
        return this.http.get(this.url + method);
    }

    setData(method: string, personalInfo) {
        return this.http.post(this.url + method, personalInfo);
    }

    requestHeaders(): any {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'text/plain');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Authorization', 'token ' + localStorage.getItem('token'));
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    downloadFile(method: string): Observable<Blob> {
        let options = new RequestOptions({ responseType: ResponseContentType.Blob });
        return this.http.get(this.url + method, options)
            .map(res => res.blob())
        //.catch(this.handleError)
    }

    /*
    getMenu() {
        return this.http.get(environment.configMenu)
                        .map((res:Response) => res.json());
    }
    */
}
