<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>{{icon}}</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">

          <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" class="pl-0">
            <v-icon slot="divider">chevron_right</v-icon>
          </v-breadcrumbs>
        
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          @input="searchInput"
          label="Search"
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
        class="grade-nav-drawer"
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
      <v-layout row class="grade-section">
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
              <v-btn class="box-glow" dark small right icon @click="gradeDialog = !gradeDialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0 grade-list-section">
              <div>
                <v-list two-line class="v-menu-trans-list-npd">
                  <template v-for="(item, index) in commodityGrades">
                    <v-list-tile @click="editGrade(item)" :key="`${index}-listgrade`">
                      <v-list-tile-action @click.stop>
                        <v-checkbox color="sidebar" hide-details v-model="item.selected"></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-action
                        @click.stop="togglePrimary(item)"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.primary ? 'amber' : ''"
                        >{{ item.primary ? 'label_important' : 'grain' }}</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-action
                        @click.stop="togglePublic(item)"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.public ? 'amber' : ''"
                        >{{ item.public ? 'public' : 'visibility_off' }}</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-content @click="editGrade(item)">
                        <v-list-tile-title class="ma-0">{{ item.name }}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title class="ma-0 menu-list-hover-text hidden-sm-and-up">{{ item.email }}</v-list-tile-sub-title> -->
                      </v-list-tile-content>


                      <v-list-tile-action class="compact-action" @click.stop>
                        <v-menu offset-y>
                          <v-btn icon small slot="activator" class="content-ma-0">
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="deleteGradeDialogHandler(item)">
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
    <!-- Delete Grade confirmbox -->
    <v-dialog v-model="confirmBox.deleteGrade" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Grade ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete the Grade ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="resetDialog">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="remove" :loading="deleteLoading">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showMultipleDeleteConfirmDialog" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Commodity Grade ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete these Commodity Grades ?</v-card-text>
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
    <!-- Create Grade Modal -->
    <v-dialog v-model="gradeDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text" v-if="!isEditformMod">New Grade</span>
              <span class="white--text" v-else>Edit Grade</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click="gradeDialog = false">
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
                <v-select
                  :items="commodities"
                  :error-messages="fieldErrors('form.commodityId')"
                  @input="$v.form.commodityId.$touch()"
                  @blur="$v.form.commodityId.$touch()"
                  item-value="id"
                  item-text="name"
                  v-model="form.commodityId"
                  label="Commodity"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.name')"
                  @input="$v.form.name.$touch()"
                  @blur="$v.form.name.$touch()"
                  label="Name"
                  v-model="form.name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Description" v-model="form.description"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.native="resetGradeForm()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="updateGrade()"
            :disabled="$v.form.$invalid"
            v-if="isEditformMod"
            :loading="saveLoading"
          >Edit</v-btn>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="createNewGrade()"
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
      commodityId: { required }
    }
  },
  validationMessages: {
    form: {
      name: { required: "Name is required" },
      commodityId: { required: "Commodity is required"}
    }
  },
  data() {
    return {
      saveLoading: false,
      deleteLoading: false,
      showMultipleDeleteConfirmDialog: false,
      title: "Grades",
      icon: "gradient",
      commodities: [],
      commodityGrades: [],
      form: {
        name: "",
        description: "",
        commodityId: "",
        primary: true,
        public: false
      },
      search: null,
      drawerinternal: true,
      activeMenu: "all",
      menuItems: [
        { title: "All Grades ", isActive: true, slug: "all" },
        { title: "Primary Grades", isActive: false, slug: "primary" },
        { title: "Public", isActive: false, slug: "public" }
      ],
      breadcrumbs: [
        {
          text: "all",
          disabled: false,
          href: "/admin/commodities",
        },
        {
          text: "Grades",
          disabled: true,
          href: "",
        }
      ],
      confirmBox: {
        deleteGrade: false,
        item: null
      },
      gradeDialog: false,
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
    ...mapActions("commodityGrade", {
      getAllCommodityGrades: "getAllCommodityGrades",
      addCommodityGrade: "addCommodityGrade",
      updateCommodityGrade: "updateCommodityGrade",
      publishCommodityGrade: "publishCommodityGrade",
      unpublishCommodityGrade: "unpublishCommodityGrade",
      deleteCommodityGrade: "deleteCommodityGrade",
      setPrimaryCommodityGrade: "setPrimaryCommodityGrade",
      unsetPrimaryCommodityGrade: "unsetPrimaryCommodityGrade",
      getGradesByCommodity: "getGradesByCommodity"
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
          "fieldName": "name",
          "value": this.search,
          "operator": 3
        });
      }
      payload = {
        ...searchObject,
        ...pageObject
      }
      switch (this.activeMenu) {
        case 'primary':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "Primary",
            "value": true,
            "operator": 1,
            "tablePrefix": "FT"
          });
          break;
        case 'public':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "Public",
            "value": true,
            "operator": 1,
            "tablePrefix": "FT"
          });
          break;
        default:
          break;
      }
      if (this.$route.query && this.$route.query.id) {
        payload['hasFilter'] = true;
        payload['filters'].push({
          "fieldName": "CommodityId",
          "value": this.$route.query.id,
          "operator": 1
        });
      }
      let res = await this.getAllCommodityGrades(payload);
      this.commodityGrades = Object.assign([], res.data);
      this.pagination = Object.assign({}, res.pagination);
    },
    selectAll() {
      let tmp = Object.assign([], this.commodityGrades);
      if (tmp.length > 0) {
        tmp.forEach(element => {
          element.selected = true;
        });
        this.commodityGrades = Object.assign([], tmp);
      }
    },
    unselectAll() {
      let tmp = Object.assign([], this.commodityGrades);
      if (tmp.length > 0) {
        tmp.forEach(element => {
          element.selected = false;
        });
        this.commodityGrades = Object.assign([], tmp);
      }
    },
    toggleFavourite(item) {
      item.primary = !item.primary;
    },
    remove() {
      let index = this.commodityGrades.indexOf(this.confirmBox.item);
      this.deleteLoading = true;
      return this.deleteCommodityGrade(this.confirmBox.item).then(res => {
        this.commodityGrades.splice(index, 1);
        this.deleteLoading = false;
        this.resetDialog();
      });
    },
    removeMultipleItems() {
      let toRemove = this.commodityGrades.filter(item => item.selected);
      this.deleteLoading = true;
      return Promise.all(toRemove.map(item => {
        return this.deleteCommodityGrade(item).then(res => {
          return item.id;
        })
      })).then(ids => {
        this.showMultipleDeleteConfirmDialog = false;
        this.commodityGrades = this.unselectedGrades;
        this.deleteLoading = false;
      });
    },
    resetDialog() {
      this.confirmBox = {
        deleteGrade: false,
        item: null
      };
    },
    deleteGradeDialogHandler(item) {
      this.confirmBox = {
        deleteGrade: true,
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
    resetGradeForm() {
      this.form = {
        name: "",
        description: "",
        commodityId: "",
        primary: true,
        public: false
      };
      this.gradeDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editGrade(grade) {
      this.form = grade;
      this.isEditformMod = true;
      this.gradeDialog = true;
      this.editIndex = findIndex(
        this.commodityGrades,
        grade => grade === this.form
      );
    },
    createNewGrade() {
      this.saveLoading = true;
      return this.addCommodityGrade(this.form).then(res => {
        this.commodityGrades.push(this.form);
        this.saveLoading = false;
        this.isEditformMod = false;
        this.resetGradeForm();
      });
    },
    updateGrade() {
      const index = this.editIndex;
      this.saveLoading = false;
      return this.updateCommodityGrade(this.form).then(res => {
        this.commodityGrades[index] = this.form;
        this.saveLoading = true;
        this.resetGradeForm();
      });
    },
    togglePublic(item) {
      if (item.public) {
        return this.unpublishCommodityGrade(item).then(_ => {
          item.public = false;
        });
      } else {
        return this.publishCommodityGrade(item).then(_ => {
          item.public = true;
        });
      }
    },
    togglePrimary(item) {
      if (item.primary) {
        return this.unsetPrimaryCommodityGrade(item).then(_ => {
          item.primary = false;
        });
      } else {
        return this.setPrimaryCommodityGrade(item).then(_ => {
          item.primary = true;
        });
      }
    },
  },
  computed: {
    frequentlyGradeed() {
      return filter(this.commodityGrades, element => element.public);
    },
    favouriteGrades() {
      return filter(this.commodityGrades, element => element.primary);
    },
    selectedGrades() {
      return filter(this.commodityGrades, element => element.selected);
    },
    unselectedGrades() {
      return filter(this.commodityGrades, element => !element.selected);
    },
    listGrade() {
      let list = this.commodityGrades;
      switch (this.activeMenu) {
        case "public":
          list = this.frequentlyGradeed;
          break;

        case "primary":
          list = this.favouriteGrades;
          break;

        default:
          if (this.search) {
            list = this.commodityGrades.filter(grade => {
              return (
                grade.name
                  .toLowerCase()
                  .includes(this.search.toLowerCase()) 
              );
            });
          } else {
            list = this.commodityGrades;
          }
          break;
      }
      return list;
    },
    showBulkActionOptions() {
      return this.selectedGrades && this.selectedGrades.length > 0;
    }
  },
  watch: {
    gradeDialog(from, to) {
      if (to) {
        this.resetGradeForm();
      }
    }
  },
  async mounted() {
    let payload = {
      count: 9999,
      page: 1
    };
    let res = await this.getAllCommodities(payload);
    this.commodities = [...res.active, ...res.inActive];
    if (this.$route.query && this.$route.query.id) {
      for (let i = 0; i < this.commodities.length; i ++) {
        if (this.commodities[i].id == this.$route.query.id) {
          this.breadcrumbs[0].text = this.commodities[i].name;
        }
      }
    }
    this.goToPaging();
  }
};
</script>
<style scoped lang="stylus">
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}

.grade-nav-drawer
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  height: calc(100vh - 214px) !important
.grade-section
  width: calc(100% - 300px)
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  .grade-list-section
    height: calc(100vh - 280px)
    overflow-y: auto
@media (max-width: 959px)
  .grade-nav-drawer.v-navigation-drawer--close
    width: 0px !important
    + .contact-section
      width: 100%
  .grade-nav-drawer.v-navigation-drawer--open
    overflow-y: auto
    + .grade-section
      width: calc(100% - 80px)
</style>
