import BaseService from "./BaseService";

export default class ProductService extends BaseService{

    constructor() {
        super()
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
    getCheckoutProducts(){
        
        return fetch(this.url + `/products/user-checkout/products`, {
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

    getParentCategories(){
        return fetch(this.url + `/products/categories/menubar`, {
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

    getList(criterias){
        const params = this.getParamsFromCriteriaObject(criterias);
        return fetch(this.url + `/products/list?${params}`, {
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

    getChildren(parentPath, isFirstLevel){
        return fetch(this.url + `/products/categories/children?parentPath=${parentPath}&firstLevel=${isFirstLevel}`, {
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
    getAllCategories(){
        return fetch(this.url +  `/products/categories/parents/options`,//`/products/categories/parents/options?checkedPath=${path}`,
             {
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