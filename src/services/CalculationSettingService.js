import axios from "axios";

export default {
    sendGetCalculationSettingRequest() {
        return axios.get('/calculation-settings')
    },
}