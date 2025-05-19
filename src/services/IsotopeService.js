import axios from "axios";

export default {
    sendGetIsotopesRequest() {
        return axios.get('/isotopes')
    },
}