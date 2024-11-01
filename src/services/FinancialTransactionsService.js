import BaseService from "./BaseService";



export default class FinancialTransactionsService extends BaseService{


    constructor() {
        super()
        this.url = "http://localhost:8081/payments"
    }

    getClientSecret(data, token){
        return fetch(this.url + '/intent', {
            method: 'POST',
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
        return fetch(this.url + `/intent?uuid=${uuid}`, {
            method: 'GET',
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
 
}