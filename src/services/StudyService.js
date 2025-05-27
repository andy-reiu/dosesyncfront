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
    }
}