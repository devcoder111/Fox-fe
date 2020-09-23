import APIService from "@/apiservice.js";
const API = new APIService();

export default class CommodityService {
  getAllCommodities (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.get(`commodity/selection?sortType=0`, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  filterCommodities (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity/filter?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getPublicCommodities (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.get(`commodity/public?Count=${payload.count}&Page=${payload.page}`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  newCommodity (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('commodity', payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  deleteCommodity (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.delete(`commodity/${payload.id}`, {}, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  updateCommodity (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.put(`commodity/${payload.id}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  publishCommodity (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity/${payload.id}/publish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  unpublishCommodity (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity/${payload.id}/unpublish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}