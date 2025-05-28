import axios from "axios";

export default {
    sendGetMachineFillRequest(studyId) {
        return axios.get('/machine-fills', {
                params: {
                    studyId: studyId
                }
            }
        )
    },
}