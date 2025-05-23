import axios from "axios";

export default {
    sendGetCalculationSettingRequest() {
        return axios.get('/calculation-settings')
    },
    sendPostCalculationSettingRequest(calculationSettingData) {
        return axios.post('/calculation-settings', calculationSettingData)
    },
}