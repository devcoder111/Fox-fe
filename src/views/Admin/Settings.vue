<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>{{icon}}</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
      </v-toolbar>

      <v-flex xs12>
        <v-tabs slot="extension" v-model="tabs" color="white" grow>
          <v-tab href="#one" class="font-weight-bold text-capitalize v-custom-tab">Settings</v-tab>
          <v-tab href="#two" class="font-weight-bold text-capitalize v-custom-tab">Trading Hours</v-tab>
          <v-tab href="#three" class="font-weight-bold text-capitalize v-custom-tab">Notifications</v-tab>
          <v-tabs-slider color="primary"></v-tabs-slider>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item value="one">
            <v-flex xs12 sm12 class="grey-100 white pt-4">
              <v-layout row wrap>
                <v-flex xs4 sm3 md2 offset-sm3 offset-md3>
                  <v-subheader>Brokerage Rate</v-subheader>
                </v-flex>
                <v-flex xs8 sm4 md3>
                  <v-text-field prefix="$" suffix="per tonne" type="number" v-model="brokerageRate"></v-text-field>
                </v-flex>
                <v-flex xs4 sm3 md2 offset-sm3 offset-md3>
                  <v-subheader>Default Expiry</v-subheader>
                </v-flex>
                <v-flex xs8 sm4 md3>
                  <v-text-field suffix="mins" type="number" v-model="defaultExpiry"></v-text-field>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn color="md-deep-orange-500" :loading="saveLoading" @click="saveSettings">Save</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-tab-item>
          <v-tab-item value="two">
            <v-form lazy-validation v-model="tradingHoursValid" ref="form">
              <v-flex xs12 sm12 class="grey-100 white pt-4">
                <v-layout row wrap v-for="(dayData, index) in hours" :key="index">
                  <v-flex xs3 sm3 md2 offset-sm3 offset-md-2>
                    <v-subheader>{{dayData['dayOfWeek']}}</v-subheader>
                  </v-flex>
                  <v-flex xs9 sm5 md5 lg3>
                    <v-layout row wrap>
                      <v-flex xs5>
                        <v-text-field
                          label="Start at"
                          mask="time"
                          :disabled="!dayData['isOpened']"
                          v-model="dayData['openTime']"
                          :rules="timeRule"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs5>
                        <v-text-field
                          label="End at"
                          mask="time"
                          :disabled="!dayData['isOpened']"
                          v-model="dayData['closeTime']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs1>
                        <v-switch :true-value="true" v-model="dayData['isOpened']"></v-switch>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 text-xs-center>
                <v-btn color="md-deep-orange-500" @click="saveTradingHours">Save</v-btn>
              </v-flex>
            </v-form>
          </v-tab-item>

          <v-tab-item value="three">
            <v-flex xs12 sm12 class="grey-100 white pt-4">
              <v-layout row wrap v-for="(notifyData, notifyId) in notifyMessages" :key="notifyId">
                <v-flex xs12>
                  <v-subheader class="justify-center display-subheading-2">{{notifyData.notifyType}}</v-subheader>
                </v-flex>
                <v-flex xs12 sm2 md2 offset-sm3 offset-md-2>
                  <v-layout row wrap>
                    <v-flex xs12 sm12 class="mb-0 mt-0 pt-0 pb-0 d-flex justify-space-between">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            :color="notifyData.push ? 'blue' : 'grey'"
                            @click="notifyData.push = !notifyData.push"
                          >sms_failed</v-icon>
                        </template>
                        <span>Push notification</span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            :color="notifyData.sms ? 'blue' : 'grey'"
                            @click="notifyData.sms = !notifyData.sms"
                          >textsms</v-icon>
                        </template>
                        <span>Text SMS</span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            v-on="on"
                            :color="notifyData.email ? 'blue' : 'grey'"
                            @click="notifyData.email = !notifyData.email"
                          >email</v-icon>
                        </template>
                        <span>Email</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm5 md5 lg3>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        label="Subject"
                        v-model="notifyData.subject"
                        :disabled="!notifyData.push && !notifyData.sms && !notifyData.email"
                      ></v-text-field>
                      <v-text-field
                        label="Body"
                        v-model="notifyData.body"
                        :disabled="!notifyData.push && !notifyData.sms && !notifyData.email"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 text-xs-center>
              <v-btn color="md-deep-orange-500" @click="saveNotification" :loading="notificationLoading">Save</v-btn>
            </v-flex>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "settings",
      title: "System Settings",
      brokerageRate: null,
      defaultExpiry: null,
      tabs: null,
      start: null,
      end: null,
      hours: [],
      notifyMessages: [],
      saveLoading: false,
      timeRule: [
        (v) => !!v || 'This field is required',
        (v) => (!!v && (parseInt(v.substring(0,2)) < 24 && parseInt(v.substring(2,4)) < 60)) || 'This field should be valid',
      ],
      tradingHoursValid: null,
      notificationLoading: false
    };
  },
  computed: {

  },
  methods: {
    ...mapActions("settings", {
      getSettings: "getSettings",
      setSettings: "setSettings",
      getTradingHours: "getTradingHours",
      getWeeklyTradingHours: "getWeeklyTradingHours",
      setWeeklyTradingHours: "setWeeklyTradingHours",
      getNotifications: "getNotifications",
      updateNotifications: "updateNotifications"
    }),
    saveNotification() {
      this.notificationLoading = true;
      return this.updateNotifications(this.notifyMessages)
      .then(res => {
        this.notificationLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
    },
    saveSettings() {
      this.saveLoading = true;
      let payload = {
        brokerageRate: this.brokerageRate,
        defaultExpiry: this.defaultExpiry,
      };
      this.setSettings(payload).then(res => {
        this.saveLoading = false;
      });
    },
    saveTradingHours() {
      if (this.$refs.form.validate()) {
        let payload = this.convertStringToTime();
        this.setWeeklyTradingHours(payload).then(res => {
          console.log(res);
        }).catch(err => {
          // handle error
        });
      }
    },
    convertTimeToString() {
      for (let i = 0; i < this.hours.length; i ++) {
        let tmp1 = this.hours[i].closeTime;
        let tmp2 = this.hours[i].openTime;
        this.hours[i].closeTime = tmp1.length > 5 ? tmp1.substring(0,5).split(':').join('') : this.hours[i].closeTime;
        this.hours[i].openTime = tmp2.length > 5 ? tmp2.substring(0,5).split(':').join('') : this.hours[i].openTime;
      }
    },
    convertStringToTime() {
      let res = Object.assign([], this.hours);
      for (let i = 0; i < res.length; i ++) {
        let tmp1 = res[i].closeTime;
        let tmp2 = res[i].openTime;
        res[i].closeTime = tmp1.length < 5 ? [tmp1.substring(0,2), ':', tmp1.substring(2,4), ':00.00000'].join('') : res[i].closeTime;
        res[i].openTime = tmp2.length < 5 ? [tmp2.substring(0,2), ':', tmp2.substring(2,4), ':00.00000'].join('') : res[i].openTime;
      }
      return res;
    }
  },
  mounted() {
    this.getSettings().then(res => {
      this.brokerageRate = res.brokerageRate;
      this.defaultExpiry = res.defaultExpiry;
    });

    this.getNotifications().then(res => {
      this.notifyMessages = Object.assign([], res);
    });

    let tmp = [];

    for (let i = 0; i < 7; i ++) {
      tmp.push({
        openTime: "0830",
        closeTime: "2030",
        isOpened: true
      });
    }

    this.getWeeklyTradingHours().then(res => {
      for (let i = 0; i < res.length; i ++) {
        if (res[i] == null) {
          tmp[i].isOpened = false;
        } else {
          tmp[i] = Object.assign({}, res[i]);
        }
      }
      this.hours = Object.assign([], tmp);
      this.convertTimeToString();
    });
  }
};
</script>

<style lang="stylus" scoped>
>>>.unstyled input[type='number'] {
  -moz-appearance: textfield;
}

>>>.unstyled input::-webkit-outer-spin-button, >>>.unstyled input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>