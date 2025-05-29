import axios from "axios";

export default {
    sendGetStudiesPatientInjectionRequest(studyId) {
        return axios.get('/patient-injections', {
                params: {
                    studyId: studyId,
                }
            }
        )
    },

    sendPostPatientInjectionRequest(isotopeId, patientInjection) {
        return axios.post('/patient-injection', patientInjection, {
                params: {
                    isotopeId: isotopeId
                }
            }
        )
    },

    sendPutPatientInjectionRequest(injectionId, patientInjection) {
        return axios.put('/patient-injection', patientInjection, {
            params: {
                injectionId: injectionId,
            }
        });
    },

    sendDeletePatientInjectionRequest(patientInjectionId) {
        return axios.delete('/patient-injection', {
            params: {
                patientInjectionId: patientInjectionId,
            }
        });
    },

    sendGetStudiesPatientInjectionTemplateRequest(studyId) {
        return axios.get('/patient-injection/template', {
            params: {
                studyId: studyId,
            }
        })
    },
}