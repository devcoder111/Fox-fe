import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
    getFarmAccessSetting(payload) {
        return API.get(`FarmAccess/${payload.companyId}`);
    },

    setFarmAccess(payload) {
        return API.post("FarmAccess", payload, headers);
    },

    updateFarmAccess(payload) {
        return API.put(`FarmAccess/${payload.id}`, payload, headers);
    }
}