
import { jwtDecode } from "jwt-decode";

export default class AuthService{

    constructor() {
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
    getUserProfile(){
        return jwtDecode('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJzdWIiOiJqYWt1YnN3aWVyY3o1QGdtYWlsLmNvbSIsImlhdCI6MTcyNjMzODU4NywiZXhwIjoxNzI2MzQyMTg3fQ.zfFXwTgdK1OTImSECSFW5ZHewWBez3kBrW--izybFEw') //jwtDecode(localStorage.getItem('token'))
    }
    getCurrentUserRole(){
        return this.getUserProfile()?.role;
    }

}