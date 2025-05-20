import axios from "axios";

export default {
    sendGetStudiesRequest() {
        return axios.get('/studies')
    },
}