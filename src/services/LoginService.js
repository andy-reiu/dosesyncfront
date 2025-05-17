import axios from "axios";

export default {
    sendLoginRequest(username, password) {
        return axios.post('/login', {
            username: username,
            password: password
        });
    }
}