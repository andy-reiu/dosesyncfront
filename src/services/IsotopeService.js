import axios from "axios";

export default {
    sendGetActiveIsotopesRequest() {
        return axios.get('/active-isotopes')
    },

    sendGetIsotopeRequest() {
        return axios.get('/isotopes')
    },

    sendPostIsotopeRequest(isotopeData) {
        return axios.post('/isotopes', isotopeData)
    },


};