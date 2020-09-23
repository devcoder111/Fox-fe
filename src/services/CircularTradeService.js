import APIService from "@/apiservice.js";
import moment from 'moment';
const API = new APIService();
const headers = { 'Content-Type': 'application/json' };

export default class CircularTradeService {
  getCircularTrades () {
    return API.get(`circulartrades`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  searchCircularTrades (payload) {
    return API.post(`circulartrades/search`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addCircularTrades (payload) {
    return API.post(`circulartrades`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  exportCircularTrades (payload) {
    // let headers = { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
    return API.post(`circulartrades/export/excel?Count=${payload.count}&Page=${payload.page}`, {}, headers).then(res => {
      let blob = new Blob([res]);
      let openUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = openUrl;
      var timestamp = moment().format('YYYY-MM-DD.hh:mm:ss');
      link.setAttribute('download', `CircularTrade-${timestamp}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
      return res;
    }).catch(err => {
      throw err;
    });
  }
}
