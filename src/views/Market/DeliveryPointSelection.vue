<template>
  <div>
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-flex xs12 sm12 v-if="searchFlag" style="margin-top: 12px;">
        <v-text-field
          v-model="searchData"
          label="Search"
          v-on:keyup="filterCounterParties"
        ></v-text-field>
      </v-flex>
      <v-btn icon to="/market/commodity" v-if="!searchFlag">
        <v-icon size="30" color="md-grey-300 darken2 grey--text " >mdi-arrow-left</v-icon>
      </v-btn>
      <h1 v-if="!searchFlag" class="display-1 justify-center primary--text font-weight-bold" >Delivery Point</h1>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="md-deep-orange-500" @click="searchFunc()">{{ searchFlag ? 'close' : 'search'}}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      center
      xs12 sm3
      color="success"
    >
      <span>Submitted - You will be contacted.</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
      <v-flex xs12 sm12>
        <v-card flat>
          <v-card-text 
              class="mb-0 pb-0 d-flex font-weight-bold display-header-4 pr-3"
          >   {{commName}} Market
              <v-spacer></v-spacer>
              <span class="grey--text subtitle1 text-xs-right text-lg-right pr-1"><v-icon class="md-deep-orange-500--text " @click="pointBookmark(!bookmarkAll, null, null)" >{{ bookmarkAll ? 'bookmark' : 'bookmark_border' }}</v-icon> {{counter}}/ {{ tmpData.length }}</span>
          </v-card-text>
          <v-list two-line >
              <v-subheader class="v-custom-sub black--text font-weight-bold">Primary Delivery Points</v-subheader>
              <v-divider></v-divider>
              <template v-for="(data, index) in tmpData" >
                  <v-list-tile
                      :key="index"
                      avatar
                      ripple
                      v-if="!data.publicVisibility"
                  >
                    <v-list-tile-content>
                        <v-list-tile-title class="display-paragraph-3">{{ data.name }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-icon class="md-deep-orange-500--text v-cursor" color="darken2 black--text " @click="pointBookmark(!data.isBookmarked, data.id, data.bookmarkId)">{{ data.isBookmarked ? 'bookmark' : 'bookmark_border' }}</v-icon>
                    <!--v-icon color="darken2 black--text "  >chevron_right</v-icon-->

                    <v-btn icon class="mr-0 ml-0">
                        <v-icon @click="sendingData(data.id, data.name, data.isBookmarked)" color="darken2 black--text " >chevron_right</v-icon>
                    </v-btn>

                  </v-list-tile>
                  <v-divider
                      v-if="index < tmpData.length && !data.publicVisibility"
                      :key="index"
                  ></v-divider>
              </template>
          </v-list>
          <v-list two-line >
              <v-subheader class="v-custom-sub black--text font-weight-bold">Secondary Delivery Points</v-subheader>
              <v-divider></v-divider>
              <template v-for="(data, index) in tmpData" >
                  <v-list-tile
                      :key="index"
                      avatar
                      ripple
                      v-if="data.publicVisibility"
                  >
                      <v-list-tile-content>
                        <v-list-tile-title class="display-paragraph-3">{{ data.name }}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-icon class="md-deep-orange-500--text v-cursor" color="darken2 black--text " @click="pointBookmark(!data.isBookmarked, data.id, data.bookmarkId)">{{ data.isBookmarked ? 'bookmark' : 'bookmark_border' }}</v-icon>
                      
                      <v-btn icon class="mr-0 ml-0">
                        <router-link to="#" target="_self" class="v-underline grey--text">
                          <v-icon color="darken2 black--text ">chevron_right</v-icon>
                        </router-link>
                      </v-btn>
                  </v-list-tile>
                  <v-divider
                      v-if="index < tmpData.length && data.publicVisibility"
                      :key="index"
                  ></v-divider>
              </template>
          </v-list>
          <span class="v-underline md-blue-600--text pl-3" aria-controls @click="requestDialog = true">
              <small>Delivery Point not listed? Request addition</small>
          </span>
          <v-card min-height="100px" flat>
          </v-card>
        </v-card>
        <v-dialog v-model="requestDialog" max-width="400px" persistent>
          <v-form 
            ref="form"
            v-model="formValid"
            lazy-validation>
            <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
              <v-card-title class="primary--text font-weight-bold display-1" large>
                Request a Delivery Point
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="newDeliveryPoint" :rules="nameRules" required label="Name"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn flat @click.native="close">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="md-deep-orange-500 border-radius6" @click.native="request">Request</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-flex>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ['commName', 'commId'],
  data() {
    return {
      formValid: null,
      newDeliveryPoint: null,
      snackbar: false,
      requestDialog: false,
      admin: false,
      expanded: false,
      page: {
        title: "4 - MARKET",
        headline: "4 - MARKET",
        description: ``
      },
      breadcrumbs: [
        {
            text: "4.2 - DELIVERY POINT SELECTION",
            disabled: false
        }
      ],
      primaryPoints: [],
      secondaryPoints: [],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      searchFlag: false,
      searchData: "",
      bookmarkAll: false,
      tmpData: [],
      userInfo: []
    };
  },
  watch: {
    searchData(text) {
      if(!text) { this.getDeliveryPointFunc(); }
    }
  },
  methods: {
    ...mapActions("deliveryPoint", {
      _getDeliveryPointSelection: "getDeliveryPointSelection",
      _addNewDeliveryPointSelection: "addDeliveryPoint",
    }),
    ...mapActions("userBookmark", {
      _addDeliveryPointBookmark: "addDeliveryPointBookmark",
      _destroyDeliveryPointBookmark: "destroyDeliveryPointBookmark"

    }),
    sendingData(deliId, delName, bookmark) {
      localStorage.setItem("deliId", deliId);
      localStorage.setItem("commoId", this.commId);

      this.$router.push({ path: '/market/trade/' + this.commName + '/' + delName + '/' + bookmark });
    },
    async request() {
      if (this.$refs.form.validate()) {
        this.requestDialog = false;

        let payload = {};
        payload.name = this.newDeliveryPoint;
        payload.publicVisibility = 0;
        payload.description = "";
        payload.public = false;

        await this._addNewDeliveryPointSelection(payload);
        this.getDeliveryPointFunc();

        this.newDeliveryPoint = null;
        this.snackbar = true;
      }
    },
    close() {
      this.newDeliveryPoint = null;
      this.requestDialog = false;
    },
 
    searchFunc() {
      this.searchFlag = !this.searchFlag;
      this.searchData = "";
    },

    async pointBookmark(isBookmark, id, bookmarkId) {

      console.log(isBookmark)
      console.log(id)
      console.log(bookmarkId)

      var payload = {};
      
      switch(isBookmark) {
        case true:

          payload.userId = this.user.id;
          payload.commodityId = this.commId;
          payload.deliveryPointIds = [];

          id != null ? payload.deliveryPointIds.push(id) : this.tmpData.map( item => {payload.deliveryPointIds.push(item.id); item.isBookmarked = true} );
          
          await this._addDeliveryPointBookmark(payload).then(res => {
            this.getDeliveryPointFunc();
          }).catch(err => {});
          break;
        case false:
          payload.ids = [];
          bookmarkId != null ? payload.ids.push(bookmarkId) : this.tmpData.map( item => {payload.ids.push(item.bookmarkId); item.isBookmarked = false} );
          await this._destroyDeliveryPointBookmark(payload).then (res => {
            this.getDeliveryPointFunc();
          }).catch(err => {});
          break;
      }
    },

    async getDeliveryPointFunc() {
      let payload = {};
      payload.commId = this.commId;
      payload.filter = this.searchData;

      await this._getDeliveryPointSelection(payload);
      let res = this.getDeliveryPointsSelctionData;
      this.tmpData = (res.deliveryPoints).length ? res.deliveryPoints.filter( item => item.public ) : [];
      this.bookmarkAll = res.isBookmarkAll || (res.deliveryPoints.filter( item => item.public ).length == res.deliveryPoints.filter( item => item.isBookmarked ).length) ? true : false;
    },

    async filterCounterParties(e) {
      if(e.keyCode === 13) {
        this.getDeliveryPointFunc();
      }
    }

  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('deliveryPoint', ['getDeliveryPointsSelctionData']),
    counter() {
      return this.tmpData.length ? this.tmpData.filter( item => item.isBookmarked ).length : 0;
    }
  },
  mounted() {
    this.getDeliveryPointFunc()
  }
};
</script>

<style scoped lang="stylus">
.v-bid-offer {
  vertical-align: super !important;
}

.v-wheat-table tbody tr td, .v-wheat-table thead tr th {
  padding: 0 0 !important;
  text-align: center !important;
  width: initial !important;
  font-size: 12px !important;
}

.v-list--two-line .v-list__tile {
    height: 48px !important;
}

>>>.v-list--two-line .v-list__tile {
  height: 50px !important;
}
</style>