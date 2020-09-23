import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
    getAllCounterParties(payload) {
        return API.post("counter-party/filter", payload, headers);
    },

    updateCounterParty(payload) {
        return API.put(`counter-party/${payload.id}`, payload, headers);
    },

    getAllGroups(payload) {
        return API.get(`counter-party-groups?keyword=${payload}`, headers);
    },

    addCounterGroup(payload) {
        return API.post("counter-party-groups", payload, headers);
    },

    delCounterGroup(payload) {
        return API.delete(`counter-party-groups/${payload.id}`);
    }
}