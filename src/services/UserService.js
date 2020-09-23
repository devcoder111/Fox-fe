import APIService from "@/apiservice.js";
const API = new APIService();
const headers = { 'Content-Type': 'application/json' };

export default class UserService {
  getUserList (params) {
    let payload = {
      "hasFilter": false,
      "filters": [
        {
          "fieldName": "string",
          "value": {},
          "operator": 0,
          "tablePrefix": "string"
        }
      ]
    }
    return API.post(`admin/users/filter?Count=${params.count}&Page=${params.page}`, payload, headers).then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  }

  getProfileInfo() {
    return API.get("users/profile", headers);
  }
}
