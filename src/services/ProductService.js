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
    getCheckoutCount(){
        return fetch(this.url + `/user-checkout`, {
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


    addToFavorite(id){
        return fetch(this.url + `/user-favorite`, {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }


    getUserFavoriteProducts(criterias){
        const params = this.getParamsFromCriteriaObject(criterias);
        return fetch(this.url + `/list/user-favorite?${params}`, {
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

    getChildren(parentPath, isFirstLevel){
        return fetch(this.url + `/categories/children?parentPath=${parentPath}&firstLevel=${isFirstLevel}`, {
            method: 'GET',
            credentials: 'include',
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
        return fetch(this.url +  `/categories/parents/options`,//`/products/categories/parents/options?checkedPath=${path}`,
             {
            method: 'GET',
            credentials: 'include',
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