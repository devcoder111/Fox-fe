import APIService from "@/apiservice.js";
const API = new APIService();
const headers = { 'Content-Type': 'application/json' };

export default class ContactService {
  getAllContacts (payload = {}) {
    return API.post(`contact/filter?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  searchContacts (payload = {}) {
    return API.post(`contact/search?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getSellerContacts (payload = {}) {
    return API.post(`contact/seller?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addContact (payload) {
    return API.post('contact', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  getContactsByCompany (payload) {
    return API.get(`contact/company/${payload.id}`, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  deleteContact (payload) {
    return API.delete(`contact/${payload.id}`).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }
}
