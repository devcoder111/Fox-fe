import APIService from "@/apiservice.js";
const API = new APIService();

export default class CommodityGradeService {
  getAllCommodityGrades (payload = {}) {
    let headers = { 'Content-Type': 'application/json' };
    return API.post(`commodity-grade/filter?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getGradesByCommodity (payload) {
    let headers = { 'Content-Type': 'application/json' };
    return API.get(`commodity-grade/commodity/${payload.id}`, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  addCommodityGrade (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('commodity-grade', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  updateCommodityGrade (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.put(`commodity-grade/${payload.id}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  publishCommodityGrade (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity-grade/${payload.id}/publish`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  unpublishCommodityGrade (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity-grade/${payload.id}/unpublish`, payload, headers).then(res => {
      console.log("ADMIN_UNPUBLISH_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  }

  setPrimaryCommodityGrade ( payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity-grade/${payload.id}/primary`, payload, headers).then(res => {
      console.log("ADMIN_SET_PRIMARY_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  }

  unsetPrimaryCommodityGrade (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post(`commodity-grade/${payload.id}/removeprimary`, payload, headers).then(res => {
      console.log("ADMIN_UNSET_PRIMARY_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  }

  deleteCommodityGrade (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.delete(`commodity-grade/${payload.id}`, {}, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}