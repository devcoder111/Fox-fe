<template>
  <v-app id="lateral">
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-btn icon >
        <router-link to="#" target="_self" class="v-underline md-blue-600--text" >
          <v-icon size="30" color="md-grey-300 darken2 grey--text " @click="$router.go(-1)">mdi-arrow-left</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title class="headline-text justify-center primary--text font-weight-bold v-header ml-3" >Recent orders: All</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-flex xs12 sm12 class="white pt-4">
      <v-card flat>
        <v-snackbar
          v-model="snackbar"
          absolute
          top
          center
          color="success"
        >
          <span>Canceled!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>
            <v-data-table
              :headers="computedHeader"
              :items="nonExpireData"
              hide-actions
              class="text-center justify-center"
              item-key="id"
              expand
            >
              <template slot="items" slot-scope="props">
                <tr :class="props.item.background" >
                  <td @click="props.expanded = !props.expanded" class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left" ><span :class="props.item.textColor+'--text'" class="font-weight-bold">{{ props.item.tradeData.tradeType }}</span></td>
                  <td class="text-xs-left" @click="$router.push({path: `/main/orderdetail/` + props.item.tradeId })">{{ props.item.tradeData.commodityName }}</td>
                  <td class="text-xs-left" @click="$router.push({path: `/main/orderdetail/` + props.item.tradeId })">{{ props.item.tradeData.deliveryPointName }}</td>
                  <td class="text-xs-left" @click="$router.push({path: `/main/orderdetail/` + props.item.tradeId })">{{ props.item.tradeData.deliveryPeriodName }}</td>
                  <td class="text-xs-right md-blue-600--text" aria-controls @click="actionOrder(props.item)">{{ props.item.tradeData.volume }}</td>
                  <td class="text-xs-right md-blue-600--text" aria-controls  @click="actionOrder(props.item)">{{ props.item.tradeData.price }}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props" v-if="props.item.isSpread">
                <v-data-table
                  :items="props.item"
                  item-key="name"
                  hide-actions
                  hide-headers
                >
                  <template v-slot:items="props">
                    <tr >
                      <td class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left">{{ props.item.name }}</td>
                      <td class="text-xs-left">{{ props.item.commodity }}</td>
                      <td class="text-xs-left">{{ props.item.deliveryPointName  }}</td>
                      <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold" >{{ props.item.volume }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold">{{ props.item.price }}</td>
                    </tr>                    
                  </template>
                </v-data-table>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat 
                large 
                color="md-deep-orange-500" 
                class="font-weight-bold pr-0"
                @click="cancelDialog = true, allFlag = 1"
              > CANCEL ALL </v-btn>
            </v-card-actions>
            <v-dialog v-model="cancelDialog" max-width="400px" persistent>
              <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
                <div class="text-center" align="center">
                  <v-card-text class="primary--text font-weight-bold display-1" large>Cancel Order</v-card-text>
                </div>
                <v-card-text class="" large>Are you sure you wish to cancel {{ allFlag == '1' ? "all orders" : "this order" }}?</v-card-text>
                <v-card-actions class="mt-5">
                  <v-btn flat 
                    @click="cancelClear"
                  >Abort</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn 
                    color="md-deep-orange-500 border-radius6"
                    @click="cancelSubmit" 
                    >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-card-text class="font-weight-bold pt-0">Expired</v-card-text>
            <v-data-table
              :headers="computedHeader"
              :items="expiredData"
              hide-actions
              class="text-center justify-center"
              item-key="id"
              expand
            >
              <template slot="items" slot-scope="props">
                <tr :class="props.item.background" >
                  <td @click="props.expanded = !props.expanded" class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left" ><span :class="props.item.textColor+'--text'" class="font-weight-bold">{{ props.item.tradeData.tradeType }}</span></td>
                  <td class="text-xs-left" @click="$router.push({path: `/main/orderdetail/` + props.item.tradeId })">{{ props.item.tradeData.commodityName }}</td>
                  <td class="text-xs-left" @click="$router.push({path: `/main/orderdetail/` + props.item.tradeId })">{{ props.item.tradeData.deliveryPointName }}</td>
                  <td class="text-xs-left" @click="$router.push({path: `/main/orderdetail/` + props.item.tradeId })">{{ props.item.tradeData.deliveryPeriodName }}</td>
                  <td class="text-xs-right md-blue-600--text" aria-controls @click="actionOrder(props.item)">{{ props.item.tradeData.volume }}</td>
                  <td class="text-xs-right md-blue-600--text" aria-controls  @click="actionOrder(props.item)">{{ props.item.tradeData.price }}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props" v-if="props.item.isSpread">
                <v-data-table
                  :items="props.item"
                  item-key="name"
                  hide-actions
                  hide-headers
                >
                  <template v-slot:items="props">
                    <tr >
                      <td class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left">{{ props.item.name }}</td>
                      <td class="text-xs-left">{{ props.item.commodity }}</td>
                      <td class="text-xs-left">{{ props.item.deliveryPointName  }}</td>
                      <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold" >{{ props.item.volume }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold">{{ props.item.price }}</td>
                    </tr>                    
                  </template>
                </v-data-table>
              </template>
            </v-data-table>
        <v-card min-height="100px" flat>
        </v-card>
        <v-dialog v-model="dialog" max-width="400px" persistent>
          <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
            <div class="text-center pl-4 pr-4" align="center">
              <v-card-text class="primary--text font-weight-bold mb-0 pb-0" large>{{ editedItem.tradeType }} Order - EDIT</v-card-text>
              <v-card-text class="primary--text mt-0 pt-0 ">You are <span class="primary--text font-weight-bold " style="text-transform: lowercase;">{{ editedItem.tradeType }}ing</span></v-card-text>
              <v-card-text class="primary--text mt-0 pt-0 "><span class="primary--text font-weight-bold">{{ editedItem.commodityName }} {{ editedItem.commodityGrade }}</span></v-card-text>
               <v-card-text class="primary--text mt-0 pt-0 "><span class="primary--text font-weight-bold">{{ editedItem.deliveryPointName }}</span></v-card-text>
              <v-card-text class="primary--text mt-0 pt-0 ">for <span class="primary--text font-weight-bold">{{ editedItem.deliveryPeriodName }}</span> period</v-card-text>
            </div>
            <v-form v-model="valid" ref="form" class="pl-3 pr-3">

              <v-text-field
                hint="Business rule warning TBA"
                label="Price $AUD"
                class="mb-3"
                required
                v-model="Eprice"
              ></v-text-field>

              <v-text-field
                hint="Business rule warning TBA"
                label="Volume (mt)"
                class="mb-3"
                required
                v-model="Evolume"
              ></v-text-field>
              <v-card-actions>
                <v-btn
                  flat 
                  color="md-deep-orange-500" 
                  class="font-weight-bold pr-0 pl-0"
                  @click="cancelDialog = true, allFlag = 2"
                > Cancel/Delete this Order > </v-btn>
              </v-card-actions>

              <v-card-actions class="mt-3">
                <v-btn flat @click="clear">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                  :disabled="!valid"
                  color="md-deep-orange-500 border-radius6"
                  @click="reIssueSubmit"
                  >
                  Re-issue
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-card>
    </v-flex>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { abbreviate } from '@/utils/helpers';
import { defaultUserPic, users, authUser, trades } from '@/data/dummyData';

export default {
  data() {
    return {
      admin: false,
      expanded: false,
      expand: false,
      dialog: false,
      cancelDialog: false,
      snackbar: false,
      fab: false,
      hidden: false,
      valid: true,
      tabs: null,
        page: {
            title: "2 - MAIN SCREENS / PROFILE",
            headline: "2 - MAIN SCREENS / PROFILE",
            description: ``
        },
        breadcrumbs: [
            {
                text: "2.3 - RECENT ORDERS - TRADER",
                disabled: false
            }
        ],
      headers: [
        {
          text: "ORDER",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "COMMODITY", value: "comm", sortable: false, align: "left"},
        { text: "Market", value: "deliveryPoint", sortable: false, align: "left"},
        { text: "DELIVERY PERIOD", value: "del", sortable: false, align: "left" },
        { text: "VOLUME", value: "vol", sortable: false, align: "right" },
        { text: "$", value: "currency", sortable: false, align: "right" }
      ],
      data: trades,
      editedIndex: -1,
      editedItem: {},
      allFlag: 0,
      Eprice: "",
      Evolume: ""

    };
  },
  computed: {
    ...mapGetters("trade", ['getOrderListData']),
    ...mapGetters('auth', ['user']),
    computedHeader() {
      return this.headers.map(item => {
        return {...item, text: abbreviate(item.text, 600)}
      });
    },
    nonExpireData() {
      return this.getOrderListData.filter(item => !item.tradeData.isExpired);
    },
    expiredData() {
      return this.getOrderListData.filter(item => item.tradeData.isExpired);
    }
  },
  methods: {
    ...mapActions("trade", {
      _getOrderList: "getOrderList",
      _cancelAllRecentOrderTrade: "cancelAllRecentOrderTrade",
      _cancelOneTrade: "cancelOneTrade",
      _reIssueTrader: "reIssueTrader"
    }),
    clear() {
      this.dialog = false;
        this.editedItem = {};
    },
    
    actionOrder(item) {
      this.editedItem = Object.assign({}, item.tradeData);
      this.Eprice = this.editedItem.price;
      this.Evolume = this.editedItem.volume;

      this.dialog = true;
    },
    
    async reIssueSubmit() {

      let payload = {};

      payload.id = this.editedItem.id;
      payload.tradeType = this.editedItem.tradeType;
      payload.commodityGradeId = this.editedItem.commodityGradeId;
      payload.deliveryPointId = this.editedItem.deliveryPointId;
      payload.deliveryPeriodId = this.editedItem.deliveryPeriodId;
      payload.volume = this.Evolume;
      payload.price = this.Eprice;
      payload.specialConditions = this.editedItem.specialConditions;
      payload.counterPartyGroupId  = [];
      this.editedItem.counterPartyGroups ? this.editedItem.counterPartyGroups.map(item => payload.counterPartyGroupId.push(item.id) ) : payload.counterPartyGroupId  = [];
      payload.duration = this.editedItem.duration;
      payload.userId = this.user.id;
      
      await this._reIssueTrader(payload);
      this.getOrderFunc();
      
      this.clear();
    },

    cancelClear() {
      this.cancelDialog = false;
    },
    async cancelSubmit() {
      let payload = {};

      switch(this.allFlag) {
        case 1:
          await this._cancelAllRecentOrderTrade();
          this.cancelDialog = false;
          break;
        case 2:
          payload.id = this.editedItem.id;

          await this._cancelOneTrade(payload);
          this.cancelDialog = false;
          this.dialog = false;
          break;

      }
    },
    async getOrderFunc() {
          let payload = {};

          payload.All = true;
          payload.History = "";

          await this._getOrderList(payload);
          this.data = this.getOrderListData;
          console.log(this.data);
      }

  },
  mounted() {
    this.getOrderFunc();
  }

};
</script>

<style scoped lang="stylus">
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-speed-dial,
#lateral .v-btn--floating {
  position: absolute;
}
#lateral .v-btn--floating {
  margin: 0 0 16px 16px;
}

.v-text-name {
  text-align: left !important;
  padding-left: 25px !important;
}

.v-text-action {
  text-align: right !important;
}

.v-sub-name {
  width: 17% !important;
}

.v-cursor {
  cursor: pointer;
}

table tbody tr td {
  font-size: 9px !important;
  height: 36px !important;
}

>>>table.v-table tbody td, >>>table.v-table thead th {
  padding: 0 5px !important;
}

table tbody tr {
  border-bottom: 1px solid rgba(0,0,0,0.12);
  border-top: 0px;
}

>>>table.v-table thead tr th {
  font-weight: 700 !important;
  color: #000 !important;
}

.v-wheat-table tbody tr td, .v-wheat-table thead tr th {
  padding: 0 0 !important;
  text-align: center !important;
  width: initial !important;
  font-size: 10px !important;
}

</style>
