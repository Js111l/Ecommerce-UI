


export default class ProductService{

    constructor() {
        this.url = "http://localhost:8081"
    }

    getDashboard(data, bestseller){
        return fetch(this.url + `/products/dashboard?bestseller=${true}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

    getProductDetails(id){
        return fetch(this.url + `/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
    getCheckoutCount(userId){
        return fetch(this.url + `/products/user-checkout/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
}