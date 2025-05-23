import axios from "axios";

export default {
    sendGetStudiesRequest() {
        return axios.get('/studies')
    },

    sendPostStudyRequest(study) {
        return axios.post('/study', study)
    },

    sendGetStudyRequest(studyId) {
        return axios.put('/study', {
                params: {
                    studyId: studyId,
                }
            }
        );
    }
}