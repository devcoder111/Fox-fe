import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
  getCompanyDetail: (payload) => {
    return API.get(`company/${payload.id}`, {}).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  },

  deleteCompany: (payload) => {
    return API.delete(`company/${payload.id}`).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  },

  updateCompany: (payload) => {
    return API.put(`company/${payload.id}`, payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  },

  getAllCompanies: (payload = {}) => {
    return API.post(`company/filter?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addCompany: (payload) => {
    return API.post('company', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }
}