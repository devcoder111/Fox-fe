import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
    growerRegistration(payload) {
        return API.post('Grower', payload, headers);
    },
}