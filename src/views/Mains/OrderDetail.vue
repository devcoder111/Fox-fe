<template>
  <v-app>
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-btn icon >
        <router-link to="#" target="_self" class="v-underline md-blue-600--text">
          <v-icon size="30" color="md-grey-300 darken2 grey--text " @click="$router.go(-1)">mdi-arrow-left</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title class="headline-text justify-center primary--text font-weight-bold v-header ml-3" >SELL - Order details</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-flex xs12 sm12 class="white pt-4" if="!detailData.length">
      <v-card min-height="450px" flat>
        <v-card-text class="mt-3 v-text-center" >
          {{detailData.commodity}} {{detailData.commodityGrade}} {{ detailData.deliveryPointName }} for {{ detailData.deliveryPeriodName }}.
        </v-card-text>
        <v-card-text class="v-text-center">
          {{ detailData.volume }} mt @ ${{ detailData.price }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ["id"],
  data() {
    return {
      admin: false,
      expanded: false,
      page: {
        title: "2 - MAIN SCREENS / PROFILE",
        headline: "2 - MAIN SCREENS / PROFILE",
        description: ``
        },
      breadcrumbs: [
        {
            text: "2.5 - VIEW ORDER",
            disabled: false
        }
      ],

      headers: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "date"
        },
        { text: "VOL", icon: "", value: "vol1", sortable: false, align: "center"},
        { text: "BID", icon: "add_circle_outline", value: "bid", sortable: false, align: "center"},
        { text: "OFFER", icon: "add_circle_outline", value: "offer", sortable: false, align: "center" },
        { text: "VOL", icon: "", value: "vol2", sortable: false, align: "center" },
      ],
      detailData: {},
    };
  },
  computed: {
    ...mapGetters("trade", ['getOrderDetail']),
    
  },

  methods: {
    ...mapActions("trade", {
      _getTraderSingleOrderDetail: 'getTraderSingleOrderDetail'
    })
  },

  async mounted() {
    await this._getTraderSingleOrderDetail(this.id);
    this.detailData = this.getOrderDetail;
    console.log(this.detailData);
  }
};
</script>

<style scoped>
.v-bid-offer {
  vertical-align: super !important;
}

.v-wheat-table tbody tr td, .v-wheat-table thead tr th {
  padding: 0 2 !important;
  text-align: center !important;
  width: initial !important;
  font-size: 12px !important;
}
</style>