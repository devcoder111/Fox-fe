import APIService from "@/apiservice.js";
const API = new APIService();

export default class DeliveryPeriodService {
  getAllDeliveryPeriods (payload = {}) {
    let headers = { 'Content-Type': 'application/json' };
    return API.post(`delivery-period/filter?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getPublicDeliveryPeriods (payload = {}) {
    let headers = { 'Content-Type': 'application/json' };
    return API.post(`delivery-period/public?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addDeliveryPeriod (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('delivery-period', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  updateDeliveryPeriod (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.put(`delivery-period/${payload.id}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  publishDeliveryPeriod (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`delivery-period/${payload.id}/publish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  unpublishDeliveryPeriod (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`delivery-period/${payload.id}/unpublish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  deleteDeliveryPeriod (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.delete(`delivery-period/${payload.id}`, {}, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}