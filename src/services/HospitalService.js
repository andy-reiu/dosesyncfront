import axios from "axios";

export default {
    sendGetHospitalRequest() {
        return axios.get('/hospitals')
    },
    sendPostHospitalRequest() {
        return axios.post('/hospitals')
    },
};