
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
        return jwtDecode('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJqYWt1YnN3aWVyY3o1QGdtYWlsLmNvbSIsImlhdCI6MTcyNjU5NTE4OSwiZXhwIjoxNzI2NTk4Nzg5fQ.PhiYJVtPlAjCBSHYHhhz26CikD0weS9Xl1FY2pzVR4g') //jwtDecode(localStorage.getItem('token'))
    }
    getCurrentUserRole(){
        return this.getUserProfile()?.role;
    }

}