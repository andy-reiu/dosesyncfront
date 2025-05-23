import axios from "axios";

export default {
    sendGetIsotopesRequest() {
        return axios.get('/active-isotopes')
    },
    sendPostIsotopeRequest(isotopeData) {
        return axios.post('/isotopes', isotopeData)
    },


};