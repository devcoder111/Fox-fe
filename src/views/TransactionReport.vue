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
        <v-flex xs12 sm12 md12>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-radio-group v-model="filterOptions.Invoiced" row>
                      <v-radio label="Uninvoiced" value="false"></v-radio>
                      <v-radio label="Invoiced" value="true"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete 
                      :items="sellersFilter" item-text="name" item-value="id" 
                      label="Name" v-model="filterOptions.SellerUserId">
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs11 class="datePicker">
                    <v-menu
                      v-model="menuStartDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="filterOptions.StartDate"
                          label="Start Date"
                          prepend-icon="event"
                          readonly
                          :disabled="!filterOptions.StartDateChecked"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="filterOptions.StartDate" @input="menuStartDate = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs1>
                    <v-checkbox v-model="filterOptions.StartDateChecked"></v-checkbox>
                  </v-flex>
                  <v-flex xs11 class="datePicker">
                    <v-menu
                      v-model="menuEndDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="filterOptions.EndDate"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          :disabled="!filterOptions.EndDateChecked"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="filterOptions.EndDate" @input="menuEndDate = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs1>
                    <v-checkbox v-model="filterOptions.EndDateChecked"></v-checkbox>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="filterOptions.AdviceRef" label="Advice No."></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="filterOptions.InvoiceNo" label="Invoice No."></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions>
                <v-btn color="blue darken-1" flat block left @click.native="close">Cancel</v-btn>
                <v-btn color="md-deep-orange-500 border-radius6" block @click.native="filter">Filter</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn class="box-glow mb-2" @click="$router.push({ name: 'AdviceConfirmation'})"><v-icon>add</v-icon>New Confirmation Advice</v-btn>
          <v-data-table
            :headers="headers"
            :items="transactions"
            :must-sort="true"
            :pagination.sync="pagination"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.createdDate | dateFormat }}</td>
              <td class="text-xs-left">{{ props.item.invoiceDate | dateFormat }}</td>
              <td class="text-xs-left light-blue--text text--darken-4 cursor-pointer" @click="goToAdvice(props.item)">{{ props.item.adviceRef }}</td>
              <td class="text-xs-left">{{ props.item.sellerName }}</td>
              <td class="text-xs-left">{{ props.item.buyerName }}</td>
              <td class="text-xs-left">{{ props.item.commodity }}</td>
              <td class="text-xs-right">{{ props.item.quantity }}</td>
              <td class="text-xs-right">{{ props.item.price.toFixed(0) }}</td>
              <td class="text-xs-right">{{ props.item.brokerageRate.toFixed(2) }}</td>
              <td class="text-xs-left">
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2" v-if="currentPage">
            <v-pagination v-model="currentPage" :length="totalPage" @input="goToPaging"></v-pagination>
          </div>
        </v-flex>
        <v-flex xs12 v-show="isFilter">
          <v-card-actions class="justify-space-around" style="padding: 0 25px;">
            <v-spacer />
            <v-btn class="v-button" color="md-deep-gray-500" @click="clearFilter">
              <v-icon small class="mr-2">clear</v-icon>
              Clear Filter
            </v-btn>
            <v-btn class="v-button" color="md-deep-orange-500" @click="saveToPDF">
              <v-icon small class="mr-2">print</v-icon>
              Print
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>

import { mapActions } from "vuex";
export default {
  data() {
    return {
      page: {
        title: "Transaction Report",
        headline: "Transaction Report",
        description: `A blank page is good to quick-start from scratch.`
      },
      dialog: false,
      headers: [
        { text: "Date", value: "createdDate", class: "bg-grey" },
        { text: "Invoice Due", value: "invoiceDate", class: "bg-grey" },
        { text: "AdviceRef", value: "adviceRef", class: "bg-grey" },
        { text: "Seller", value: "sellerName", class: "bg-grey" },
        { text: "Buyer", value: "buyerName", class: "bg-grey" },
        { text: "Commodity", value: "commodity", class: "bg-grey" },
        { text: "Quantity", value: "quantity", align: "right", class: "bg-grey" },
        { text: "Rate", value: "price", align: "right", class: "bg-grey"},
        { text: "Brokerage", value: "brokerageRate", align: "right", class: "bg-grey"},
        { text: "Actions", value: "name", sortable: false, class: "bg-grey" }
      ],
      filterOptions: {
        Invoiced: null,
        SellerUserId: '',
        StartDate: '2020-01-01',
        StartDateChecked: false,
        EndDate: '2020-01-31',
        EndDateChecked: false,
        AdviceRef: '',
        InvoiceNo: ''
      },
      menuStartDate: false,
      menuEndDate: false,
      isFilter: false,
      currentPage: 1,
      sellers: [],
      rowsPerPage: 10,
      pagination: {
        descending: true,
        sortBy: 'createdDate',
        rowsPerPage: -1
      }
    };
  },
  computed: {
    transactions() {
      return this.$store.state.advice.transaction.data;
    },
    totalPage() {
      return this.$store.state.advice.transaction.totalPage;
    },
    formTitle() {
      return "Selection";
    },
    queryModel() {
      return {
        count: this.rowsPerPage,
        page: this.currentPage,
        ...this.filterOptions
      }
    },
    sellersFilter() {
      return this.sellers.map(seller => {
        return {
          name: seller.entityName,
          id: seller.id
        }
      })
    }
  },
  async created() {
    this.rowsPerPage = Math.ceil((window.innerHeight - 500) / 48);
    this.initialize()
    try {
      let payload = {
        page: 1,
        count: 9999
      };
      let res = await this.getAllContacts(payload);
      this.sellers = res.data
    } catch (error) {
      this.$toasted.error(error.statusText || error);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    ...mapActions("advice", {
      getAllTransactions: "getAllTransactions",
      deleteTransaction: "deleteTransaction",
      exportTransactionsToExcel: 'exportTransactionsToExcel',
      exportTransactionsToPDF: 'exportTransactionsToPDF'
    }),
    ...mapActions("contact", {
      getAllContacts: "getAllContacts"
    }),
    async initialize() {
      await this.getAllTransactions(this.queryModel)
    },

    showFilter() {
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") && this.remove(item);
    },

    async remove(item) {
      await this.deleteTransaction(item)
      this.initialize()
    },

    close() {
      this.dialog = false;
    },

    async filter() {
      if (!this.isFilter) {
        this.currentPage = 1
      }
      this.initialize()
      this.isFilter = true;
      this.close();
    },

    async clearFilter() {
      this.filterOptions = Object.assign({}, {
        Invoiced: null,
        SellerUserId: '',
        StartDate: '2020-01-01',
        StartDateChecked: false,
        EndDate: '2020-01-31',
        EndDateChecked: false,
        AdviceRef: '',
        InvoiceNo: ''
      });
      this.currentPage = 1
      this.initialize()
      this.isFilter = false;
    },

    saveToExcel() {
      this.exportTransactionsToExcel(this.queryModel)
    },

    saveToPDF() {
      this.exportTransactionsToPDF(this.queryModel)
    },

    goToAdvice(item) {
      this.$router.push(`/advice/confirmation?id=${item.id}`);
      // this.$router.push({name: 'AdviceConfirmation', params: { id: item.id}});
    },

    goToPaging() {
      this.initialize()
    }
  }
};
</script>

<style>
.datePicker .v-input__prepend-outer {
  display: none;
}
</style>