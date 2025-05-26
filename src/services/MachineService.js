import axios from "axios";

export default {

    sendGetActiveMachineRequest() {
        return axios.get('/machine/active-machines')
    },

    sendGetMachineRequest() {
        return axios.get('/machine/machines')
    },

    sendPostMachineRequest(machineData) {
        return axios.post('/machine/machines', machineData)
    },

    sendUpdateMachineStatusRequest(id, machineStatus) {
        console.log(id)
        console.log(machineStatus)
        return axios.patch('/machine/' + id + '/patch-status', null,
            {
                params: {
                    status: machineStatus,
                }
            }
        )
    },

};