import axios from "axios";

export default {
    sendGetStudiesCalculationProfilesRequest(studyId) {
        return axios.get('/calculation-profile', {
                params: {
                    studyId: studyId
                }
            }
        );
    },

    sendPostCalculationProfileRequest(calculationProfile) {
        return axios.post('/calculation-profile', calculationProfile)
    },

    sendPutCalculationProfileRequest(studyId, calculationProfile) {
        return axios.put('/calculation-profile', calculationProfile, {
            params: {
                studyId: studyId,
            }
        });
    },

    sendDeleteCalculationProfileRequest(calculationProfileId) {
        return axios.delete('/calculation-profile', {
            params: {
                calculationProfileId: calculationProfileId,
            }
        });
    }
}