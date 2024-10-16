import BaseService from "./BaseService";



export default class CheckoutService extends BaseService {

    constructor() {
        super()
        this.url = "http://localhost:8081/products"
    }

    addProduct(data){
        return fetch(this.url + '/user-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

    setQuantity(productId, quantity) {

        return fetch(this.url + `/user-checkout/products?productId=${productId}&&quantity=${quantity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

}