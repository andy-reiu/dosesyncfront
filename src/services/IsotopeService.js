import axios from "axios";

export default {
    sendGetIsotopesRequest() {
        return axios.get('/isotopes')
    },
    sendPostIsotopeRequest(isotopeData) {
        return axios.post('/isotopes', isotopeData)
    },


};