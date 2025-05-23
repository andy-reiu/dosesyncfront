import axios from "axios";

export default {
    sendGetMachineRequest() {
        return axios.get('/active-machines')
    },
}