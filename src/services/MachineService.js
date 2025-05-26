import axios from "axios";

export default {

    sendGetActiveMachineRequest() {
        return axios.get('/active-machines')
    },

    sendGetMachineRequest() {
        return axios.get('/machines')
    },

    sendPostMachineRequest(machineData) {
        return axios.post('/machines', machineData)
    },
}