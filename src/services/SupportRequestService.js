import APIService from "@/apiservice.js";
const API = new APIService();
const headers = { 'Content-Type': 'application/json' };

export default class SupportRequestService {
  getSupportRequestList (payload = {}) {
    return API.post(`supportRequest/filter?Count=${payload.Count}&Page=${payload.Page}`, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  addSupportRequest (payload) {
    return API.post(`supportRequest`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  deleteSupportRequest (payload) {
    return API.delete(`supportRequest/${payload.id}`, {}, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  markAsReadSupportRequest (payload) {
    return API.put(`supportRequest/markAsRead`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  markAsActionedSupportRequest (payload) {
    return API.put(`supportRequest/markAsActioned`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  markAsRejectedSupportRequest (payload) {
    return API.put(`supportRequest/markAsRejected`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getGrowerSupportRequest (payload) {
    let url = `supportRequest/filter/registration-grower?isIncludeRejected=${payload.isIncludeRejected}&Count=${payload.count}&Page=${payload.page}`;
    if (payload.keyword) {
      url += `&keyword=${payload.keyword}`;
    }
    return API.post(url, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}
