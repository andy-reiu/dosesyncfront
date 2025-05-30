import axios from "axios";

export default {
    sendGetCalculationSettingRequest() {
        return axios.get('/calculation-setting/calculation-settings')
    },

    sendPostCalculationSettingRequest(calculationSettingData) {
        return axios.post('/calculation-setting/calculation-settings', calculationSettingData)
    },

    sendUpdateCalculationSettingRequest(id, calculationSettingUpdate) {
        return axios.patch(`/calculation-setting/calculation-settings/${id}`, calculationSettingUpdate)
    },

    sendDeleteCalculationSettingRequest(id) {
        return axios.delete('/calculation-setting/calculation-settings/${id}', id)
    }
}