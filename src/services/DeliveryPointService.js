import APIService from "@/apiservice.js";
const API = new APIService();

export default class DeliveryPointService {
  getAllDeliveryPoints (payload) {
    let headers = { 'Content-Type': 'application/json' };
    return API.post(`delivery-point/filter?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getPublicDeliveryPoints (payload) {
    let headers = { 'Content-Type': 'application/json' };
    return API.post(`delivery-point/public?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addDeliveryPoint (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('delivery-point', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  updateDeliveryPoint (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.put(`delivery-point/${payload.id}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  publishDeliveryPoint (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`delivery-point/${payload.id}/publish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  unpublishDeliveryPoint (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`delivery-point/${payload.id}/unpublish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  deleteDeliveryPoint (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.delete(`delivery-point/${payload.id}`, {}, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  togglePublicVisibilityOfDeliveryPoint (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`delivery-point/change/public-visibility`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getDeliveryPointSelection (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };

    return API.get(`/delivery-point/selection/${payload.commId}?keyword=${payload.filter}`, headers);
  }
 
}