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
            // body: JSON.stringify(data)
        })
            .then(response => {
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response;
        });

    }

    // isLoggedIn() {
    //     const token = localStorage.getItem('token')
    //     const decodedUser = this.getUserFromToken()
    //     return token !== undefined && token !== null && moment().isBefore(moment.unix(decodedUser.exp))
    // }

    setToken(token){
        localStorage.setItem("token",token);
    }

    getCurrentUser(){
        return fetch(this.url + '/auth/context/current-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                return response;
            });
    }

    getUserIdFromToken() {
        const token = localStorage.getItem("token")
        const mockToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWt1YnNAd3AucGwiLCJpYXQiOjE3Mjg1MDQ5MzIsImV4cCI6MTcyODUwODUzMiwiaXNzIjoiMSJ9.zO9mPyk2noDPIFIffLcpD2l0CgpzooqNrM0dMjP0S-k";
        return jwtDecode(mockToken).iss
    }
    
    getUserFromToken() {
        const token = localStorage.getItem("token")
        const mockToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWt1YnNAd3AucGwiLCJpYXQiOjE3Mjg1MDQ5MzIsImV4cCI6MTcyODUwODUzMiwiaXNzIjoiMSJ9.zO9mPyk2noDPIFIffLcpD2l0CgpzooqNrM0dMjP0S-k";
        return jwtDecode(mockToken)
    }


    verifyToken(token){
        return fetch(this.url + `/auth/payment-token?token=${token}`, {
            method: 'POST',
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
        return fetch(this.url + `/payment-token?intentId=${uuid}`, {
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
}