<template>
  <div>
    <section-definition :title="page.title">
      <template v-slot:actions>
        <v-btn icon @click="showFilter">
          <v-icon color="primary">filter_list</v-icon>
        </v-btn>
        <v-btn icon @click="initialize">
          <v-icon color="primary">refresh</v-icon>
        </v-btn>
        <v-menu offset-y>
          <v-btn icon slot="activator" class="content-ma-0">
            <v-icon color="primary">more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="saveToExcel">
              <v-list-tile-title>
                <v-icon left>class</v-icon>Save to Excel
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>
    </section-definition>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <v-flex xs12 sm8 md12>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container grid-list-md class="pt-0 pb-0">
                    <v-layout wrap>
                      
                      <v-flex xs12>
                        <v-text-field v-model="detailItem.name" label="Name" disabled></v-text-field>
                      </v-flex>
                      
                      <v-flex xs12>
                        <v-text-field v-model="detailItem.buyer" label="Buyer" disabled></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="detailItem.seller" label="Seller" disabled></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </v-flex>
        <v-flex xs12 sm8 md12>
          <v-card>
            <v-data-table
              :headers="headers"
              :items="reports"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.reported | dateFormat }}</td>
                <td class="text-xs-left">{{ props.item.deliveryPeriodName }}</td>
                <td class="text-xs-left">{{ props.item.deliveryPointName }}</td>
                <td class="text-xs-left">{{ props.item.commodityGradeName }}</td>
                <td class="text-xs-left">{{ props.item.party1 }}</td>
                <td class="text-xs-left">{{ props.item.partyN }}</td>
                <td class="text-xs-left">{{ props.item.marketRate }}</td>
                <td class="text-xs-left">
                  <v-icon
                    small
                    class="mr-2"
                    @click="printItem(props.item)"
                  >
                    print
                  </v-icon>
                </td>
              </template>
              <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </v-card>
          <div class="text-xs-center pt-2" v-if="pagination.total">
            <v-pagination v-model="pagination.page" :length="Math.ceil(pagination.total / rowPerPage)" @input="goToPaging"></v-pagination>
          </div>
        </v-flex><!-- 
        <v-flex xs12 v-show="isFilter">
          <v-card-actions class="justify-space-around" style="padding: 0 25px;">
            <v-spacer />
            <v-btn class="v-button" color="md-deep-gray-500" @click="clearFilter">
              <v-icon small class="mr-2">clear</v-icon>
              Clear Filter
            </v-btn>
            <v-btn class="v-button" color="md-deep-orange-500" @click="saveToExcel">
              <v-icon small class="mr-2">print</v-icon>
              Print
            </v-btn>
          </v-card-actions>
        </v-flex> -->
      </v-layout>
    </v-container>
  </div>
</template>
<script>

import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      page: {
        title: "Circular Trades",
        headline: "Circular Trades",
        description: `Trades that circle back to the original buyer`
      },
      dialog: false,
      headers: [
        { text: "Contract Date", value: "reported", class: "bg-grey" },
        { text: "Del. Period", value: "deliveryPeriodName", class: "bg-grey" },
        { text: "Del. Point", value: "deliveryPointName", class: "bg-grey" },
        { text: "Commodity", value: "commodityGradeName", class: "bg-grey" },
        { text: "Initial Buyer", value: "party1", class: "bg-grey" },
        { text: "Final Seller", value: "partyN", class: "bg-grey" },
        { text: "Mkt. Rate", value: "marketRate", class: "bg-grey" },

        { text: "Actions", value: "name", sortable: false, class: "bg-grey" }
      ],
      detailIndex: -1,
      detailItem: {
        contractDate: "01/01/1010",
        seller: 'Seller',
        buyer: 'Buyer',
        commodity: 'commodity',
        delPoint: 1000,
        rate: '$0.00',
        brokerage: '$0.00',
      },
      defaultItem: {
        contractDate: "01/01/1010",
        delPeriod: '000000',
        seller: 'Seller',
        buyer: 'Buyer',
        commodity: 'commodity',
        delPoint: 1000,
        rate: '$0.00',
        brokerage: '$0.00',
        protein: 0
      },
      reports: [],
      rowPerPage: 2,
      pagination: {
        count: 2,
        sinceId: 0,
        maxId: 0,
        page: 1,
        total: null
      }
    };
  },
  computed: {
    formTitle() {
      return "Circular Trade Detail";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created () {
    this.initialize();
  },

  methods: {
    ...mapActions("circularTrade", {
      getCircularTrades: "getCircularTrades",
      addCircularTrades: "addCircularTrades",
      searchCircularTrades: "searchCircularTrades",
      exportCircularTrades: "exportCircularTrades"
    }),

    async initialize() {
      let payload = Object.assign({}, this.pagination);
      payload.count = this.rowPerPage;
      let res = await this.searchCircularTrades(payload);
      this.reports = Object.assign([], res.multipleResults);
      this.pagination = Object.assign({}, res.paginationMetada);
    },

    showItem(item) {
      this.detailItem = this.reports.indexOf(item);
      this.detailItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    goToPaging() {
      this.initialize();
    },

    showFilter() {

    },

    saveToExcel() {
      let payload = Object.assign({}, this.pagination);
      payload.count = this.rowPerPage;
      return this.exportCircularTrades(payload).then(res => {
        console.log(res);
      }).catch(err => {
        this.$Toasted(err.statusText);
      })
    },

    printItem(item) {
      
    },
  }
};
</script>