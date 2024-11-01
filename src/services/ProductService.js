import BaseService from "./BaseService";

export default class ProductService extends BaseService{

    constructor() {
        super()
        this.url = "http://localhost:8081/products"
    }

    getDashboard(data, bestseller){
        return fetch(this.url + `/dashboard`, {//?bestseller=${true}`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
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
        return fetch(this.url + `/${id}`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
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
        return fetch(this.url + `/user-checkout/${userId}`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
    getCheckoutProducts(){
        
        return fetch(this.url + `/user-checkout/products`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

    getParentCategories(){
        return fetch(this.url + `/categories/menubar`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

    getList(criterias){
        const params = this.getParamsFromCriteriaObject(criterias);
        return fetch(this.url + `/list?${params}`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
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