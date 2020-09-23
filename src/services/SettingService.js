import APIService from "@/apiservice.js";
const API = new APIService();

export default class SettingService {
  //setting
  getSettings () {
    let headers = { 'Content-Type': 'application/json' };
    return API.get(`settings/info`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  setSettings (payload) {
    let headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('settings', payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  //Trading Hours
  getTradingHours () {
    let headers = { 'Content-Type': 'application/json' };
    return API.get(`tradinghours`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getWeeklyTradingHours () {
    let headers = { 'Content-Type': 'application/json' };
    return API.get(`tradinghours/week`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  setWeeklyTradingHours (payload) {
    let headers = { 'Content-Type': 'application/json' };
    return API.put(`tradinghours/week`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  //notification
  getNotifications () {
    let headers = { 'Content-Type': 'application/json' };
    return API.get(`notifications`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  updateNotifications (payload) {
    let headers = { 'Content-Type': 'application/json' };
    return API.put(`notifications`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}
