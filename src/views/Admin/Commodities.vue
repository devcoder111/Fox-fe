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
              <v-btn icon @click="showMultipleDeleteConfirmDialog = true" :disabled="!showBulkActionOptions">
                <v-icon color="error">delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="box-glow" dark small right icon @click="commodityDialog = !commodityDialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0 commodity-list-section">
              <div>
                <v-list two-line class="v-menu-trans-list-npd">
                  <template v-for="(item, index) in commodities">
                    <v-list-tile @click="editCommodity(item)" :key="`${index}-listcommodity`">
                      <v-list-tile-action @click.stop>
                        <v-checkbox color="sidebar" hide-details v-model="item.selected"></v-checkbox>
                      </v-list-tile-action>
                      <!-- 
                      <v-list-tile-action
                        @click.stop="item.primary = !item.primary"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.primary ? 'amber' : ''"
                        >{{ item.primary ? 'label_important' : 'grain' }}</v-icon>
                      </v-list-tile-action> -->

                      <v-list-tile-action
                        @click.stop="togglePublic(item)"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.public ? 'amber' : ''"
                        >{{ item.public ? 'public' : 'visibility_off' }}</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-content @click="editCommodity(item)">
                        <v-list-tile-title class="ma-0">{{ item.name }} </v-list-tile-title>
                        <!-- <v-list-tile-sub-title class="ma-0 menu-list-hover-text hidden-sm-and-up">{{ item.email }}</v-list-tile-sub-title> -->
                      </v-list-tile-content>

                      <v-list-tile-action  @click="$router.push({ name: 'CommodityGrades', query: { id: item.id }})"  link :key="`${index}-opengrades`">
                        <v-list-tile-title>{{ item.grades }} grades</v-list-tile-title>
                      </v-list-tile-action>

                      <v-list-tile-action class="compact-action" @click.stop>
                        <v-menu offset-y>
                          <v-btn icon small slot="activator" class="content-ma-0">
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="deleteCommodityDialogHandler(item)">
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
    <!-- Delete Commodity confirmbox -->
    <v-dialog v-model="confirmBox.deleteCommodity" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Commodity ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete the Commodity ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="resetDialog">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" :loading="deleteLoading" flat @click.stop="remove">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showMultipleDeleteConfirmDialog" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Commodities ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete these Commodities ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="showMultipleDeleteConfirmDialog = false">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="removeMultipleItems" :loading="deleteLoading">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Create Commodity Modal -->
    <v-dialog v-model="commodityDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text" v-if="!isEditformMod">New Commodity</span>
              <span class="white--text" v-else>Edit Commodity</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click="commodityDialog = false">
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
          <v-btn flat @click.native="resetCommodityForm()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="updateCommodity()"
            :disabled="$v.form.$invalid"
            :loading="saveLoading"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="createNewCommodity()"
            :disabled="$v.form.$invalid"
            :loading="saveLoading"
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
      name: { required },
    }
  },
  validationMessages: {
    form: {
      name: { required: "Name is required" },
    }
  },
  data() {
    return {
      deleteLoading: false,
      saveLoading: false,
      title: "Commodities",
      icon: "grain",
      form: {
        name: "",
        description: ""
      },
      search: null,
      drawerinternal: true,
      activeMenu: "all",
      menuItems: [
        { title: "All Commodities ", isActive: true, slug: "all" },
        { title: "Active Commodities", isActive: false, slug: "active" },
        { title: "Inactive", isActive: false, slug: "inactive" }
      ],
      commodities: [],
      confirmBox: {
        deleteCommodity: false,
        item: null
      },
      commodityDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false,
      showMultipleDeleteConfirmDialog: false,
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
      filterCommodities: "filterCommodities",
      deleteCommodity: "deleteCommodity",
      newCommodity: "newCommodity",
      _updateCommodity: "updateCommodity",
      publishCommodity: "publishCommodity",
      unpublishCommodity: "unpublishCommodity"
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
          "tablePrefix": "FT"
        });
      }
      payload = {
        ...searchObject,
        ...pageObject
      }
      switch (this.activeMenu) {
        case 'active':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "Public",
            "value": 1,
            "operator": 1,
            "tablePrefix": "FT"
          });
          break;
        case 'inactive':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "Public",
            "value": 0,
            "operator": 1,
            "tablePrefix": "FT"
          });
          break;
        default:
          break;
      }
      let res = await this.filterCommodities(payload);
      this.commodities = Object.assign([], res.data);
      this.pagination = Object.assign({}, res.pagination);
    },
    togglePublic(item) {
      if (item.public) {
        return this.unpublishCommodity(item).then(_ => {
          item.public = false;
        });
      } else {
        return this.publishCommodity(item).then(_ => {
          item.public = true;
        });
      }
    },
    selectAll() {
      let tmp = Object.assign([], this.commodities);
      if (tmp.length > 0) {
        tmp.forEach(element => {
          element['selected'] = true;
        });
        this.commodities = Object.assign([], tmp);
      }
    },
    unselectAll() {
      let tmp = Object.assign([], this.commodities);
      if (tmp.length > 0) {
        tmp.forEach(element => {
          element['selected'] = false;
        });
        this.commodities = Object.assign([], tmp);
      }
    },
    remove() {
      let index = this.commodities.indexOf(this.confirmBox.item);
      this.deleteLoading = true;
      return this.deleteCommodity(this.confirmBox.item).then(res => {
        this.commodities.splice(index, 1);
        this.resetDialog();
        this.deleteLoading = false;
      });
    },
    resetDialog() {
      this.confirmBox = {
        deleteCommodity: false,
        item: null
      };
    },
    deleteCommodityDialogHandler(item) {
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
    resetCommodityForm() {
      this.form = {
        name: "",
        description: "",
        primary: false,
        public: false,
        selected: false
      };
      this.commodityDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editCommodity(commodity) {
      this.form = commodity;
      this.isEditformMod = true;
      this.commodityDialog = true;
      this.editIndex = findIndex(
        this.commodities,
        commodity => commodity === this.form
      );
    },
    createNewCommodity() {
      this.isEditformMod = false;
      this.saveLoading = true;
      return this.newCommodity(this.form).then(res => {
        this.commodities.push(this.form);
        this.saveLoading = false;
        this.resetCommodityForm();
      });
    },
    updateCommodity() {
      const index = this.editIndex;
      this.saveLoading = true;
      return this._updateCommodity(this.form).then(res => {
        this.commodities[index] = this.form;
        this.saveLoading = false;
        this.resetCommodityForm();
      }); 
    },
    removeMultipleItems() {
      let toRemove = this.commodities.filter(item => item.selected);
      this.deleteLoading = true;
      return Promise.all(toRemove.map(item => {
        return this.deleteCommodity(item).then(res => {
          return item.id;
        })
      })).then(ids => {
        this.showMultipleDeleteConfirmDialog = false;
        this.commodities = this.unselectedCommodities;
        this.deleteLoading = false;
      });
    }
  },
  computed: {
    ...mapGetters("app", {
      getWeekData: "getWeightofWeek"
    }),
    activeCommodities() {
      return filter(this.commodities, element => element.public);
    },
    inactiveCommodities() {
      return filter(this.commodities, element => !element.public);
    },
    selectedCommodities() {
      return filter(this.commodities, element => element.selected);
    },
    unselectedCommodities() {
      return filter(this.commodities, element => !element.selected);
    },
    listCommodity() {
      let list = this.commodities;
      switch (this.activeMenu) {
        case "active":
          list = this.activeCommodities;
          break;

        case "inactive":
          list = this.inactiveCommodities;
          break;

        default:
          if (this.search) {
            // list = filter(this.commodities, (element) => element.first === this.search || element.last === this.search || element.email === this.search || element.phone === this.search)
            list = this.commodities.filter(commodity => {
              return (
                commodity.name
                  .toLowerCase()
                  .includes(this.search.toLowerCase()) 
              );
            });
          } else {
            list = this.commodities;
          }
          break;
      }
      return list;
    },
    showBulkActionOptions() {
      return this.selectedCommodities && this.selectedCommodities.length > 0;
    }
  },
  watch: {
    "form.birthdate"() {
      this.form.formatedBirthday = this.formatDate(this.form.birthdate);
    },
    commodityDialog(from, to) {
      if (to) {
        this.resetCommodityForm();
      }
    }
  },
  mounted() {
    this.goToPaging();
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
