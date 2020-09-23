<template>
  <div id="lateral">
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-btn icon>
      </v-btn>
      <h1 class="display-1 justify-center primary--text font-weight-bold" ></h1>
      <v-tabs slot="extension" v-model="tabs" color="transparent" grow>
        <v-tab href="#one" class="font-weight-bold text-capitalize v-custom-tab" @click="getOrderFunc(0)" style="width: 50% !important">Orders</v-tab>
        <v-tab href="#two" class="font-weight-bold text-capitalize v-custom-tab text-xs-left" style="width: 50% !important;" >History
          <v-flex xs12 sm4 md4 >
            <v-menu
              style="margin-top: 7px !important;"
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFormatted"
                prepend-icon="event"
                readonly
                @blur="date = parseDate(dateFormatted)"
                style="font-size: 9px !important;"
              ></v-text-field>
              <v-date-picker v-model="date" no-title @input="menu = false" >
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-tab>
        <v-tabs-slider color="primary" ></v-tabs-slider>
      </v-tabs>
    </v-toolbar>
    <v-flex xs12 sm12 class="white pt-4">
      <v-card flat>
        <v-tabs-items v-model="tabs">
          <v-tab-item key="one" value="one" >
            <v-data-table
              :headers="computedHeader"
              :items="data"
              hide-actions
              class="text-center justify-center"
              item-key="id"
              expand
            >
              <template slot="items" slot-scope="props">
                <tr :class="props.item.background" >
                  <td  @click="props.expanded = !props.expanded" class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left" ><span :class="props.item.textColor+'--text'" class="font-weight-bold">{{ props.item.tradeType }}<v-icon size="16" v-if="props.item.isSpread" >keyboard_arrow_up</v-icon></span></td>
                  <td class="text-xs-left">{{ props.item.tradeData.commodityName }}</td>
                  <td class="text-xs-left">{{ props.item.posted | dateFormat }}</td>
                  <td class="text-xs-left">{{ props.item.tradeData.deliveryPeriodName }}</td>
                  <td class="text-xs-right md-blue-600--text" aria-controls @click="actionOrder(props.item)">{{ props.item.tradeData.volume }}</td>
                  <td class="text-xs-right md-blue-600--text" aria-controls @click="actionOrder(props.item)">{{ props.item.tradeData.price }}</td>
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
                      <td class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left">{{ props.item.tradeData.tradeType }}</td>
                      <td class="text-xs-left">{{ props.item.tradeData.commodityName }}</td>
                      <td class="text-xs-left">{{ props.item.posted | dateFormat}}</td>
                      <td class="text-xs-left">{{ props.item.tradeData.deliveryPeriodName }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold" >{{ props.item.tradeData.volume }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold">{{ props.item.tradeData.price }}</td>
                    </tr>                    
                  </template>
                </v-data-table>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item key="two" value="two" >
            <v-data-table
              :headers="computedHeader"
              :items="filterData"
              hide-actions
              class="text-center justify-center"
              item-key="id"
              expand
            >
              <template slot="items" slot-scope="props">
                <tr :class="props.item.background" >
                  <td @click="props.expanded = !props.expanded" class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left" ><span :class="props.item.textColor+'--text'" class="font-weight-bold">{{ props.item.tradeData.tradeType }}</span></td>
                  <td class="text-xs-left">{{ props.item.tradeData.commodityName }}</td>
                  <td class="text-xs-left">{{ props.item.posted | dateFormat }}</td>
                  <td class="text-xs-left">{{ props.item.tradeData.deliveryPeriodName }}</td>
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
                      <td class="text-xs-left">{{ props.item.date  }}</td>
                      <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold" >{{ props.item.volume }}</td>
                      <td class="text-xs-right md-blue-600--text font-weight-bold">{{ props.item.price }}</td>
                    </tr>                    
                  </template>
                </v-data-table>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
        <v-card min-height="100px" flat>
        </v-card>
        <v-dialog v-model="actionDialog" max-width="400px">
            <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
                <div class="text-center" align="center">
                    <v-card-text class="primary--text font-weight-bold headline mb-0 pb-0" large>Action on {{ action.tradeType == "Offer" || action.tradeType == "Sell" ? "Offer [C.Offer]" : "Bid [C.Bid]" }}</v-card-text>
                    <v-card-text class="mt-0 pt-0 "><span class="primary--text font-weight-bold">{{ Object.entries(action).length !== 0 ? action.tradeData.commodityName : "" }}...{{ Object.entries(action).length !== 0 ? action.tradeData.volume : "" }}mt @ {{ Object.entries(action).length !== 0 ? action.tradeData.price : "" }}</span></v-card-text>
                </div>
                <v-card-actions class="mt-5">
                    <v-btn 
                        color="md-deep-orange-500 border-radius6"
                        @click="confirmCounter()"
                        block
                    >
                        Counter {{ action.tradeType == "Offer" || action.tradeType == "Sell" ? "Bid" : "Offer" }}
                    </v-btn>
                    <v-btn 
                        color="md-deep-orange-500 border-radius6"
                        block
                        @click = "confirmAction()"
                    >
                        {{ action.tradeType == "Offer" || action.tradeType == "Sell" ? "Buy" : "Sell" }}
                    </v-btn>
                </v-card-actions>
                <v-btn 
                    color="md-deep-orange-500 border-radius6"
                    class="d-flex justify-center d-none"
                >
                    Reject
                </v-btn>
            </v-card>
        </v-dialog>
        <v-dialog v-model="confirmDialog" max-width="400px">
          <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
            <div class="text-center pl-4 pr-4" align="center">
              <v-card-text class="primary--text font-weight-bold display-1 mb-0 pb-0" large>{{ action.tradeType == "Offer" ? "Buy" : "Sell" }}</v-card-text>
              <v-card-text class="mt-0 pt-0 ">You are <span class="primary--text font-weight-bold">{{ action.tradeType == "Offer" ? "buying" : "selling" }} {{Object.entries(action).length !== 0 ? action.tradeData.commodityName : "" }} {{Object.entries(action).length !== 0 ? action.commodityGrade: ""}} {{Object.entries(action).length !== 0 ? action.tradeData.deliveryPointName: ""}} </span>for <span class="primary--text font-weight-bold">{{Object.entries(action).length !== 0 ? action.tradeData.deliveryPeriodName : ""}}</span> period</v-card-text>
            </div>
            <v-form v-model="valid" ref="form" class="pl-3 pr-3">

              <v-text-field
                hint="Business rule warning TBA"
                label="Price $AUD"
                class="mb-3"
                :value="Object.entries(action).length !== 0 ? action.tradeData.price : '' "
                disabled
                required
              ></v-text-field>

              <v-text-field
                hint="Business rule warning TBA"
                label="Volume (mt)"
                class="mb-3"
                :value="Object.entries(action).length !== 0 ? action.tradeData.volume : ''"
                disabled
                required
              ></v-text-field>
              <v-card-text class="ml-0 mt-0 pt-0 pl-0">Conditions of Sale:</v-card-text>
              <v-card-text class="ml-0 mt-0 pt-0 pl-0"><small>***Fox to Provide***</small></v-card-text>
              <v-card-actions class="mt-5">
                <v-btn flat @click="confirmDialog = false" block>Close</v-btn>
                <v-btn 
                  :disabled="!valid"
                  color="md-deep-orange-500 border-radius6"
                  block
                  @click="confirmProcess()"
                  >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="counterDialog" max-width="400px">
          <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
            <div class="text-center pl-4 pr-4" align="center">
              <v-card-text class="primary--text font-weight-bold display-1 mb-0 pb-0" large>Counter {{ action.type }}</v-card-text>
              <v-card-text class="mt-0 pt-0 ">You are re-countring to <span class="primary--text font-weight-bold">{{ action.type == "Offer" ? "sell" : "buy" }} APW Wheat CSC-11 Brisbane Track </span>for <span class="primary--text font-weight-bold">March 2020</span> period</v-card-text>
            </div>
            <v-form v-model="valid" ref="form" class="pl-3 pr-3">
                <v-select
                    :items="expireDuration"
                    label="Duration(Expiry in mins)"
                >
                </v-select>
              <v-text-field
                hint="Business rule warning TBA"
                label="Price $AUD"
                class="mb-3"
                :value="action.price"
                required
              ></v-text-field>

              <v-text-field
                hint="Business rule warning TBA"
                label="Volume (mt)"
                class="mb-3"
                :value="action.volume"
                required
              ></v-text-field>
              <v-card-text class="v-text-center ml-0 mt-0 pt-0 pl-0">Note: The {{ action.type == "Offer" ? "seller" : "buyer" }} will be presented the {{  }}. You will be notified if accepted or rejected within X hours.</v-card-text>
              <v-card-actions >
                <v-btn flat @click="counterDialog = false" block>Close</v-btn>
                <v-btn 
                  :disabled="!valid"
                  color="md-deep-orange-500 border-radius6"
                  block
                  >
                  Confirm {{ action.type }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="processDialog" max-width="400px">
          <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
            <div class="text-center pl-4 pr-4" align="center">
              <v-card-text class="mt-0 pt-2 pb-0"><span class="primary--text font-weight-bold">Processe with {{ action.type == "Offer" ? "sale" : "purchase" }} ?</span></v-card-text>
              <v-card-text class="mt-0 pt-0 " >Counter Party <span class="primary--text font-weight-bold">Smith Farming Co 1,000mt APW Wheat CSC-11 @ 105.20 Brisbane Ex-Farm </span>for <span class="primary--text font-weight-bold"> March 2020.</span></v-card-text>
            </div>
            <v-form v-model="valid" ref="form" class="pl-3 pr-3"  >
              <div  v-if="action.type != 'Offer' ">
                <p>Details: </p>
                <p>220km from Brisbane</p>
                <p>100km from ToowoomBa</p>
                <p>Road train loading</p>
              </div>
              <v-card-actions >
                <v-btn flat @click="processDialog = false" block>Close</v-btn>
                <v-btn 
                  :disabled="!valid"
                  color="md-deep-orange-500 border-radius6"
                  block
                  >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-form>
            <v-btn flat class="md-blue-600--text" block @click="confirmCancel()">I do not wish to processed <v-icon>chevron_right</v-icon></v-btn>
          </v-card>
        </v-dialog>
        <v-dialog v-model="cancelDialog" max-width="400px" persistent>
          <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
            <div class="text-center pl-4 pr-4" align="center">
              <v-card-text class="mt-0 pt-2 pb-0"><span class="primary--text font-weight-bold">Trade in suspense. You will be contacted.</span></v-card-text>
            </div>
            <v-form v-model="valid" ref="form" class="pl-3 pr-3">
              <v-card-text class="mb-0 pb-0 pl-0 ml-0">Please inform us to discuss. </v-card-text>
              <v-textarea
                label="Enter reason"
                counter
                v-model="cancelReson"
              ></v-textarea>
              <v-card-actions >
                <v-btn flat block @click="cancelClose()">Close</v-btn>
                <v-btn 
                  color="md-deep-orange-500 border-radius6"
                  block
                  :disabled="!cancelReson"
                  >
                  Contact me
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

      </v-card>
    </v-flex>
  </div>
</template>
<script>
import { abbreviate } from '@/utils/helpers';
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
        admin: false,
        expanded: false,
        expand: false,
        dialog: false,
        valid: false,
        fab: false,
        hidden: false,
        tabs: null,
        page: {
            title: "3 - ORDER FLOW",
            headline: "3 - ORDER FLOW",
            description: ``
        },
        breadcrumbs: [
            {
            text: "3.1 - ORDER LIST",
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
            { text: "COMMODITY", value: "commodity", sortable: false, align: "left"},
            { text: "DATE", value: "date", sortable: false, align: "left"},
            { text: "DELIVERY PERIOD", value: "deliveryPeriod", sortable: false, align: "left" },
            { text: "VOLUME", value: "volume", sortable: false, align: "right" },
            { text: "$", value: "price", sortable: false, align: "right" }
        ],
        data: [],
      actionDialog: false,
      action: {},
      filterData: [],
      confirmDialog: false,
      counterDialog: false,
      processDialog: false,
      cancelDialog: false,
      cancelReson: "",
      expireDuration: [10, 20, 30, 40, 50, 60],
      date: null,
      menu:false,
      modal: false,
      dateFormatted: null
    };
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.getOrderFunc(1);
    }
  },
  computed: {
    ...mapGetters("trade", ["getOrderListData"]),
    ...mapGetters('auth', ['user']),
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "#f44336"};
        case "two":
          return { color: "#f44336" };
        default:
          return {};
      }
    },
    computedHeader() { 
      return this.headers.map(item => {
        return {...item, text: abbreviate(item.text, 600)}
      });
    },
  },
  async mounted() {
    this.date = this.currentDate();
    this.getOrderFunc(0);
  },
  methods: {
    ...mapActions("trade", {
      _getOrderList: "getOrderList",
      _activeTrade: "activeTrade"
    }),
    actionOrder(item) {
        console.log(item)
          this.action = item;

          this.actionDialog = true;
    },

    abbreviate(str, width) {
      return abbreviate(str, width);
    },

    confirmAction() {
        this.actionDialog = false;
        this.confirmDialog = true;
    },

    confirmCounter() {
        this.actionDialog = false;
        this.counterDialog = true;
    },

    async confirmProcess() {
      let payload = {};
      console.log("s", this.action);

      payload.tradeId = this.action.tradeId;
      payload.withTrade = {};
      payload.withTrade.id = this.action.tradeId;
      payload.withTrade.tradeType = this.action.tradeData.tradeType;
      payload.withTrade.commodityGradeId = this.action.tradeData.commodityGradeId;
      payload.withTrade.deliveryPointId = this.action.tradeData.deliveryPointId;
      payload.withTrade.deliveryPeriodId = this.action.tradeData.deliveryPeriodId;
      payload.withTrade.volume = this.action.tradeData.volume;
      payload.withTrade.price = this.action.tradeData.price;
      payload.withTrade.specialConditions = this.action.tradeData.specialConditions;
      payload.withTrade.counterPartyGroupId = [];
      (this.action.tradeData.counterPartyGroups != null) ? this.action.tradeData.counterPartyGroups.map(item => { payload.withTrade.counterPartyGroupId.push(item.id) }) : payload.withTrade.counterPartyGroupId=[];
      payload.withTrade.duration = this.action.tradeData.duration;
      payload.withTrade.userId = this.user.id;
      

      this._activeTrade(payload.tradeId);
      this._getOrderList(0);

      this.confirmDialog = false;
    },

    confirmCancel() {
        this.cancelDialog = true;
    },

    cancelClose() {
      this.processDialog = false;
      this.confirmDialog = false;
      this.cancelDialog = false;
    },

    parseDate(date) {
      if (!date) return null;
      let ref = this;


      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      
      var newData = [];
      for(var i=0; i < this.data.length; i++ ) {
        
        if( this.data[i].date == `${month}/${day}` ) {
          newData.push(this.data[i]);
        }

      }

      return `${month}/${day}/${year}`;
    },

    currentDate() {
      var today = new Date();
      var dd = String( today.getDate() ).padStart( 2, '0' );
      var mm = String( today.getMonth() + 1 ).padStart( 2, '0' );
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      return today;
    },

    async getOrderFunc(index) {
      let payload = {};

      switch(index) {
        case 0:
          payload.All = true;
          payload.History = "";

          await this._getOrderList(payload);
          this.data = this.getOrderListData;
          console.log("ddd", this.data)
          break;
        case 1:
          payload.All = false;
          payload.History = this.date;

          await this._getOrderList(payload);
          this.filterData = this.getOrderListData;
          break;
      }

    }

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


>>>table.v-table tbody td, >>>table.v-table thead th {
  padding: 0 2px !important;
  width: 16.5%;
}

>>>table.v-table tbody tr:nth-child(odd) td {
  height: 31px !important;
}


>>>table.v-table tbody td {
  font-size: 9px !important;
}


table tbody tr td {
  font-size: 9px !important;
  height: 31px !important;
}

table thead tr th {
  font-size: 10px !important;
}


table tbody tr {
  border-bottom: 1px solid rgba(0,0,0,0.12);
  border-top: 0px;
}

.v-text-action {
  text-align: right !important;
}

>>>table.v-table thead tr th {
  font-weight: 700 !important;
  color: #000 !important;
}

.v-sub-name {
  width: 17% !important;
}

.v-cursor {
  cursor: pointer;
}

. v-tabs__item {
  padding-left: 0px !important;
}

</style>
