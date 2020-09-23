<template>
  <div id="lateral">
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-btn icon >
        <router-link to="#" target="_self" class="v-underline md-blue-600--text">
          <v-icon size="30" color="md-grey-300 darken2 grey--text " @click="$router.go(-1)">mdi-arrow-left</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title class="headline-text justify-center primary--text font-weight-bold v-header ml-3" >Recent trades: Sorghum</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-flex xs12 sm12 class="white pt-4">
      <v-card min-height="450px" flat>
        <v-data-table
          :headers="computedHeader"
          :items="data"
          hide-actions
          class="text-center justify-center"
          item-key="id"
          expand
        >
          <template slot="items" slot-scope="props" >
            <tr :class="props.item.background" @click="props.expanded = !props.expanded" class="v-cursor text-xs-left" v-if="props.item.tradType != 'SPREAD'">
              <td ><v-icon size="16" v-if="(props.item.detailData).length">play_arrow</v-icon><span :class="props.item.textColor+'--text'" class="font-weight-bold">{{ props.item.tradType }}</span></td>
              <td class="text-xs-left">{{ props.item.commodity }}</td>
              <td class="text-xs-left">{{ props.item.deliveryPoint }}</td>
              <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
              <td class="text-xs-right md-blue-600--text" >{{ props.item.volume }}</td>
              <td class="text-xs-right md-blue-600--text">{{ props.item.price }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
            <v-data-table
              :items="props.item.detailData"
              item-key="tradType"
              hide-actions
              hide-headers
            >
              <template slot="items" slot-scope="props">
                <tr class="v-cursor" >
                  <td :class="props.item.textColor+'--text'" class="font-weight-bold text-xs-left" >{{ props.item.tradType }} <v-icon size="16" v-if="(props.item.detailData).length">play_arrow</v-icon></td>
                  <td class="text-xs-left">{{ props.item.commodity }}</td>
                  <td class="text-xs-left">{{ props.item.deliveryPoint }}</td>
                  <td class="text-xs-left">{{ props.item.deliveryPeriod }}</td>
                  <td class="text-xs-right md-blue-600--text" @click="editItem(props.item)">{{ props.item.volume }}</td>
                  <td class="text-xs-right md-blue-600--text">{{ props.item.price }}</td>
                </tr>
              </template>

            </v-data-table>
          </template>
        </v-data-table>
        <v-spacer></v-spacer>
        <v-card min-height="100px" flat>
        </v-card>
        <v-dialog v-model="dialog" max-width="400px" persistent>
          <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
            <div class="text-center pl-4 pr-4" align="center">
              <v-card-text class="primary--text font-weight-bold display-1 mb-0 pb-0" large>Sell Order - EDIT</v-card-text>
              <v-card-text class="mt-0 pt-0 ">You are <span class="primary--text font-weight-bold">selling APW Wheat CSC-11 Brisbane Track </span>for <span class="primary--text font-weight-bold">March 2020</span> period</v-card-text>
            </div>
            <v-form v-model="valid" ref="form" class="pl-3 pr-3">

              <v-text-field
                hint="Business rule warning TBA"
                label="Price $AUD"
                class="mb-3"
                required
              ></v-text-field>

              <v-text-field
                hint="Business rule warning TBA"
                label="Volume (mt)"
                class="mb-3"
                required
              ></v-text-field>
              
              <v-card-actions class="mt-5">
                <v-btn flat @click="clear">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                  :disabled="!valid"
                  color="md-deep-orange-500 border-radius6"
                  @click="submit"
                  >
                  Re-issue
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
import { trades } from '@/data/dummyData';
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      admin: false,
      expanded: false,
      expand: false,
      dialog: false,
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
                text: "2.6 - RECENT TRADES",
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
        { text: "Market", value: "deliveryPoint", sortable: false, align: "left"},
        { text: "DELIVERY PERIOD", value: "deliveryPeriod", sortable: false, align: "left" },
        { text: "VOLUME", value: "volume", sortable: false, align: "right" },
        { text: "$", value: "price", sortable: false, align: "right" }
      ],
      data: trades,
      editedIndex: -1,
      editedItem: {
          name: "",
          group: "",
          daily_limit: false,
          tonnage: 0,
      },
      defaultItem: {
          name: "",
          group: "",
          daily_limit: false,
          tonnage: 0,
      },


    };
  },
  computed: {
    computedHeader() {
      return this.headers.map(item => {
        return {...item, text: abbreviate(item.text, 600)}
      });
    }
  },
  methods: {
    clear() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    
    submit() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.selected = [];
      this.clear();
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

table tbody tr td {
  font-size: 9px !important;
  height: 36px !important;
}

>>>table.v-table tbody td, >>>table.v-table thead th {
  padding: 0 5px !important;
  width: 16.5%;
}

>>>table.v-table thead tr th {
  font-weight: 700 !important;
  color: #000 !important;
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

.v-text-action {
  text-align: right !important;
}

.v-sub-name {
  width: 17% !important;
}

.v-cursor {
  cursor: pointer;
}

</style>
