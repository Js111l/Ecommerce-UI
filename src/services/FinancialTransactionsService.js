import BaseService from "./BaseService";



export default class FinancialTransactionsService extends BaseService{


    constructor() {
        super()
        this.url = "http://localhost:8082/payments"
    }

    getClientSecret(){
        return fetch(this.url + '/intent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }

 
}