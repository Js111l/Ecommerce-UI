


export default class CheckoutService{

    constructor() {
        this.url = "http://localhost:8081/products"
    }

    addProduct(data){
        return fetch(this.url + '/user-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                userId: '12',
                productId: '1'
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

}