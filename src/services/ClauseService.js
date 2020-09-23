import APIService from "@/apiservice.js";
const API = new APIService();
const headers = { 'Content-Type': 'application/json' };

export default class ClauseService {
  getBrokerageClauses () {
    return API.get(`brokerage-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addBrokerageClause (payload) {
    return API.post(`brokerage-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getPaymentClauses () {
    return API.get(`payment-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addPaymentClause (payload) {
    return API.post(`payment-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getQuantityClauses () {
    return API.get(`quantity-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addQuantityClause (payload) {
    return API.post(`quantity-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getRuleClauses () {
    return API.get(`rule-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addRuleClause (payload) {
    return API.post(`rule-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getStorageClauses () {
    return API.get(`storage-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addStorageClause (payload) {
    return API.post(`storage-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getWeightClauses () {
    return API.get(`weight-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addWeightClause (payload) {
    return API.post(`weight-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getFreightClauses () {
    return API.get(`freight-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addFreightClause (payload) {
    return API.post(`freight-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getInsuranceClauses () {
    return API.get(`insurance-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addInsuranceClause (payload) {
    return API.post(`insurance-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  getPriceClauses () {
    return API.get(`price-clauses`, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }

  addPriceClause (payload) {
    return API.post(`price-clauses`, payload, headers).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
}
