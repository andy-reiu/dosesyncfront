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

        return axios.patch('/machine/' + id + '/machine-status', null,
            {
                params: {
                    status: machineStatus,
                }
            }
        )
    },
    sendUpdateMachineRequest(id, machineUpdate) {
        return axios.patch(`/machine/machines/${id}`, machineUpdate)
    },


    sendDeleteMachineRequest(id) {
        return axios.delete(`/machine/machines/${id}`)
    },

}