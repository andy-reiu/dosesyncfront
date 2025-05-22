import axios from "axios";

export default {
    sendGetStudiesPatientInjectionRequest(studyId) {
        return axios.get('/patient-injection', {
                params: {
                    studyId: studyId
                }
            }
        )
    },
}