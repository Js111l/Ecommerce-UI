import BaseService from "./BaseService";



export default class EnumService extends BaseService {

    constructor() {
        super()
        this.url = "http://localhost:8081/enums"
    }

    getValuesByClassName(simpleClassName){
        return fetch(this.url + `/${simpleClassName}/values`, {
            method: 'GET',
            credentials:'include',
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

}