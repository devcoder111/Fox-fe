import APIService from '@/apiservice'

const API = new APIService()
const headers = { 'Content-Type': 'application/json-patch+json' };

export default {
    addDeliveryPointBookmark(payload) {
        return API.post("user-bookmark/add", payload, headers);
    },

    destroyDeliveryPointBookmark(payload) {
        var payloadStr = "";
        payload.ids.map( item => payloadStr += "ids=" + item + "&" );

        return API.delete(`user-bookmark?${payloadStr}`, headers );

    },

}