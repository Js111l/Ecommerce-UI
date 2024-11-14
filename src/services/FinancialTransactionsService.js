import BaseService from "./BaseService";



export default class FinancialTransactionsService extends BaseService{


    constructor() {
        super()
        this.url = "http://localhost:8081"
    }

    getClientSecret(data){
        return fetch(this.url + '/payments/intent', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }

    getClientSecretByUUID(uuid){
        return fetch(this.url + `/payments/intent?uuid=${uuid}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
          //  body: JSON.stringify(data)
        })
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    getUserOrders(criteria){
        return fetch(this.url + `/orders/list`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
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