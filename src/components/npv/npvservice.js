import {HttpService} from "../../common/services/httpservice";
import {inject} from "aurelia-framework";

@inject(HttpService)
export class NpvService {
    constructor(httpService) {
        this.http = httpService;
        this.url = 'http://localhost:50565/api/npv'; 
    }

    postNpv(investment, increment, lower, upper, cashflow) {

        let payload = {
            lowerDiscount: lower,
            upperDiscount: upper,
            discountIncrement: increment,
            initialInvestment: investment,
            cashflows: cashflow
        };
        
        return this.http.post(this.url, payload);
    }
}