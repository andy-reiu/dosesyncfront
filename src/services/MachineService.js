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

    sendUpdateMachineStatusRequest(machineId, machineStatus) {

        return axios.patch('/machine/' + machineId + '/machine-status', null,
            {
                params: {
                    machineStatus: machineStatus,
                }
            }
        )
    },
    sendUpdateMachineRequest(machineId, machineUpdate) {
        return axios.patch(`/machine/machines/${machineId}`, machineUpdate)
    },


    sendDeleteMachineRequest(id) {
        return axios.delete(`/machine/machines/${id}`)
    },

}