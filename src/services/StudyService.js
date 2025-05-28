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
        )
    },

    sendGetCalculateStudiesMachineRinseVolumeRequest(studyId) {
        return axios.get('/study/machine-rinse-volume', {
                params: {
                    studyId: studyId,
                }
            }
        )
    },

    sendGetStudiesLastMachineRinseActivityRequest(studyId) {
        return axios.get('/study/machine-remaining-activity', {
                params: {
                    studyId: studyId,
                }
            }
        )
    },

    sendPostSaveStudyRequest(studyId) {
        return axios.post('/study/save-all', null, {
                params: {
                    studyId: studyId,
                }
            }
        )
    },

    sendPutStudyPendingRequest(studyId, study) {
        return axios.put('/study-pending', study, {
            params: {
                studyId: studyId
            }
        })
    },

    sendDeleteStudyPendingRequest(studyId) {
        return axios.delete('/study-pending', {
            params: {
                studyId: studyId
            }
        });
    }
}