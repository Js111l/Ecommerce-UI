import { jwtDecode } from "jwt-decode";
import BaseService from "./BaseService";

export default class AuthService extends BaseService {

    constructor() {
        super()
        this.url = "http://localhost:8080"
    }

    login(data){
        return fetch(this.url + '/login', {
            method: 'POST',
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

    register(data){
        return fetch(this.url + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response;
        });

    }
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
}