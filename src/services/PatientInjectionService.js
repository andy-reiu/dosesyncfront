import axios from "axios";

export default {
    sendGetStudiesPatientInjectionRequest(studyId) {
        return axios.get('/patient-injections', {
                params: {
                    studyId: studyId
                }
            }
        )
    },

    sendPostPatientInjectionRequest(patientInjection) {
        return axios.post('/patient-injection', patientInjection, {
            }
        )
    },
}