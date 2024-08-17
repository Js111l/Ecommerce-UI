


export default class ProductService{

    constructor() {
        this.url = "http://localhost:8080"
    }

    getDashboard(data){
        return fetch(this.url + '/products/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
}