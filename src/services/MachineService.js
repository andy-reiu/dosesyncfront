import axios from "axios";

export default {
    sendGetMachineRequest() {
        return axios.get('/machines')
    },
    sendPostMachineRequest(machineData) {
        return axios.post('/machines', machineData)
    },
}