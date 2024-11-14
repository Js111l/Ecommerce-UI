import { jwtDecode } from "jwt-decode";
import BaseService from "./BaseService";

export default class AuthService extends BaseService {

    constructor() {
        super()
        this.url = "http://localhost:8081/auth"
    }

    isLoggedIn() {
        return fetch(this.url + '/session/verify', {
            method: 'POST',
            credentials: "include",
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

    logout() {
        return fetch(this.url + '/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            });
    }

    login(data) {
        return fetch(this.url + '/login', {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
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

    register(data){
        return fetch(this.url + '/register', {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response;
        });

    }

    getCurrentUser(){
        return fetch(this.url + '/auth/context/current-user', {
            method: 'GET',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                return response;
            });
    }

    verifyToken(token){
        return fetch(this.url + `/auth/payment-token?token=${token}`, {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

    getPaymentToken(uuid){ 
        return fetch(this.url + `/payment-token?uuid=${uuid}`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }

    verifyPayToken(token){
        return fetch(this.url + `/payment-token`, {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
    getUserData(){
        return fetch(this.url + `/session/user`, {
            method: 'GET',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        });
    }
}