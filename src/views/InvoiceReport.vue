<template>
  <div>
    <section-definition :title="page.title">
      <template v-slot:actions>
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
          <v-data-table
            :headers="headers"
            :items="invoices"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.invoiceDate | dateFormat }}</td>
              <td class="text-xs-left light-blue--text text--darken-4 cursor-pointer" @click="goToAdvice(props.item)">{{ props.item.adviceRef }}</td>
              <td class="text-xs-left light-blue--text text--darken-4 cursor-pointer" @click="showInvoice(props.item)">{{ props.item.invoiceNo }}</td>
              <td class="text-xs-left">{{ props.item.sellerName }}</td>
              <td class="text-xs-left">{{ props.item.buyerName }}</td>
              <td class="text-xs-left">{{ props.item.commodity }}</td>
              <td class="text-xs-right">{{ props.item.quantity }}</td>
              <td class="text-xs-right">{{ props.item.price.toFixed(0) }}</td>
              <td class="text-xs-right">{{ props.item.brokerageRate.toFixed(2) }}</td>
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
          </v-data-table>
          <div class="text-xs-center pt-2" v-if="currentPage">
            <v-pagination v-model="currentPage" :length="totalPage" @input="goToPaging"></v-pagination>
          </div>
        </v-flex>
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
        title: "Invoice Report",
        headline: "Invoice Report",
        description: `A blank page is good to quick-start from scratch.`
      },
      headers: [
        { text: "Invoice Due", value: "invoiceDate", class: "bg-grey" },
        { text: "Advice Ref.", value: "adviceRef", class: "bg-grey" },
        { text: "Inv. No.", value: "invoiceNo", class: "bg-grey" },
        { text: "Seller", value: "seller", class: "bg-grey" },
        { text: "Buyer", value: "buyer", class: "bg-grey" },
        { text: "Commodity", value: "commodity", class: "bg-grey" },
        { text: "Quantity", value: "quantity", align: "right", class: "bg-grey" },
        { text: "Rate", value: "rate", align: "right", class: "bg-grey" },
        { text: "Brokerage", value: "TotalBrokerage", align: "right", class: "bg-grey" },
        { text: "Actions", value: "name", sortable: false, class: "bg-grey" }
      ],
      currentPage: 1
    };
  },
  computed: {
    invoices() {
      return this.$store.state.advice.invoice.data;
    },
    totalPage() {
      return this.$store.state.advice.invoice.totalPage;
    },
    rowsPerPage() {
      return 5;
    },
    queryModel() {
      return {
        count: this.rowsPerPage,
        page: this.currentPage
      }
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("advice", {
      getAllInvoices: "getAllInvoices",
      exportInvoiceToPDF: "exportInvoiceToPDF",
      exportInvoicesToExcel: "exportInvoicesToExcel"
    }),
    async initialize() {
      await this.getAllInvoices(this.queryModel)
    },

    saveToExcel() {
      this.exportInvoicesToExcel(this.queryModel);
    },

    goToAdvice(item) {
      this.$router.push({name: 'AdviceConfirmation', params: { id: item.id}});
    },

    showInvoice(item) {
      var pdfData = this.exportInvoiceToPDF(item);
      //TODO: display the PDF in a new tab
    },

    printItem(item) {
      this.exportInvoiceToPDF(item);
    },

    goToPaging() {
      this.initialize()
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>