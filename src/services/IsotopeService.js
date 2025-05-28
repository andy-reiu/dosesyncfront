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

    sendUpdateIsotopeStatusRequest(id, isotopeStatus) {
        return axios.patch('/isotope/' + id + '/isotope-status', null,
            {
                params: {
                    status: isotopeStatus
                }
            }
        )
    },
    sendUpdateIsotopeRequest(id, isotopeUpdate) {
        return axios.patch(`/isotope/isotopes/${id}`, isotopeUpdate)
    },
    sendDeleteIsotopeRequest(id) {
        return axios.delete(`/isotope/${id}`)
    }
}