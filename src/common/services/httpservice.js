import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class HttpService{
    constructor(httpClient){
        this.http = httpClient;
    }

    post(url, payload) {

        return this.http
            .post(url, payload)
            .catch(error => {
                console.log('Error getting ' + url);
                console.log(error);
            });    
    }
}