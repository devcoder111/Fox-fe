<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>date_range</v-icon>
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
        class="delivery-nav-drawer"
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
      <v-layout row class="delivery-section">
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
              <v-btn icon @click="confirmMultipleRemove = true" :disabled="!showBulkActionOptions">
                <v-icon color="error">delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="box-glow" dark small right icon @click="deliveryDialog = !deliveryDialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0 delivery-list-section">
              <div>
                <v-list two-line class="v-menu-trans-list-npd">
                  <template v-for="(item, index) in deliveryPeriods">
                    <v-list-tile @click="editDelivery(item)" :key="`${index}-listdelivery`">
                      <v-list-tile-action @click.stop>
                        <v-checkbox color="sidebar" hide-details v-model="item.selected"></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-action
                        @click.stop="togglePublic(item)"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.public ? 'amber' : ''"
                        >{{ item.public ? 'public' : 'visibility_off' }}</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-content @click="editDelivery(item)">
                        <v-list-tile-title class="ma-0">{{ item.name }} </v-list-tile-title>
                        <!-- <v-list-tile-sub-title class="ma-0 menu-list-hover-text hidden-sm-and-up">{{ item.email }}</v-list-tile-sub-title> -->
                      </v-list-tile-content>


                      <v-list-tile-action class="compact-action" @click.stop>
                        <v-menu offset-y>
                          <v-btn icon small slot="activator" class="content-ma-0">
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="deleteDeliveryDialogHandler(item)">
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
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Delete Delivery confirmbox -->
    <v-dialog v-model="confirmBox.deleteDelivery" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Delivery ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete the Delivery ?</v-card-text>
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
    <!-- Delete Delivery confirmbox -->
    <v-dialog v-model="confirmMultipleRemove" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Delivery ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete selected delivery points ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="confirmMultipleRemove = false">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="deleteSelectedItems" :loading="deleteLoading">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Create Delivery Modal -->
    <v-dialog v-model="deliveryDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text" v-if="isEditformMod">Edit Delivery Period</span>
              <span class="white--text" v-else>New Delivery Period</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click="deliveryDialog = false">
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
                  <v-icon large>location_on</v-icon>
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.name')"
                  @input="$v.form.name.$touch()"
                  @blur="$v.form.name.$touch()"
                  prepend-icon="edit"
                  label="Name"
                  v-model="form.name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field prepend-icon="c" label="Description" v-model="form.description"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.native="resetDeliveryForm()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="updateDelivery()"
            :disabled="$v.form.$invalid"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="createNewDelivery()"
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
  maxLength,
  minLength
} from "vuelidate/lib/validators";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required }
    }
  },
  validationMessages: {
    form: {
      name: { required: "Name is required" }
    }
  },
  data() {
    return {
      title: "Delivery Periods",
      form: {
        name: "",
        description: "",
        public: false,
        selected: false
      },
      search: null,
      drawerinternal: true,
      activeMenu: "all",
      menuItems: [
        { title: "All Periods ", isActive: true, slug: "all" },
        { title: "Unpublic", isActive: false, slug: "unpublic" },
        { title: "Public", isActive: false, slug: "public" }
      ],
      deliveryPeriods: [],
      confirmBox: {
        deleteDelivery: false,
        item: null
      },
      deliveryDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false,
      saveLoading: false,
      deleteLoading: false,
      rowPerPage: 5,
      pagination: {
        count: 5,
        sinceId: 0,
        maxId: 0,
        page: 1,
        total: null
      },
      confirmMultipleRemove: false
    };
  },
  methods: {
    ...mapActions("deliveryPeriod", {
      getAllDeliveryPeriods: "getAllDeliveryPeriods",
      getPublicDeliveryPeriods: "getPublicDeliveryPeriods",
      addDeliveryPeriod: "addDeliveryPeriod",
      updateDeliveryPeriod: "updateDeliveryPeriod",
      publishDeliveryPeriod: "publishDeliveryPeriod",
      unpublishDeliveryPeriod: "unpublishDeliveryPeriod",
      deleteDeliveryPeriod: "deleteDeliveryPeriod",
    }),
    deleteSelectedItems() {
      this.deleteLoading = true;
      return Promise.all(this.selectedDeliveryPeriods.map(item => {
        return this.deleteDeliveryPeriod(item)
        .then(res => {
          return true;
        });
      })).then(_ => {
        this.deliveryPeriods = Object.assign([], this.unselectedDeliveryPeriods);
        this.confirmMultipleRemove = false;
        this.deleteLoading = false;
      }).catch(err => {
        this.confirmMultipleRemove = false;
      });
    },
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
      var payload, searchObject = {
        "hasFilter": false,
        "filters": []
      };
      if (this.search && this.search.length > 0) {
        searchObject.hasFilter = true;
        searchObject.filters.push({
          "fieldName": "Name",
          "value": this.search,
          "operator": 3,
          "tablePrefix": null
        });
      }
      payload = {
        ...searchObject,
        ...pageObject
      }
      let res;
      switch (this.activeMenu) {
        case 'all':
          res = await this.getAllDeliveryPeriods(payload);
          break;
        case 'public':
          res = await this.getPublicDeliveryPeriods(payload);
          break;
        case 'unpublic':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "Public",
            "value": false,
            "operator": 1
          });
          res = await this.getAllDeliveryPeriods(payload);
          break;
        default:
          break;
      }
      this.deliveryPeriods = Object.assign([], res.data);
      this.pagination = Object.assign({}, res.pagination);
    },
    selectAll() {
      let tmp = Object.assign([], this.deliveryPeriods);
      if (this.deliveryPeriods.length > 0) {
        tmp.forEach(element => {
          element.selected = true;
        });
        this.deliveryPeriods = Object.assign([], tmp);
      }
    },
    unselectAll() {
      let tmp = Object.assign([], this.deliveryPeriods);
      if (this.deliveryPeriods.length > 0) {
        tmp.forEach(element => {
          element.selected = false;
        });
        this.deliveryPeriods = Object.assign([], tmp);
      }
    },
    togglePublic(item) {
      if (item.public) {
        return this.unpublishDeliveryPeriod(item).then(res => {
          item.public = false;
        });
      } else {
        return this.publishDeliveryPeriod(item).then(res => {
          item.public = true;
        });
      }
    },
    remove() {
      let index = this.deliveryPeriods.indexOf(this.confirmBox.item);
      this.deleteLoading = true;
      return this.deleteDeliveryPeriod(this.confirmBox.item).then(res => {
        this.deliveryPeriods.splice(index, 1);
        this.resetDialog();
        this.deleteLoading = false;
      });
    },
    resetDialog() {
      this.confirmBox = {
        deleteDelivery: false,
        item: null
      };
    },
    deleteDeliveryDialogHandler(item) {
      this.confirmBox = {
        deleteDelivery: true,
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
    resetDeliveryForm() {
      this.form = {
        name: "",
        description: "",
        public: false,
        selected: false
      };
      this.deliveryDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editDelivery(delivery) {
      this.form = delivery;
      this.isEditformMod = true;
      this.deliveryDialog = true;
      this.editIndex = findIndex(
        this.deliveryPeriods,
        delivery => delivery === this.form
      );
    },
    createNewDelivery() {
      this.saveLoading = true;
      return this.addDeliveryPeriod(this.form).then(res => {
        this.deliveryPeriods.push(this.form);
        this.saveLoading = false;
        this.isEditformMod = false;
        this.resetDeliveryForm();
      });
    },
    updateDelivery() {
      const index = this.editIndex;
      this.saveLoading = true;
      return this.updateDeliveryPoint(this.form).then(res => {
        this.deliveryPeriods[index] = this.form;
        this.resetDeliveryForm();
        this.saveLoading = false;
      });
    }
  },
  computed: {
    selectedDeliveryPeriods() {
      return filter(this.deliveryPeriods, element => element.selected);
    },
    unselectedDeliveryPeriods() {
      return filter(this.deliveryPeriods, element => !element.selected);
    },
    showBulkActionOptions() {
      return this.selectedDeliveryPeriods && this.selectedDeliveryPeriods.length > 0;
    }
  },
  watch: {
    deliveryDialog(from, to) {
      if (to) {
        this.resetDeliveryForm();
      }
    }
  },
  async mounted() {
    this.goToPaging();
  }
};
</script>
<style scoped lang="stylus">
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}

.delivery-nav-drawer
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  height: calc(100vh - 214px) !important
.delivery-section
  width: calc(100% - 300px)
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  .delivery-list-section
    height: calc(100vh - 280px)
    overflow-y: auto
@media (max-width: 959px)
  .delivery-nav-drawer.v-navigation-drawer--close
    width: 0px !important
    + .contact-section
      width: 100%
  .delivery-nav-drawer.v-navigation-drawer--open
    overflow-y: auto
    + .delivery-section
      width: calc(100% - 80px)
</style>
