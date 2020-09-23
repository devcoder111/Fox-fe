<template>
  <v-app id="lateral">
    <v-toolbar flat class="white">
      <v-toolbar-title
        class="headline-text justify-center primary--text font-weight-bold v-header ml-3"
      >Orders</v-toolbar-title>
      <v-tabs slot="extension" v-model="tabs" color="transparent" grow>
        <v-tab href="#one" class="font-weight-bold text-capitalize v-custom-tab" style="width:50% !important;">Orders</v-tab>
        <v-tab href="#two" class="font-weight-bold text-capitalize v-custom-tab text-xs-left" style="width: 50% !important;">History
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
              ></v-text-field>
              <v-date-picker v-model="date" no-title @input="menu = false">
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-tab>
        <v-tabs-slider color="primary"></v-tabs-slider>
      </v-tabs>
    </v-toolbar>
    <v-flex xs12 sm12 class="white pt-4">
      <v-tabs-items v-model="tabs">
        <v-tab-item key="one" value="one">
          <v-data-table
            :headers="computedHeader"
            :items="data"
            hide-actions
            class="md-grey-100 text-center justify-center"
            item-key="id"
            expand
          >
            <template slot="items" slot-scope="props">
              <tr :class="props.item.background">
                <td
                  @click="props.expanded = !props.expanded"
                  class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left"
                >
                  <v-icon
                    size="16"
                    v-if="props.item.name == 'C.Bid' || props.item.name == 'C.Offer'"
                  >play_arrow</v-icon>
                  <span :class="props.item.textColor+'--text'" class="font-weight-bold">
                    {{ props.item.name }}
                    <v-icon
                      size="16"
                      v-if="(props.item.detailData).length && props.item.name == 'SPREAD'"
                    >keyboard_arrow_up</v-icon>
                  </span>
                </td>
                <td class="text-xs-left">{{ props.item.commodity }}</td>
                <td class="text-xs-left">{{ props.item.date }}</td>
                <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                <td class="text-xs-right md-blue-600--text" @click="actionOrder(props.item)">{{ props.item.volume }}</td>
                <td
                  class="text-xs-right md-blue-600--text" @click="actionOrder(props.item)"
                >{{ props.item.price }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
              <v-data-table
                :items="props.item.detailData"
                item-key="name"
                hide-actions
                hide-headers
              >
                <template v-slot:items="props">
                  <tr>
                    <td
                      class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left"
                    >{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.commodity }}</td>
                    <td class="text-xs-left">{{ props.item.date }}</td>
                    <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                    <td
                      class="text-xs-right md-blue-600--text"
                    >{{ props.item.volume }}</td>
                    <td
                      class="text-xs-right md-blue-600--text"
                    >{{ props.item.price }}</td>
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
                <td @click="props.expanded = !props.expanded" class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left" ><v-icon size="16" v-if="props.item.name == 'C.Bid' || props.item.name == 'C.Offer'" >play_arrow</v-icon><span :class="props.item.textColor+'--text'" class="font-weight-bold">{{ props.item.name }}<v-icon size="16" v-if="(props.item.detailData).length && props.item.name == 'SPREAD'" >keyboard_arrow_up</v-icon></span></td>
                <td class="text-xs-left">{{ props.item.commodity }}</td>
                <td class="text-xs-left">{{ props.item.date }}</td>
                <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                <td class="text-xs-right md-blue-600--text" aria-controls @click="actionOrder(props.item)">{{ props.item.volume }}</td>
                <td class="text-xs-right md-blue-600--text" v-if="(props.item.detailData).length">{{ props.item.price }}</td>
                <td class="text-xs-right md-blue-600--text" aria-controls v-if="!(props.item.detailData).length" @click="actionOrder(props.item)">{{ props.item.price }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
              <v-data-table
                :items="props.item.detailData"
                item-key="name"
                hide-actions
                hide-headers
              >
                <template v-slot:items="props">
                  <tr >
                    <td class="v-cursor text-xs-left text-sm-left text-md-left text-lg-left text-xl-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.commodity }}</td>
                    <td class="text-xs-left">{{ props.item.date }}</td>
                    <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                    <td class="text-xs-right md-blue-600--text" >{{ props.item.volume }}</td>
                    <td class="text-xs-right md-blue-600--text">{{ props.item.price }}</td>
                  </tr>                    
                </template>
              </v-data-table>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
    <v-dialog v-model="actionDialog" max-width="400px">
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center" align="center">
          <v-card-text
            class="primary--text font-weight-bold headline mb-0 pb-0"
            large
          >Action on {{ action.type != "Offer" ? "Bid [C.Bid]" : "Offer [C.Offer]" }}</v-card-text>
          <v-card-text class="mt-0 pt-0">
            <span
              class="primary--text font-weight-bold"
            >{{ action.company }}...{{ action.volume }}mt @ {{ action.price }}</span>
          </v-card-text>
        </div>
        <v-card-actions class="mt-5">
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click="confirmCounter()"
            block
          >Counter {{ action.type }}</v-btn>
          <v-btn color="md-deep-orange-500 border-radius6" block @click="confirmAction()">Reject</v-btn>
        </v-card-actions>
        <v-btn color="md-deep-orange-500 border-radius6" class="d-flex justify-center d-none">Reject</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" max-width="400px">
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text
            class="primary--text font-weight-bold display-1 mb-0 pb-0"
            large
          >{{ action.type == "Offer" ? "Sell" : "Buy" }}</v-card-text>
          <v-card-text class="mt-0 pt-0">
            You are
            <span
              class="primary--text font-weight-bold"
            >{{ action.type == "Offer" ? "selling" : "buying" }} APW Wheat CSC-11 Brisbane Track</span>for
            <span class="primary--text font-weight-bold">March 2020</span> period
          </v-card-text>
        </div>
        <v-form v-model="valid" ref="form" class="pl-3 pr-3">
          <v-text-field
            hint="Business rule warning TBA"
            label="Price $AUD"
            class="mb-3"
            :value="action.price"
            disabled
            required
          ></v-text-field>

          <v-text-field
            hint="Business rule warning TBA"
            label="Volume (mt)"
            class="mb-3"
            :value="action.volume"
            disabled
            required
          ></v-text-field>
          <v-card-text class="ml-0 mt-0 pt-0 pl-0">Conditions of Sale:</v-card-text>
          <v-card-actions class="mt-5">
            <v-btn flat @click="confirmDialog = false" block>Close</v-btn>
            <v-btn
              :disabled="!valid"
              color="md-deep-orange-500 border-radius6"
              block
              @click="confirmProcess()"
            >Confirm</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="counterDialog" max-width="400px">
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text
            class="primary--text font-weight-bold display-1 mb-0 pb-0"
            large
          >Counter {{ action.type }}</v-card-text>
          <v-card-text class="mt-0 pt-0">
            You are re-countring to
            <span
              class="primary--text font-weight-bold"
            >{{ action.type == "Offer" ? "sell" : "buy" }} APW Wheat CSC-11 Brisbane Track</span>for
            <span class="primary--text font-weight-bold">March 2020</span> period
          </v-card-text>
        </div>
        <v-form v-model="valid" ref="form" class="pl-3 pr-3">
          <v-select :items="expireDuration" label="Duration(Expiry in mins)"></v-select>
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
          <v-card-text
            class="v-text-center ml-0 mt-0 pt-0 pl-0"
          >Note: The {{ action.type == "Offer" ? "seller" : "buyer" }} will be presented the {{ (action.type).toLowerCase() }}. You will be notified if accepted or rejected within X hours.</v-card-text>
          <v-card-actions>
            <v-btn flat @click="counterDialog = false" block>Close</v-btn>
            <v-btn
              :disabled="!valid"
              color="md-deep-orange-500 border-radius6"
              block
            >Confirm {{ action.type }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="processDialog" max-width="400px">
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text class="mt-0 pt-2 pb-0">
            <span
              class="primary--text font-weight-bold"
            >Processe with {{ action.type == "Offer" ? "sale" : "purchase" }} ?</span>
          </v-card-text>
          <v-card-text class="mt-0 pt-0">
            Counter Party
            <span
              class="primary--text font-weight-bold"
            >Smith Farming Co 1,000mt APW Wheat CSC-11 @ 105.20 Brisbane Ex-Farm</span>for
            <span class="primary--text font-weight-bold">March 2020.</span>
          </v-card-text>
        </div>
        <v-form v-model="valid" ref="form" class="pl-3 pr-3">
          <div v-if="action.type != 'Offer' ">
            <p>Details:</p>
            <p>220km from Brisbane</p>
            <p>100km from ToowoomBa</p>
            <p>Road train loading</p>
          </div>
          <v-card-actions>
            <v-btn flat @click="processDialog = false" block>Close</v-btn>
            <v-btn :disabled="!valid" color="md-deep-orange-500 border-radius6" block>Confirm</v-btn>
          </v-card-actions>
        </v-form>
        <v-btn flat class="md-blue-600--text" block @click="confirmCancel()">
          I do not wish to processed
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancelDialog" max-width="400px" persistent>
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text class="mt-0 pt-2 pb-0">
            <span class="primary--text font-weight-bold">Trade in suspense. You will be contacted.</span>
          </v-card-text>
        </div>
        <v-form v-model="valid" ref="form" class="pl-3 pr-3">
          <v-card-text class="mb-0 pb-0 pl-0 ml-0">Please inform us to discuss.</v-card-text>
          <v-textarea label="Enter reason" counter v-model="cancelReson"></v-textarea>
          <v-card-actions>
            <v-btn color="md-deep-orange-500 border-radius6" block @click="cancelClose()">Close</v-btn>
            <v-btn
              color="md-deep-orange-500 border-radius6"
              block
              :disabled="!cancelReson"
            >Contact me</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { abbreviate } from '@/utils/helpers';
import { defaultUserPic, users, authUser, orderList } from '@/data/dummyData';

export default {
  data() {
    return {
      admin: false,
      dialog: false,
      valid: false,
      fab: false,
      hidden: false,
      tabs: null,
      page: {
        title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        description: ``
      },
      breadcrumbs: [
        {
          text: "1.8 - GROWER ORDER FLOW",
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
        { text: "COMMODITY", value: "commodity", sortable: false, align: "left" },
        { text: "DATE", value: "date", sortable: false, align: "left" },
        { text: "DELIVERY PERIOD", value: "deliveryPeriod", sortable: false, align: "left" },
        { text: "VOLUME", value: "volume", sortable: false, align: "right" },
        { text: "$", value: "price", sortable: false, align: "right" }
      ],
      data: orderList,
      filterData: [],
      actionDialog: false,
      action: {
        type: "",
        company: "",
        volume: "",
        price: ""
      },
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
    }
  },
  mounted() {
    this.date = this.currentDate();
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "#f44336" };
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
    }
  },
  methods: {
    actionOrder(item) {
      this.action = {
        type: item.name,
        company: item.comm,
        volume: item.vol,
        price: item.currency
      };

      this.actionDialog = true;
    },

    confirmAction() {
      this.actionDialog = false;
      this.confirmDialog = true;
    },

    confirmCounter() {
      this.actionDialog = false;
      this.counterDialog = true;
    },

    confirmProcess() {
      this.confirmDialog = false;
      this.processDialog = true;
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

      this.filterData = newData;

      return `${month}/${day}/${year}`;
    },

    currentDate() {
      var today = new Date();
      var dd = String( today.getDate() ).padStart( 2, '0' );
      var mm = String( today.getMonth() + 1 ).padStart( 2, '0' );
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      return today;
    }
  }
};
</script>

<style scoped lang="stylus">
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-speed-dial, #lateral .v-btn--floating {
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

>>>table.v-table tbody td {
  font-size: 9px !important;
}

table thead tr th {
  font-size: 10px !important;
}

table thead tr {
  height: 26px !important;
  border-top: 2px solid rgba(0, 0, 0, 0.12) !important;
}

>>>table.v-table tbody tr:nth-child(odd) td {
  height: 31px !important;
}

table tbody tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
</style>
