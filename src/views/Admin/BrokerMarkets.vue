<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>{{icon}}</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          @input="searchInput"
          label="Search "
          solo
          append-icon="search"
          class="max-width-300x"
        ></v-text-field>
      </v-toolbar>
      <v-navigation-drawer
        hide-overlay
        v-model="drawerinternal"
        :permanent="$vuetify.breakpoint.mdAndUp"
        enable-resize-watcher
        :mini-variant="$vuetify.breakpoint.smAndDown"
        :temporary="$vuetify.breakpoint.smAndDown"
        class="commodity-nav-drawer"
        floating
        
      >

        <v-list class="pt-0 inner-sidebar v-menu-trans-list-npd">
          <template v-for="(item, index) in menuItems">
            <v-list-tile
              @click="selectCategory(item.slug)"
              class="border-radius6"
              :class="[item.slug === activeMenu ? 'box-glow' : '']"
              :key="`${index}-menuitems`"
              
            >
              <v-list-tile-avatar>
                <v-avatar size="40">
                  <span>{{ item.title | first3Char }}</span>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <!-- Messaging Section -->
      <v-layout row class="commodity-section">
        <v-flex xs12 pr-0 pt-0 v-bind:pl-0="$vuetify.breakpoint.smAndDown">
          <v-card>
            <v-toolbar card>
              <v-toolbar-side-icon
                @click.stop="drawerinternal = !drawerinternal"
                class="hidden-md-and-up"
              ></v-toolbar-side-icon>
              <v-menu offset-y>
                <v-btn small slot="activator" class="box-glow">
                  {{ showBulkActionOptions ? 'Selected' : 'Select' }}
                  <v-icon right>arrow_drop_down</v-icon>
                </v-btn>
                <v-list class="v-menu-list">
                  <v-list-tile @click="selectAll">
                    <v-list-tile-title>Select All</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="unselectAll">
                    <v-list-tile-title>Unselect All</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-btn icon @click="multipleDeleteConfirmDialog = true" :disabled="!showBulkActionOptions">
                <v-icon color="error">delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="box-glow" dark small right icon @click="BrokerMarketDialog = !BrokerMarketDialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0 commodity-list-section">
              <div>
                <v-list two-line class="v-menu-trans-list-npd">
                  <template v-for="(item, index) in brokerMarkets">
                    <v-list-tile @click="editBrokerMarket(item)" :key="`${index}-listBrokerMarkets`">
                      <v-list-tile-action @click.stop>
                        <v-checkbox color="sidebar" hide-details v-model="item.selected"></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-content @click="editBrokerMarket(item)">
                        <v-list-tile-title class="ma-0"><strong>{{ item.commodityName }}</strong> </v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-content @click="editBrokerMarket(item)">
                        <v-list-tile-title >{{ item.deliveryPointName }} </v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action class="compact-action" @click.stop>
                        <v-menu offset-y>
                          <v-btn icon small slot="activator" class="content-ma-0">
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="deleteBrokerMarketDialogHandler(item)">
                              <v-list-tile-title>
                                <v-icon left>delete</v-icon>Delete
                              </v-list-tile-title>
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                      </v-list-tile-action>
                    </v-list-tile>
                  </template>
                </v-list>

              </div>
            </v-card-text>
            <div class="text-xs-center pt-2" v-if="pagination.total">
              <v-pagination v-model="pagination.page" :length="Math.ceil(pagination.total / rowPerPage)" @input="goToPaging"></v-pagination>
            </div>

          </v-card>
            <v-card-text class="grey--text text-center v-text-center">
                Unless specified Markets will be <span class="font-weight-bold ">visible only to Fox Admin users</span>.<br/>
                Brokers will see only their assigned Market and Delivery Points.
            </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Delete Commodity confirmbox -->
    <v-dialog v-model="confirmBox.deleteCommodity" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Brokermarket ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete the brokermarket ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="resetDialog">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="remove">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Delete Commodity confirmbox -->
    <v-dialog v-model="multipleDeleteConfirmDialog" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete these brokermarkets ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete these brokermarkets ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="multipleDeleteConfirmDialog = false">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="deleteMultipleItems">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Create Commodity Modal -->
    <v-dialog v-model="BrokerMarketDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text" v-if="isEditformMod">Edit Broker Market</span>
              <span class="white--text" v-else>Add Broker Market</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click="BrokerMarketDialog = false">
                <v-icon color="white">close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-img height="200px" class="primary">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 text-xs-center layout align-center justify-center class="white--text">
                <v-avatar size="125px" class="grey lighten-4">
                  <v-icon large>{{icon}}</v-icon>
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                  <v-select :items="commodities" item-value="id" item-text="name" label="Commodity" v-model="form.commodityId"></v-select>
              </v-flex>
              <v-flex xs12>
                  <v-select :items="deliveryPoints" item-value="id" item-text="name" label="Delivery Point" v-model="form.deliveryPointId"></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select :items="brokers" item-value="id" item-text="fullName" label="Broker" v-model="form.brokerUserId"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.native="resetForm">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="updateBrokerMarket()"
            :disabled="$v.form.$invalid"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="createNewBrokerMarket()"
            :disabled="$v.form.$invalid"
            v-else
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { filter, findIndex } from "lodash/core";
import {
  required,
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      commodityId: { required },
    }
  },
  validationMessages: {
    form: {
      commodityId: { required: "Commodity Name is required" },
    }
  },
  data() {
    return {
      title: "Broker Markets",
      icon: "book",
      form: {
        commodityId: "",
        brokerUserId: "",
        deliveryPointId: "",
        notes: null,
        primary: false,
        public: false,
        selected: false
      },
      search: null,
      drawerinternal: true,
      activeMenu: "all",
      brokerMarkets: [],
      commodities: [],
      deliveryPoints: [],
      brokers: [],
      confirmBox: {
        deleteCommodity: false,
        item: null
      },
      BrokerMarketDialog: false,
      multipleDeleteConfirmDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false,
      rowPerPage: 5,
      pagination: {
        count: 5,
        sinceId: 0,
        maxId: 0,
        page: 1,
        total: null
      }
    };
  },
  methods: {
    ...mapActions("commodity", {
      getAllCommodities: "getAllCommodities",
    }),
    ...mapActions("deliveryPoint", {
      getAllDeliveryPoints: "getAllDeliveryPoints",
    }),
    ...mapActions("brokerMarket", {
      getAllBrokerMarkets: "getAllBrokerMarkets",
      addBrokerMarket: "addBrokerMarket",
      deleteBrokerMarkets: "deleteBrokerMarkets",
      updateBrokerMarket: "updateBrokerMarket"
    }),
    ...mapActions("user", {
      getUserList: "getUserList",
    }),
    searchInput: debounce(function(e) {
      this.search = e;
      this.goToPaging();
    }, 500),
    selectCategory(slug) {
      if (this.activeMenu != slug) {
        this.activeMenu = slug;
        this.pagination.page = 1;
      }
      this.goToPaging();
    },
    async goToPaging() {
      let pageObject = Object.assign({}, this.pagination);
      pageObject.count = this.rowPerPage;
      var payload, searchObject = {};
      if (this.search && this.search.length > 0) {
        searchObject['name'] = this.search;
      }
      if (this.activeMenu != 'all') {
        searchObject['brokerUserId'] = this.activeMenu;
      }
      payload = {
        ...searchObject,
        ...pageObject
      }
      let res = await this.getAllBrokerMarkets(payload);
      this.brokerMarkets = Object.assign([], res.multipleResults);
      this.pagination = Object.assign({}, res.paginationMetada);
    },
    selectAll() {
      let tmp = Object.assign([], this.brokerMarkets);
      if (tmp.length > 0) {
        tmp.forEach(element => {
          element.selected = true;
        });
        this.brokerMarkets = Object.assign([], tmp);
      }
    },
    unselectAll() {
      let tmp = Object.assign([], this.brokerMarkets);
      if (tmp.length > 0) {
        tmp.forEach(element => {
          element.selected = false;
        });
        this.brokerMarkets = Object.assign([], tmp);
      }
    },
    deleteMultipleItems() {
      let payload = this.brokerMarkets.filter(item => item.selected).map(item => item.id);
      this.deleteBrokerMarkets(payload).then(res => {
        this.brokerMarkets = Object.assign([], this.unselectedBrokerMarkets);
      });
    },
    toggleFavourite(item) {
      item.primary = !item.primary;
    },
    remove() {
      let index = this.brokerMarkets.indexOf(this.confirmBox.item);
      let payload = [ this.confirmBox.item.id ];
      this.deleteBrokerMarkets(payload).then(res => {
        this.brokerMarkets.splice(index, 1);
        this.resetDialog();
      });
    },
    resetDialog() {
      this.confirmBox = {
        deleteCommodity: false,
        item: null
      };
    },
    deleteBrokerMarketDialogHandler(item) {
      this.confirmBox = {
        deleteCommodity: true,
        item
      };
    },
    formatDate(date) {
      if (!date) {
        return null;
      }

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) {
        return null;
      }

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    resetForm() {
      this.form = {
        commodityId: "",
        brokerUserId: "",
        deliveryPointId: "",
        notes: null,
        primary: false,
        public: false,
        selected: false
      };
      this.BrokerMarketDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editBrokerMarket(commodity) {
      this.form = commodity;
      this.isEditformMod = true;
      this.BrokerMarketDialog = true;
      this.editIndex = findIndex(
        this.brokerMarkets,
        commodity => commodity.id === this.form.id
      );
    },
    createNewBrokerMarket() {
      this.isEditformMod = false;
      return this.addBrokerMarket(this.form).then(res => {
        this.brokerMarkets.push(res);
        this.resetForm();
      });
    },
    updateBrokerMarket() {
      const index = this.editIndex;
      return this.addBrokerMarket(this.form).then(res => {
        this.brokerMarkets[index] = res;
        this.resetForm();
      });
    }
  },
  computed: {
    menuItems() {
      let items = [
        { title: "All Brokers ", isActive: true, slug: "all" },
      ];
      for (let i = 0 ; i < this.brokers.length ; i ++) {
        const element = this.brokers[i];
        items.push({ 
          title: element.fullName, 
          isActive: false, 
          slug: element.id
        });
      }
      return items;
    },
    selectedBrokerMarkets() {
      return filter(this.brokerMarkets, element => element.selected);
    },
    unselectedBrokerMarkets() {
      return filter(this.brokerMarkets, element => !element.selected);
    },
    showBulkActionOptions() {
      return this.selectedBrokerMarkets && this.selectedBrokerMarkets.length > 0;
    }
  },
  watch: {
    BrokerMarketDialog(from, to) {
      if (to) {
        this.resetForm();
      }
    }
  },
  async mounted() {
    let payload = {
      "sort": "",
      "count": 9999,
      "sinceId": 0,
      "maxId": 0,
      "page": 1,
      "fields": ""
    };
    this.goToPaging();
    this.getAllCommodities().then(res => {
      this.commodities = [...res.active, ...res.inActive];
    })
    let deliveryPayload = {
      count: 9999,
      page: 1
    }
    let deliveryResult = await this.getAllDeliveryPoints(deliveryPayload);
    this.deliveryPoints = deliveryResult.data;
    let res = await this.getUserList();
    this.brokers = res.filter(item => item.userType == "Broker" && item.archived == null);
  }
};
</script>
<style scoped lang="stylus">
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}

.commodity-nav-drawer
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  height: calc(100vh - 214px) !important
.commodity-section
  width: calc(100% - 300px)
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  .commodity-list-section
    height: calc(100vh - 280px)
    overflow-y: auto
@media (max-width: 959px)
  .commodity-nav-drawer.v-navigation-drawer--close
    width: 0px !important
    + .contact-section
      width: 100%
  .commodity-nav-drawer.v-navigation-drawer--open
    overflow-y: auto
    + .commodity-section
      width: calc(100% - 80px)
</style>
