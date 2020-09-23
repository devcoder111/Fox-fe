<template>
  <div>
    <v-container fluid grid-list-xl page>
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>receipt</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">Confirmation Advice</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon aria-controls :readonly="disableEdit"  @click="printTransaction">print</v-icon>
      </v-toolbar>

      <v-layout row wrap>
        <v-flex xl3 lg3 md3 sm6 xs12>
          <v-menu
            ref="AdviceDateMenu"
            v-model="AdviceDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="AdviceDateFormatted"
                label="Advice Date"
                prepend-icon="event"
                @blur="AdviceDate = parseDate(AdviceDateFormatted)"
                v-on="on"
                :readonly="disableEdit"
              ></v-text-field>
            </template>
            <v-date-picker v-model="AdviceDate" :readonly="disableEdit" no-title @input="AdviceDateMenu = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xl3 lg3 md3 sm6 xs12>
          <v-menu
            ref="DateToBeInvoicedMenu"
            v-model="DateToBeInvoicedMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="DateToBeInvoicedFormatted"
                label="Date to be Invoiced"
                prepend-icon="event"
                @blur="formModel.invoiceDate = parseDate(DateToBeInvoicedFormatted)"
                v-on="on"
                :readonly="disableEdit"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formModel.invoiceDate"
              no-title
              :readonly="disableEdit"
              @input="DateToBeInvoicedMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xl3 lg3 md3 sm6 xs12>
          <v-text-field label="Invoice Number" readonly v-model="formModel.invoiceNo" :disabled="!disableEdit" max-width="180px"></v-text-field>
        </v-flex>

        <v-flex xl3 lg3 md3 sm6 xs12>
          <v-text-field label="Advice Ref" readonly v-model="formModel.adviceRef" :disabled="!disableEdit" max-width="180px"></v-text-field>
        </v-flex>

        <v-flex xl6 lg6 md6 sm12 xs12 mb-3>
          <v-card>
            <v-flex offset-xl1>
              <h3 class="headline mb-0">Buyer</h3>
            </v-flex>
            <v-flex offset-xl1>
              <v-autocomplete
                :items="companyItems"
                item-text="entityName"
                item-value="id"
                label="Name"
                v-model="buyerCompanyId"
                @change="buyerUserChanged"
                :readonly="disableEdit"
              ></v-autocomplete>
            </v-flex>
            <v-flex xl3 offset-xl1>
              <v-text-field label="Contract Number" v-model="formModel.buyerContractNum" :readonly="disableEdit"></v-text-field>
            </v-flex>
            <v-flex xl7 offset-xl1>
              <v-autocomplete
                :items="buyerContactItems"
                item-text="firstName"
                item-value="id"
                label="Contact"
                @change="buyerContactChanged"
                v-model="formModel.buyerContactId"
                :error-messages="fieldErrors('formModel.buyerContactId')"
                @input="$v.formModel.buyerContactId.$touch()"
                @blur="$v.formModel.buyerContactId.$touch()"
                :readonly="disableEdit"
                required
              ></v-autocomplete>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xl6 lg6 md6 sm12 xs12 mb-3>
          <v-card>
            <v-flex offset-xl1>
              <h3 class="headline mb-0">Seller</h3>
            </v-flex>
            <v-flex offset-xl1>
              <v-autocomplete
                :items="companyItems"
                label="Name"
                item-text="entityName"
                item-value="id"
                v-model="sellerCompanyId"
                @change="sellerUserChanged"
                :readonly="disableEdit"
              ></v-autocomplete>
            </v-flex>
            <v-flex xl3 offset-xl1>
              <v-text-field label="Contract Number" v-model="formModel.sellerContractNum" :readonly="disableEdit"></v-text-field>
            </v-flex>
            <v-flex xl7 offset-xl1>
              <v-autocomplete
                :items="sellerContactItems"
                item-text="firstName"
                item-value="id"
                v-model="formModel.sellerContactId"
                @change="sellerContactChanged"
                label="Contact"
                :error-messages="fieldErrors('formModel.sellerContactId')"
                @input="$v.formModel.sellerContactId.$touch()"
                @blur="$v.formModel.sellerContactId.$touch()"
                :readonly="disableEdit"
                required
              ></v-autocomplete>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xl3 lg3 md3 sm12 xs12>
          <v-select
            :items="commodityItems"
            label="Commodity"
            item-value="id"
            item-text="name"
            v-model="commodity"
            @change="updateCommodity"
            :readonly="disableEdit"
          ></v-select>
        </v-flex>
        <v-flex xl3 lg3 md3 sm12 xs12>
          <v-select
            :items="qualityItems"
            label="Quality"
            item-value="id"
            item-text="name"
            v-model="formModel.commodityGradeId"
            :loading="qualityLoading"
            :error-messages="fieldErrors('formModel.commodityGradeId')"
            @input="$v.formModel.commodityGradeId.$touch()"
            @blur="$v.formModel.commodityGradeId.$touch()"
            :readonly="disableEdit"
            required
          ></v-select>
        </v-flex>
        <v-flex offset-xl2 offset-lg2 xl2 lg2 md2 sm6 xs6>
          <v-text-field 
            label="Price (A$)"
            type="number"
            v-model="formModel.price"
            :error-messages="fieldErrors('formModel.price')"
            @input="$v.formModel.price.$touch()"
            @blur="$v.formModel.price.$touch()"
            @change="priceChanged"
            :readonly="disableEdit"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xl2 lg2 md2 sm6 xs6>
          <Lookup :label="`Price Clause`" :getAll="`clause/getPriceClauses`" :addNew="`clause/addPriceClause`" :item_text="`text`" :item_value="`id`" @update-value="updatePriceClause" :default="formModel.priceClauseId" :readonly="disableEdit" />
        </v-flex>
        <v-flex xl2 lg2 md2 sm6 xs6>
          <v-text-field 
            label="Quantity"
            type="number"
            v-model="formModel.quantity"
            :error-messages="fieldErrors('formModel.quantity')"
            @input="$v.formModel.quantity.$touch()"
            @blur="$v.formModel.quantity.$touch()"
            @change="caculateContractValue"
            :readonly="disableEdit"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xl2 lg2 md2 sm6 xs6>
          <v-select :items="quantityItems" item-value="id" item-text="text" :value="1" readonly></v-select>
        </v-flex>
        <v-flex xl8 lg8 md2 sm6 xs6>
          <Lookup :label="`Quantity Clause`" :getAll="`clause/getQuantityClauses`" :addNew="`clause/addQuantityClause`" :item_text="`text`" :item_value="`id`" @update-value="updateQuantityClause" :default="formModel.quantityClauseId" :readonly="disableEdit" />
        </v-flex>

        <v-flex xl4 lg4 md4 sm4 xs12>
          <v-select
            :items="deliveryPeriodItems"
            item-value="id"
            item-text="name"
            label="Delivery Period"
            v-model="formModel.deliveryPeriodId"
            :error-messages="fieldErrors('formModel.deliveryPeriodId')"
            @input="$v.formModel.deliveryPeriodId.$touch()"
            @blur="$v.formModel.deliveryPeriodId.$touch()"
            :readonly="disableEdit"
            required
          ></v-select>
        </v-flex>
        <v-flex xl8 lg8 md3 sm6 xs6>
          <v-select
            :items="deliveryOptionItems"
            label="Delivery Option"
            item-value="id"
            item-text="name"
            v-model="formModel.deliveryPointId"
            :error-messages="fieldErrors('formModel.deliveryPointId')"
            @input="$v.formModel.deliveryPointId.$touch()"
            @blur="$v.formModel.deliveryPointId.$touch()"
            :readonly="disableEdit"
            required
          ></v-select>
        </v-flex>
        <v-flex xl12 class="d-flex justify-space-between">
          <div class="pa-2">
            <Lookup :label="`Payment`" :getAll="`clause/getPaymentClauses`" :addNew="`clause/addPaymentClause`" :item_text="`text`" :item_value="`id`" @update-value="updatePaymentClause" :default="formModel.paymentClauseId" :readonly="disableEdit" />
          </div>
          <div class="pa-2">
            <Lookup :label="`Insurance`" :getAll="`clause/getInsuranceClauses`" :addNew="`clause/addInsuranceClause`" :item_text="`text`" :item_value="`id`" @update-value="updateInsuranceClause" :default="formModel.insuranceClauseId" :readonly="disableEdit" />
          </div>
          <div class="pa-2">
            <Lookup :label="`Freight`" :getAll="`clause/getFreightClauses`" :addNew="`clause/addFreightClause`" :item_text="`text`" :item_value="`id`" @update-value="updateFreightClause" :default="formModel.freightClauseId" :readonly="disableEdit" />
          </div>
          <div class="pa-2">
            <Lookup :label="`Storage`" :getAll="`clause/getStorageClauses`" :addNew="`clause/addStorageClause`" :item_text="`text`" :item_value="`id`" @update-value="updateStorageClause" :default="formModel.storageClauseId" :readonly="disableEdit" />
          </div>
          <div class="pa-2">
            <Lookup :label="`Weights`" :getAll="`clause/getWeightClauses`" :addNew="`clause/addWeightClause`" :item_text="`text`" :item_value="`id`" @update-value="updateWeightClause" :default="formModel.weightClauseId" :readonly="disableEdit" />
          </div>
        </v-flex>
        <v-flex xl12>
          <v-radio-group v-model="formModel.isGstIncluded" :readonly="disableEdit" row label="GST Status">
            <v-radio :label="`Price excludes GST`" :value="false"></v-radio>
            <v-radio :label="`Price includes GST`" :value="true"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            name="specialConditions"
            label="Special Conditions"
            v-model="formModel.specialConditions"
            :readonly="disableEdit"
          ></v-textarea>
        </v-flex>
        <v-flex xl6>
          <v-radio-group v-model="formModel.isBrokerageSellersCost" @change="brokerageOptionChanged" :readonly="disableEdit" row label="Brokerage Data">
            <v-radio :label="`Sellers Cost`" :value="true"></v-radio>
            <v-radio :label="`Buyers Cost`" :value="false"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xl2 offset-xl2>
          <v-text-field 
            label="Rate (A$)" 
            type="number"
            v-model="formModel.brokerageRate"
            :error-messages="fieldErrors('formModel.brokerageRate')"
            @input="$v.formModel.brokerageRate.$touch()"
            @blur="$v.formModel.brokerageRate.$touch()"
            @change="brokerageRateChanged"
            :readonly="disableEdit"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xl2>
          <v-select :items="brokeragePerItems" item-value="id" item-text="text" v-model="brokeragePer" label="Per"></v-select>
        </v-flex>
        <v-flex xl12>
          <Lookup :label="`Brokerage Clause`" :getAll="`clause/getBrokerageClauses`" :addNew="`clause/addBrokerageClause`" :item_text="`text`" :item_value="`id`" @update-value="updateBrokerageClause" :default="formModel.brokerageClauseId" :readonly="disableEdit" />
        </v-flex>
        <v-flex xl3>
          <Lookup :label="`Rules`" :getAll="`clause/getRuleClauses`" :addNew="`clause/addRuleClause`" :item_text="`text`" :item_value="`id`" @update-value="updateRuleClause" :default="formModel.ruleClauseId" :readonly="disableEdit" />
        </v-flex>
        <v-flex xl2 offset-xl5>
          <v-text-field label="Contract Value" v-model="formModel.contractValue" :disabled="!disableEdit" readonly></v-text-field>
        </v-flex>
        <v-flex xl2>
          <v-text-field label="Total Commission" v-model="formModel.totalCommission" :disabled="!disableEdit" readonly></v-text-field>
        </v-flex>
      </v-layout>
      <v-card-actions class="justify-center mt-5 mb-4">
        <v-btn
          type="submit"
          @click="confirm"
          :disabled="$v.formModel.$invalid || disableEdit"
          :large="$vuetify.breakpoint.smAndUp"
          xs12
          class="border-radius6 md-deep-orange-500 font-weight-bold"
          block
        >COMMIT</v-btn>
      </v-card-actions>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Lookup from "@/components/Widgets/Lookup";
import validationMixin from "@/mixins/validationMixin";
import { required } from 'vuelidate/lib/validators'
import moment from 'moment';

export default {
  mixins: [validationMixin],
  validations: {
    formModel: {
      buyerContactId: { required },
      sellerContactId: { required },
      commodityGradeId: { required },
      quantity: { required },
      price: { required },
      brokerageRate: { required },
      deliveryPointId: { required },
      deliveryPeriodId: { required },
      // quantityClauseId: { required },
      // paymentClauseId: { required },
      // storageClauseId: { required },
      // weightClauseId: { required },
      // ruleClauseId: { required },
      // brokerageClauseId: { required },
      // freightClauseId: { required },
      // insuranceClauseId: { required },
      // specialConditions: { required },
      // isGstIncluded: { required },
    }
  },
  validationMessages: {
    formModel: {
      buyerContactId: { required: 'Buyer contact is required' },
      sellerContactId: { required: 'Seller contact is required' },
      commodityGradeId: { required: 'Commodity grade is required' },
      quantity: { required: 'Quantity is required' },
      price: { required: 'Price is required' },
      brokerageRate: { required: 'Brokerage rate is required' },
      deliveryPointId: { required: 'Delivery point is required' },
      deliveryPeriodId: { required: 'Delivery period is required' },
      // quantityClauseId: { required: 'Quantity clause is required' },
      // paymentClauseId: { required: 'Payment clause is required' },
      // storageClauseId: { required: 'Storage clause is required' },
      // weightClauseId: { required: 'Weight clause is required' },
      // ruleClauseId: { required: 'Rule clause is required' },
      // brokerageClauseId: { required: 'Brokerage clause is required' },
      // freightClauseId: { required: 'Freight clause is required' },
      // insuranceClauseId: { required: 'Insurance clause is required' },
      // specialConditions: { required: 'Special condition is required' },
      // isGstIncluded: { required: 'Please select one' },
    }
  },
  data() {
    return {
      AdviceDateMenu: false,
      AdviceDate: moment().format('YYYY-MM-DD'),
      AdviceDateFormatted: this.formatDate(
        moment().format('YYYY-MM-DD')
      ),
      DateToBeInvoicedMenu: false,
      DateToBeInvoiced: moment().format('YYYY-MM-DD'),
      DateToBeInvoicedFormatted: this.formatDate(
        moment().format('YYYY-MM-DD')
      ),
      sellerContactItems: [],
      buyerContactItems: [],
      buyerContractNumber: null,
      sellerContractNumber: null,
      commodityItems: [],
      companyItems: [],
      commodity: null,
      qualityItems: [],
      price: null,
      priceItems: ["$200", "$150", "$100", "$50"],
      quantity: null,
      quantityItems: [ {
        id: 1,
        text: "METRIC TONS"
      }, {
        id: 2,
        text: "Bar"
      }],
      deliveryPeriod: null,
      deliveryPeriodItems: [],
      deliveryOptionItems: ["Taxi"],
      insuranceItems: ["$500", "$250", "$150"],
      freightItems: ["$500", "$250", "$150"],
      gstStatus: null,
      brokerage: true,
      ratePerItems: [],
      sellerCompanyId: null,
      buyerCompanyId: null,

      formModel: {
        adviceRef: "",
        invoiceDate: moment().format('YYYY-MM-DD'),
        invoiceNo: null,
        tradeType: 0,
        adviceNo: "string",
        buyerContactId: "",
        sellerContactId: "",
        commodityGradeId: "",
        quantity: 0,
        price: 0,
        brokerageRate: 0,
        deliveryPointId: "",
        deliveryPeriodId: "",
        quantityClauseId: 0,
        paymentClauseId: 0,
        storageClauseId: 0,
        weightClauseId: 0,
        priceClauseId: 0,
        ruleClauseId: 0,
        brokerageClauseId: 0,
        freightClauseId: 0,
        insuranceClauseId: 0,
        specialConditions: "",
        isGstIncluded: true,
        buyerContractNum: "",
        sellerContractNum: "",
        isBrokerageSellersCost: true,
        contractValue: 0,
        totalCommission: 0,
      },

      disableEdit: false,

      brokeragePerItems: [{
        text: 'TONNE',
        id: 1
      }],
      brokeragePer: 1,

      qualityLoading: false
    };
  },

  components: {
    Lookup,
  },

  watch: {
    AdviceDate(val) {
      this.AdviceDateFormatted = this.formatDate(this.AdviceDate);
    },
    "formModel.invoiceDate"(val) {
      this.DateToBeInvoicedFormatted = this.formatDate(this.formModel.invoiceDate);
    }
  },

  computed: {
  },

  methods: {
    ...mapActions([
      'startLoading',
      'stopLoading'
    ]),

    ...mapActions("deliveryPeriod", {
      getAllDeliveryPeriods: "getAllDeliveryPeriods",
    }),

    ...mapActions("deliveryPoint", {
      getAllDeliveryPoints: "getAllDeliveryPoints",
    }),

    ...mapActions("commodity", {
      getPublicCommodities: "getPublicCommodities",
    }),

    ...mapActions("commodityGrade", {
      getGradesByCommodity: "getGradesByCommodity",
    }),

    ...mapActions("company", {
      getAllCompanies: "getAllCompanies",
    }),

    ...mapActions("contact", {
      getAllContacts: "getAllContacts",
      getContactsByCompany: "getContactsByCompany",
      getSellerContacts: "getSellerContacts"
    }),

    ...mapActions("advice", {
      getTransactionDetail: "getTransactionDetail",
      updateTransaction: "updateTransaction",
      exportTransactionToPDF: "exportTransactionToPDF",
      addNewAdvice: "addNewAdvice"
    }),

    priceChanged(e) {
      this.caculateContractValue();
      this.formModel.price = parseFloat(this.formModel.price).toFixed(0);
    },

    brokerageRateChanged(e) {
      this.calculateTotalCommission();
      this.formModel.brokerageRate = parseFloat(this.formModel.brokerageRate).toFixed(2);
    },

    caculateContractValue() {
      this.formModel.contractValue =  this.formModel.price * this.formModel.quantity;
      this.calculateTotalCommission();
    },

    calculateTotalCommission() {
      this.formModel.totalCommission = this.formModel.brokerageRate * this.formModel.quantity;
      this.formModel.totalCommission = this.formModel.totalCommission.toFixed(2);
    },

    printTransaction() {
      if (this.$route.query.id) {
        return this.exportTransactionToPDF(this.formModel).then(res => {
          console.log(res);
        });
      }
    },

    updatePriceClause(val) {
      this.formModel.priceClauseId = val;
    },

    updatePaymentClause(val) {
      this.formModel.paymentClauseId = val;
    },

    updateStorageClause(val) {
      this.formModel.storageClauseId = val;
    },

    updateWeightClause(val) {
      this.formModel.weightClauseId = val;
    },

    updateBrokerageClause(val) {
      this.formModel.brokerageClauseId = val;
    },

    updateQuantityClause(val) {
      this.formModel.quantityClauseId = val;
    },

    updateRuleClause(val) {
      this.formModel.ruleClauseId = val;
    },

    updateInsuranceClause(val) {
      this.formModel.insuranceClauseId = val;
    }, 

    updateFreightClause(val) {
      this.formModel.freightClauseId = val;
    },

    buyerContactChanged(e) {
      for (let i = 0; i < this.buyerContactItems.length ; i ++) {
        const element = this.buyerContactItems[i];
        if (element.id == e) {
          this.buyerCompanyId = element.companyId;
          if (!this.formModel.isBrokerageSellersCost) {
            this.formModel.brokerageRate = element.brokerage;
          }
        }
      }
    },

    sellerContactChanged(e) {
      for (let i = 0; i < this.sellerContactItems.length ; i ++) {
        const element = this.sellerContactItems[i];
        if (element.id == e) {
          this.sellerCompanyId = element.companyId;
          if (this.formModel.isBrokerageSellersCost) {
            this.formModel.brokerageRate = element.brokerage;
          }
        }
      }
    },

    brokerageOptionChanged(e) {
      let items = [];
      let selectedId;
      if (e) {
        items = Object.assign([], this.sellerContactItems);
        selectedId = this.formModel.sellerContactId;
      } else {
        items = Object.assign([], this.buyerContactItems);
        selectedId = this.formModel.buyerContactId;
      }

      if (selectedId) {
        for (let i = 0; i < items.length ; i ++) {
          if (selectedId == items[i].id) {
            this.formModel.brokerageRate = items[i].brokerage;
          }
        }
      }
    },

    async sellerUserChanged(e) {
      let payload = {
        id: e
      };
      this.sellerContactItems = await this.getContactsByCompany(payload);
      this.sellerContactItems.sort(this.compareContact);

      let primaryContact = this.sellerContactItems.filter(item => item.isPrimary);
      if (primaryContact.length > 0)
        this.formModel.sellerContactId = primaryContact[0].id;
    },

    async buyerUserChanged(e) {
      let payload = {
        id: e
      };
      this.buyerContactItems = await this.getContactsByCompany(payload);
      this.buyerContactItems.sort(this.compareContact);

      let primaryContact = this.buyerContactItems.filter(item => item.isPrimary);
      if (primaryContact.length > 0)
        this.formModel.buyerContactId = primaryContact[0].id;
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("T")[0].split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    updateCommodity(commodity) {
      let payload = {
        id: commodity
      };
      this.qualityItems = [];
      this.qualityLoading = true;
      this.getGradesByCommodity(payload).then(res => {
        this.qualityItems = res;
        this.qualityLoading = false;
      });
    },

    confirm() {
      if (this.formModel.id) {
        return this.updateTransaction(this.formModel).then(res => {
          this.$toasted.success('Successfully updated');
          this.$router.push({ name: 'TransactionReport' });
        });
      } else {
        return this.addNewAdvice(this.formModel).then(res => {
          this.$toasted.success('Successfully created');
          this.$router.push({ name: 'TransactionReport' });
        });
      }
    },

    compareContact(a, b) {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      } else if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    },

    compareCompany(a, b) {
      if (a.entityName.toLowerCase() > b.entityName.toLowerCase()) {
        return 1;
      } else if (a.entityName.toLowerCase() < b.entityName.toLowerCase()) {
        return -1;
      } else return 0;
    }
  },

  async mounted() {
    let payload = {
      count: 9999,
      page: 1,
      hasfilter: false
    }
    this.startLoading();
    let deliveryPeriodResult = await this.getAllDeliveryPeriods(payload);
    this.deliveryPeriodItems = deliveryPeriodResult.data;
    let deliveryPointResult = await this.getAllDeliveryPoints(payload);
    this.deliveryOptionItems = deliveryPointResult.data;

    let commodityResult = await this.getPublicCommodities(payload);
    this.commodityItems = commodityResult.data;
    
    let result = await this.getAllCompanies(payload);
    this.companyItems = result.data;
    this.companyItems.sort(this.compareCompany);

    let res = await this.getAllContacts(payload);
    this.buyerContactItems = Object.assign([], res.data);
    this.buyerContactItems.sort(this.compareContact);
    res = await this.getSellerContacts(payload);
    this.sellerContactItems = Object.assign([], res.data);
    this.sellerContactItems.sort(this.compareContact);

    
    if (this.$route.query.id) {
      let res = await this.getTransactionDetail(this.$route.query);
      this.disableEdit = res.invoiceId ? true : false;
      this.formModel = Object.assign({}, res);
      if (res.tradeType == 'Sell') {
        this.formModel.tradeType = 0;
      } else {
        this.formModel.tradeType = 1;
      }
      this.buyerContactChanged(this.formModel.buyerContactId);
      this.sellerContactChanged(this.formModel.sellerContactId);
      for (let i = 0; i < this.commodityItems.length ; i ++) {
        const element = this.commodityItems[i];
        if (element.name == this.formModel.commodity) {
          this.commodity = element.id;
          this.updateCommodity(element.id);
        }
      }
    }
    this.stopLoading();
  }
};
</script>

<style lang="stylus" scoped>
.flex {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.v-text-field {
  margin-top: 0 !important;
}
</style>
