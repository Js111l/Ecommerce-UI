


export default class AuthService{

    constructor() {
        this.url = "http://localhost:8080/login"
    }

    login(data){
        return fetch(this.url, {
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
            return response.json();
        });

    }

    setToken(token){
        localStorage.setItem("token",token);
    }

}