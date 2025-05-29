import axios from "axios";

export default {
    sendGetHospitalRequest() {
        return axios.get('/hospital/hospitals')
    },
    sendPostHospitalRequest(hospitalData) {
        return axios.post('/hospital/hospitals', hospitalData)
    },
    sendUpdateHospitalRequest(hospitalId, hospitalUpdate) {
        return axios.patch(`/hospital/hospitals/${hospitalId}`, hospitalUpdate)
    },
};