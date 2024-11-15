import BaseService from "./BaseService";



export default class CheckoutService extends BaseService {

    constructor() {
        super()
        this.url = "http://localhost:8081/products"
    }

    addProduct(data){
        return fetch(this.url + '/user-checkout', {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
    
    
    deleteProducts(ids){
        return fetch(this.url + `/user-checkout?productIds=${ids}`, {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
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
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

}