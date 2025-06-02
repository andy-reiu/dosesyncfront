import axios from "axios";

export default {
    sendGetActiveIsotopesRequest() {
        return axios.get('/isotope/active-isotopes')
    },

    sendGetIsotopeRequest() {
        return axios.get('/isotope/isotopes')
    },

    sendPostIsotopeRequest(isotopeData) {
        return axios.post('/isotope/isotopes', isotopeData)
    },

    sendUpdateIsotopeStatusRequest(isotopeId, isotopeStatus) {
        return axios.patch('/isotope/' + isotopeId + '/isotope-status', null,
            {
                params: {
                    status: isotopeStatus
                }
            }
        )
    },

    sendUpdateIsotopeRequest(isotopeId, isotopeUpdate) {
        return axios.patch(`/isotope/isotopes/${isotopeId}`, isotopeUpdate)
    },

    sendDeleteIsotopeRequest(isotopeId) {
        return axios.delete(`/isotope/${isotopeId}`)
    }


}