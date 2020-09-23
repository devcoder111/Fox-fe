
import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
    getOrderList(payload) {

        let URL = "trade/orders/history?All=" + payload.All;
        payload.History ? URL += "&History=" + payload.History : "";
        
        return API.get(URL, headers);
    },

    getTraderSingleOrderDetail(id) {
        return API.get(`trade/${id}`, headers);
    },

    cancelOneTrade(payload) {
        return API.post(`trade/${payload.id}/withdraw`, headers);
    },

    cancelAllRecentOrderTrade() {
        return API.post("trade/withdraw/all", headers);
    },

    reIssueTrader(payload) {
        return API.put(`trade/${payload.id}`, payload, headers);
    },

    activeTrade(payload) {
        return API.post(`trade/${payload}/active`);
    }
}