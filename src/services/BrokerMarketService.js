import APIService from "@/apiservice.js";
const API = new APIService();
const headers = { 'Content-Type': 'application/json-patch+json' };

export default class BrokerMarketService {
  getAllBrokerMarkets (payload) {
    return API.post(`brokermarkets/search?Count=${payload.count}&Page=${payload.page}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addBrokerMarket (payload) {
    return API.post('brokermarkets', payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  updateBrokerMarket (payload) {
    return API.put(`brokermarkets/${payload.id}`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  deleteBrokerMarkets (payload) {
    return API.delete('brokermarkets', payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}
