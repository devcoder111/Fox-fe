<template>
  <v-app>
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-btn icon @click="$router.go(-1)">
          <v-icon size="30" color="md-grey-300 darken2 grey--text ">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="headline-text justify-center primary--text font-weight-bold v-header ml-3" >Farm Access</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
      <v-flex xs12 sm12 class="white">
        <v-card
          flat
        >
          <v-container grid-list-xl fluid class="pl-4 pr-4">
              <v-checkbox v-model="roadTrain" label="Road train access" color="md-blue-600" class="display-paragraph-3"></v-checkbox>
              <v-checkbox v-model="bDoubleAccess" label="B-double access" class="mt-0" color="md-blue-600"></v-checkbox>
              <v-checkbox v-model="ownTransport" label="Own transport" class="mt-0" color="md-blue-600"></v-checkbox>
              <v-checkbox v-model="sevenDayAccess" label="7 day access" class="mt-0" color="md-blue-600"></v-checkbox>
              <v-card-text
                class="pl-0 pr-0 pb-0 mt-2"
              >
                Other details relevant to your farm access, including local GTA approved BHA depot
              </v-card-text>
              <v-textarea
              counter
              name="input-7-4"
              class="pt-0"
              row="3"
              v-model="details"
              ></v-textarea>
              <v-card-actions class="justify-center mt-5 mb-4">
              <v-btn 
                  type="button"
                  @click="settingFarmAccess()"
                  large 
                  xs12 
                  class="border-radius8 md-deep-orange-500 font-weight-bold" block >
                  UPDATE
              </v-btn> 
              </v-card-actions>
          </v-container>
        </v-card>
      </v-flex>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
    admin: false,
    page: {
        title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        description: ``
      },
    breadcrumbs: [
    {
        text: "1.4 - GROWER FARM ACCESS SETTINGS",
        disabled: false
    }
    ],
    roadTrain: "",
    ownTransport: "",
    bDoubleAccess: "",
    sevenDayAccess: "",
    details: "",

    };
  },

  methods: {
    ...mapActions("farmAccess", {
      _getFarmAccessSetting: "getFarmAccessSetting",
      _setFarmAccess: "setFarmAccess",
      _updateFarmAccess: "updateFarmAccess"
    }),

    async settingFarmAccess() {
      
      let payload = {};
      payload.companyId = this.user? this.user.companyId: "";
      payload.roadTrain = this.roadTrain;
      payload.wetWeather = true;
      payload.ownTransport = this.ownTransport;
      payload.localDepot = true;
      payload.bDoubleAccess = this.bDoubleAccess;
      payload.sevenDayAccess = this.sevenDayAccess;
      payload.details = this.details;
      payload.id = this.getFarmAccessSettingData? this.getFarmAccessSettingData.id: "";

      payload.id ? await this._setFarmAccess(payload) : await this._updateFarmAccess(payload);
      await this._getFarmAccessSetting(payload);
    },
  },

  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('farmAccess', ['getFarmAccessSettingData'])
  },

  async mounted() {
    let payload = {};
    payload.companyId = this.user? this.user.companyId: "";
    
    await this._getFarmAccessSetting(payload);

    if(this.getFarmAccessSettingData) {
      this.roadTrain = this.getFarmAccessSettingData.roadTrain;
      this.ownTransport = this.getFarmAccessSettingData.ownTransport;
      this.bDoubleAccess = this.getFarmAccessSettingData.bDoubleAccess;
      this.sevenDayAccess = this.getFarmAccessSettingData.sevenDayAccess;
      this.details = this.getFarmAccessSettingData.details;
    }
    
  }
};
</script>

<style scoped>
.v-btn {
  color: white !important;
}

.subtitle-2 {
   text-align: center;
}

.json-pre {
  min-height: 748px;
  max-height: 748px;
  height: 748px;
  overflow-y: auto;
}

.v-input__append-outer {
  position: absolute !important;
  top: 50% !important;
}
</style>
