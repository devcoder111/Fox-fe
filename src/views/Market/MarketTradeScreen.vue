<template>
  <div class="white">
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-snackbar
        v-model="snackbar"
        absolute
        top
        center
        xs12 sm3
        color="success"
      >
        <span>{{ snackbarText }}</span>
        <v-icon dark>check_circle</v-icon>
      </v-snackbar>

      <v-btn icon>
        <router-link to="/market/delivery" target="_self" class="v-underline md-blue-600--text">
          <v-icon size="30" color="md-grey-300 darken2 grey--text ">mdi-arrow-left</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title class="headline-text justify-center primary--text font-weight-bold v-header ml-3" >{{commName}} Market</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-layout row>
      <v-flex xs12 class="d-flex justify-space-between pl-3 pr-3">
        <span class="display-header-4 primary--text font-weight-bold">{{pointName}}</span>
        <v-icon class="md-deep-orange-500--text bookmark-icon" size="30" aria-controls >{{ bookmarkStatus ? 'bookmark' : 'bookmark_border' }}</v-icon>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 class="d-flex justify-space-between pl-3 pr-3">
        <span class="v-custom-sub font-weight-bold">APW Wheat CSC-11</span>
        <v-icon class="grey--text mr-1 help-icon" size="20" aria-controls>help_outline</v-icon>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="pl-0 pr-0 pt-0">
        <v-data-table
          :headers="headers"
          :items="data"
          hide-actions
          class="text-center justify-center v-wheat-table"
          item-key="id"
          expand
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.value"
                class=""
              >
                <span v-bind:class="{'v-bid-offer': header.icon}">{{ abbreviate(header.text, 600) }}</span>
                <v-icon class="primary--text" size="20" @click="navigate(header)">{{ header.icon }}</v-icon>
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr >
              <td style="width: 30% !important" @click="props.expanded = !props.expanded" class="v-cursor">
                <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.date }}</span>
                <v-icon size="20" v-if="props.item.icon" class="ml-0">{{ props.expanded? 'expand_less' : 'expand_more' }}</v-icon>
              </td>
              <td style="width: 20% !important" class="md-blue-600--text">
                <span :class="props.item.textColor+'--text'" class="v-bid-offer" aria-controls @click="actionDialog = true">{{ props.item.vol1 }}</span>
                <v-icon size="20" class="ml-0" aria-controls @click="detailDialog = true">info_outline</v-icon>
              </td>
              <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.bid }}</td>
              <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.offer }}</td>
              <td style="width: 16% !important" class=" md-blue-600--text" @click="actionFunc(props.item, 2)">{{ props.item.vol2 }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
            <v-data-table
              :items="props.item.detailData"
              item-key="id"
              hide-actions
              hide-headers
              expand
            >
              <template v-slot:items="props">
                <tr class="v-cursor" @click="props.expanded = !props.expanded">
                  <td style="width: 30% !important"></td>
                  <td style="width: 20% !important" class="md-blue-600--text">
                    <span :class="props.item.textColor+'--text'" class="v-bid-offer" aria-controls @click="actionDialog = true">{{ props.item.vol1 }}</span>
                    <v-icon size="20" class="ml-0" aria-controls @click="detailDialog = true">info_outline</v-icon>
                  </td>
                  <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.bid }}</td>
                  <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.offer }}</td>
                  <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.vol2 }}</td>
                </tr>
              </template>
            </v-data-table>
          </template>
        </v-data-table>
    </v-flex>
    <v-layout row>
      <v-flex xs12 class="d-flex justify-left pl-3 pr-3 pt-3">
        <span class="v-custom-sub font-weight-bold">APW Wheat GRADE-XY</span>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="pl-0 pr-0 pt-0">
        <v-data-table
          :headers="headers"
          :items="data"
          hide-actions
          class="text-center justify-center v-wheat-table"
          item-key="id"
          expand
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.value"
                class=""
              >
                <span v-bind:class="{'v-bid-offer': header.icon}">{{ abbreviate(header.text, 600) }}</span>
                <v-icon class="primary--text" size="20" @click="navigate(header)">{{ header.icon }}</v-icon>
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr class="v-cursor">
              <td style="width: 30% !important" @click="props.expanded = !props.expanded" >
                <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.date }}</span>
                <v-icon size="20" v-if="props.item.icon" class="ml-0">{{ props.expanded? 'expand_less' : 'expand_more' }}</v-icon>
              </td>
              <td style="width: 20% !important" class="md-blue-600--text">
                <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer" aria-controls @click="actionDialog = true">{{ props.item.vol1 }}</span>
                <v-icon size="20" class="ml-1" aria-controls @click="detailDialog = true">info_outline</v-icon>
              </td>
              <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.bid }}</td>
              <td style="width: 16% !important" class="md-blue-600--text" @click="actionFunc(props.item, 1)">{{ props.item.offer }}</td>
              <td style="width: 16% !important" class=" md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.vol2 }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
            <v-data-table
              :items="props.item.detailData"
              item-key="id"
              hide-actions
              hide-headers
              expand
            >
              <template v-slot:items="props">
                <tr class="v-cursor" @click="props.expanded = !props.expanded">
                  <td style="width: 30% !important"></td>
                  <td style="width: 20% !important" class="md-blue-600--text">
                    <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer" aria-controls @click="actionDialog = true">{{ props.item.vol1 }}</span>
                    <v-icon size="20" class="ml-1" aria-controls @click="detailDialog = true">info_outline</v-icon>
                  </td>
                  <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.bid }}</td>
                  <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.offer }}</td>
                  <td style="width: 16% !important" class="md-blue-600--text" aria-controls @click="actionDialog = true">{{ props.item.vol2 }}</td>
                </tr>
              </template>
            </v-data-table>
          </template>
        </v-data-table>
      </v-flex>
    <v-flex xs12>
      <v-card-actions class="d-flex justify-space-around" style="padding: 20px 25px;">
        <v-btn class="v-button" color="md-deep-orange-500" @click="$router.push('/new/bid')" >BID</v-btn>
        <v-btn class="v-button" color="md-deep-orange-500" @click="$router.push('/new/offer')" >OFFER</v-btn>
      </v-card-actions>
      <a href="#" @click="marketRequest()" class="font-weight-bold display-paragraph-3 md-blue-600--text d-flex justify-center mt-2 mb-2">Create new market request</a>
    </v-flex>
    <v-dialog v-model="marketDialog" max-width="400px" >
      <v-card class="border-radius6 pb-2 pt-2 pl-3 pr-3">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text class="mt-0 pt-2 pb-0"><span class="primary--text font-weight-bold">New Market</span></v-card-text>
        </div>
        <v-text-field
          label="Market"
          class="mb-3"
          required
          :rules="marketRules"
          v-model="market"
        ></v-text-field>
        <div class="d-flex " >
          <v-btn class="mr-1" color="md-deep-orange-500 border-radius6" block flat @click="clearMarketRequest()">Close</v-btn>
          <v-btn
            :disabled="!market"
            color="md-deep-orange-500 border-radius6"
            block
            @click="confirmMarketRequest()"
            >
            Request
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="actionDialog" max-width="400px" >
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text class="mt-0 pt-2 pb-0"><span class="primary--text font-weight-bold">Action on {{ actionData.type == "1" ? "Offer" : "Bid" }}</span></v-card-text>
          <v-card-text class="mb-0 pb-0 pl-0 ml-0">APW Wheat CSC ... {{ actionData.volume }} @ {{ actionData.price }}</v-card-text>
        </div>
        <v-btn class="d-flex sm-6" color="md-deep-orange-500 border-radius6" block @click="$router.push({name: 'NewSpread'})">New Spread</v-btn>
        <div class="d-flex " >
          <v-btn class="mr-1" color="md-deep-orange-500 border-radius6" block @click="confirmCounter()">Counter {{ actionData.type == "1" ? "Bid" : "Offer" }}</v-btn>
          <v-btn 
            color="md-deep-orange-500 border-radius6"
            block
            >
            {{ actionData.type == "1" ? "Buy" : "Sell" }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="counterDialog" max-width="400px">
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text class="primary--text font-weight-bold display-1 mb-0 pb-0" large>Counter {{ actionData.type }}</v-card-text>
          <v-card-text class="mt-0 pt-0 ">You are re-countring to <span class="primary--text font-weight-bold">{{ actionData.type == "Offer" ? "sell" : "buy" }} APW Wheat CSC-11 Brisbane Track </span>for <span class="primary--text font-weight-bold">March 2020</span> period</v-card-text>
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
            :value="actionData.price"
            required
          ></v-text-field>

          <v-text-field
            hint="Business rule warning TBA"
            label="Volume (mt)"
            class="mb-3"
            :value="actionData.volume"
            required
          ></v-text-field>
          <v-card-text class="v-text-center ml-0 mt-0 pt-0 pl-0">Note: The {{ actionData.type == "1" ? "seller" : "buyer" }} will be presented the {{ actionData.type  == "1" ? "offer" : "bid" }}. You will be notified if accepted or rejected within X hours.</v-card-text>
          <v-card-actions >
            <v-btn flat block @click="counterDialog = false">Close</v-btn>
            <v-btn 
              :disabled="!valid"
              color="md-deep-orange-500 border-radius6"
              block
              >
              Confirm {{ actionData.type }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="detailDialog" max-width="400px">
      <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
        <div class="text-center pl-4 pr-4" align="center">
          <v-card-text class="primary--text font-weight-bold display-1 mb-0 pb-0" large>Ex-Farm Darling Downs</v-card-text>
          <v-card-text class="mt-0 pt-0">Grower location</v-card-text>
        </div>
        <div class="mt-3 pl-4 pr-4">
          <v-card-text class="mt-0 pt-0">200km from Brisbane</v-card-text>
          <v-card-text class="mt-0 pt-0">15km from Warlock</v-card-text>
          <v-card-text class="mt-0 pt-0">16km from Dalby</v-card-text>
          <v-card-text class="mt-0 pt-0">100km from Toowoomba</v-card-text>
        </div>
        <div class="mt-3 pl-4 pr-4">
          <v-card-text class="mt-0 pt-0">Road train access</v-card-text>
          <v-card-text class="mt-0 pt-0">Web weather loading</v-card-text>
        </div>
        <v-card-actions >
            <v-btn flat block @click="detailDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
const signalR = require("@aspnet/signalr");

import { abbreviate } from '@/utils/helpers';

export default {
  props: ['commName', 'pointName', 'bookmark'],
  data() {
    return {
      detailDialog: false,
      formValid: null,
      newMarket: null,
      requestDialog: false,
      admin: false,
      valid: false,
      market: "",
      marketDialog: false,
      snackbar: false,
      snackbarText: "",
      marketRules: [
        v => !!v || "Market is required"
      ],
      bookmarkStatus: false,
      page: {
        title: "4 - MARKET",
        headline: "4 - MARKET",
        description: ``
      },
      breadcrumbs: [
        {
            text: "4.3 - MARKET TRADE SCREEN",
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
        { text: "VOLUME", icon: "", value: "vol1", sortable: false, align: "center"},
        { text: "BID", icon: "add_circle_outline", value: "bid", sortable: false, align: "center", route: "/new/bid"},
        { text: "OFFER", icon: "add_circle_outline", value: "offer", sortable: false, align: "center", route: "/new/offer" },
        { text: "VOLUME", icon: "", value: "vol2", sortable: false, align: "center" },
      ],
      data: [
        { 
          id:0,
          value: false,
          date: "June 2020",
          vol1: "2,000",
          bid: "$150.00",
          offer: "$100.00",
          vol2: "2,000",
          icon: true,
          detailData: [
            { 
              id:0,
              value: false,
              date: "",
              vol1: "2,000",
              bid: "$150.00",
              offer: "$100.00",
              vol2: "2,000",
              icon: false
            }
          ]
        },

        {
          id:1, 
          value: false,
          date: "Aug 2020",
          vol1: "2,000",
          bid: "$150.00",
          offer: "$100.00",
          vol2: "2,000",
          icon: true,
          detailData: [
            {
              id:1,
              value: false,
              date: "",
              vol1: "2,000",
              bid: "$150.00",
              offer: "$100.00",
              vol2: "2,000",
              icon: false
            }
          ]

        },

      ],
      actionDialog: false,
      counterDialog: false,
      expireDuration: [10, 20, 30, 40, 50, 60],
      actionData: {
        type: "",
        volume: 0,
        com: "",

      },
      nameRules: [
        v => !!v || 'Name is required'
      ],
      connection: ""
    };
  },
  methods: {
    actionFunc(item, index) {
      this.actionDialog = true;
      this.actionData = {
        type: index,
        volume: index == "1" ? item.vol1 : item.vol2,
        price: index == "1" ? item.offer : item.bid     
      }
    },

    abbreviate(str, width) {
      if (this.$route.name == 'StackedLayout') {
        return abbreviate(str, 9999);
      }
      return abbreviate(str, width);
    },

    navigate(header) {
      if (header.route) {
        this.$router.push(header.route);
      }
    },

    confirmCounter() {
      this.actionDialog = false;
      this.counterDialog = true;
    },

    marketRequest() {
      this.marketDialog = true;
    },

    confirmMarketRequest() {
      this.snackbarText = "Submitted - You will be contacted.";
      this.snackbar = true;
      this.market = "";
      this.marketDialog = false;
    },

    clearMarketRequest() {
      this.marketDialog = false;
      this.market = "";
    }
  },
  
  created: function() {
    let deliId = localStorage.getItem("deliId");
    let commoId = localStorage.getItem("commoId");
    let token = localStorage.getItem("token");

    const queryToken ="?access_token="+token + "&negotiateVersion=1";

    this.connection = new signalR.HubConnectionBuilder().withUrl("/market" + queryToken).build();

    this.connection.start().then(function () {
      console.log("connected");
      this.connection.invoke("SubscribeChannel", commoId, deliId).catch(function (err) {
          return console.error("err.toString()");
      });

    }).catch(function (err) {
        this.toasted.error(err.statusText || err);
    });
  },

  mounted() {
    if( this.bookmark == "true" ) {
      this.bookmarkStatus = true;
      
      setTimeout(() => {
        this.snackbarText = "Bookmarked! You'll be notified of orders in the flow";
        this.snackbar = true;
  
      }, 1700);
    }

    this.connection.on("Sync", function (data) {
      let now = new Date().toISOString();
      console.log(" sync data "+now+": ", data);
      
    });

  },
};
</script>

<style scoped lang="stylus">

.v-bid-offer {
  vertical-align: super !important;
}

table tbody tr td {
  font-size: 9px !important;
  height: 36px !important;
}

table thead tr {
  height: 28px !important;
}

table tbody tr {
  border-bottom: 1px solid rgba(0,0,0,0.12);
  border-top: 0px;
}

.v-wheat-table tbody tr td, .v-wheat-table thead tr th {
  padding: 0 0 !important;
  text-align: center !important;
  width: initial !important;
  font-size: 10px !important;
}

>>>table.v-table thead tr th {
  font-weight: 700 !important;
  color: #000 !important;
}

.bookmark-icon {
  max-width: 30px;
}

.help-icon {
  max-width: 20px;
}
</style>