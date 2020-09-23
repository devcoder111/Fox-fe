import Vue from "vue"
import moment from 'moment'

function dateFormat(date, format) {
  if (!date) {
    return "";
  }

  if (format && format.length > 0) {
    return moment(date).format(format);
  }

  return moment(date).format("DD/MM/YYYY");
}

export default {
  install(Vue) {
    Vue.filter('dateFormat', dateFormat)
  }
}