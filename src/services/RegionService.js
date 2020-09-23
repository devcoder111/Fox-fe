import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
    getAllRegions() {
        return API.post('regions/getAll?Count=9999&Page=1', headers).then(res => {
            return res;
          }).catch(err => {
            throw err;
          });
    },

    addNewRegion(payload) {
        return API.post('regions', payload, headers).then(res => {
            return res;
          }).catch(err => {
            throw err;
          });
    },

    getRegionDetail(payload) {
        return API.get(`regions/?id=${payload.id}`, {}).then(res => {
            return res;
          }).catch(err => {
            throw err;
          });
    },

    deleteRegion(payload) {
        return API.delete(`regions/${payload.id}`).then(res => {
            return res;
          }).catch(err => {
            throw err;
          });
    },

    updateRegion(payload) {
        return API.put(`regions/${payload.id}`, payload, headers).then(res => {
            return res;
          }).catch(err => {
            throw err;
          });
    }
}