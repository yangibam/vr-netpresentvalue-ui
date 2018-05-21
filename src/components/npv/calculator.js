import {inject} from "aurelia-framework";
import {NpvService} from "components/npv/npvservice";

@inject(NpvService)
export class Calculator {
    constructor(npvService){
        this.npvService = npvService;
        this.cashflows = [];
        this.cashflows.push({amount : 0});   
    }

    calculate() {        
        this.npvService.postNpv(this.investment, this.increment, this.lower, this.upper, this.cashflows)
            .then(data => {
                this.results = data.content;
        });
    }

    addCashflow() {
        this.cashflows.push({amount : 0});
    }
}

