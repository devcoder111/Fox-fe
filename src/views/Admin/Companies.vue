<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>domain</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          @input="searchInput"
          label="Search Companies"
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
        class="company-nav-drawer"
        floating
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Lists</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
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
                  <span>{{ item.title | first2Char }}</span>
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
      <v-layout row class="company-section">
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
              <v-btn icon @click="showMultipleRemoveConfirm = true" :disabled="!showBulkActionOptions">
                <v-icon color="error">delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="box-glow" dark small right icon @click="CompanyDialog = !CompanyDialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0 company-list-section">
              <div>
                <v-list two-line class="v-menu-trans-list-npd">
                  <template v-for="(item, index) in Companys">
                    <v-list-tile @click="editCompany(item)" :key="`${index}-listcompany`">
                      <v-list-tile-action @click.stop>
                        <v-checkbox color="sidebar" hide-details v-model="item.selected"></v-checkbox>
                      </v-list-tile-action>

                      <!--v-list-tile-avatar>
                        <img v-bind:src="item.avatar">
                      </v-list-tile-avatar-->

                      <v-list-tile-content @click="editCompany(item)">
                        <v-list-tile-title class="ma-0">{{ item.entityName }}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title class="ma-0 menu-list-hover-text hidden-sm-and-up">{{ item.email }}</v-list-tile-sub-title> -->
                      </v-list-tile-content>

                      <v-list-tile-content @click="() => {}" class="hidden-sm-and-down">
                        <v-list-tile-title>{{ item.businessNumber }}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-content @click="() => {}" class="hidden-md-and-down">
                        <v-list-tile-title>{{ item.contactNumber }}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action  @click="$router.push({ name: 'Contacts', query: { id: item.id }})"  link :key="`${index}-opencompcontacts`">
                        <v-list-tile-title>{{ item.totalContacts }} <v-icon>contacts</v-icon></v-list-tile-title>
                      </v-list-tile-action>

                      <!-- <v-list-tile-action
                        @click.stop="item.is_favourite = !item.is_favourite"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.is_favourite ? 'amber' : ''"
                        >{{ item.is_favourite ? 'star' : 'star_border' }}</v-icon>
                      </v-list-tile-action> -->
                      <v-list-tile-action class="compact-action" @click.stop>
                        <v-menu offset-y>
                          <v-btn icon small slot="activator" class="content-ma-0">
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="deleteCompanyDialogHandler(item)">
                              <v-list-tile-title>
                                <v-icon left>delete</v-icon>Archive
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
    <!-- Delete Company confirmbox -->
    <v-dialog v-model="confirmBox.deleteCompany" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Archive Company?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to archive the Company?</v-card-text>
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
    <!-- Delete Multiple Company confirmbox -->
    <v-dialog v-model="showMultipleRemoveConfirm" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Archive Company?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to archive the Seleted Companies?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="showMultipleRemoveConfirm = false">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="multipleRemove">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Create Company Modal -->
    <v-dialog v-model="CompanyDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text">New Company</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click="CompanyDialog = false">
                <v-icon color="white">close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-img height="200px" class="primary">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 text-xs-center layout align-center justify-center class="white--text">
                  <v-radio-group class="white--text" v-model="form.companyType" row>
                    <template v-slot:label>
                      <div class="white--text">Type</div>
                    </template>
                    <v-radio value="0" color="white">
                      <template v-slot:label>
                        <div><span class="white--text">Trader</span></div>
                      </template>
                    </v-radio>
                    <v-radio value="1" color="white">
                      <template v-slot:label>
                        <div><span class="white--text">Grower</span></div>
                      </template>
                    </v-radio>
                  </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field 
                  prepend-icon="domain" 
                  label="Company" 
                  v-model="form.entityName"
                  :error-messages="fieldErrors('form.entityName')"
                  @input="$v.form.entityName.$touch()"
                  @blur="$v.form.entityName.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="A.B.N."
                  prepend-icon="fax" 
                  v-model="form.businessNumber"
                  :error-messages="fieldErrors('form.businessNumber')"
                  @blur="$v.form.businessNumber.$touch()"
                  @input="$v.form.businessNumber.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  prepend-icon="home" 
                  label="Address" 
                  v-model="form.address"
                  :error-messages="fieldErrors('form.address')"
                  @input="$v.form.address.$touch()"
                  @blur="$v.form.address.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.contactNumber')"
                  @input="$v.form.contactNumber.$touch()"
                  @blur="$v.form.contactNumber.$touch()"
                  prepend-icon="phone"
                  label="Phone"
                  v-model="form.contactNumber"
                  mask="+#### #### #######"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="fax"
                  label="Brokerage Rate Override"
                  v-model="form.brokerageRateOverride"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-subheader>Primary Contact</v-subheader>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.firstName')"
                  @input="$v.form.firstName.$touch()"
                  @blur="$v.form.firstName.$touch()"
                  prepend-icon="person"
                  label="First Name"
                  v-model="form.firstName"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  prepend-icon="c" 
                  label="Last name" 
                  v-model="form.lastName"
                  :error-messages="fieldErrors('form.lastName')"
                  @input="$v.form.lastName.$touch()"
                  @blur="$v.form.lastName.$touch()"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.email')"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()"
                  prepend-icon="email"
                  v-model="form.email"
                  label="Email"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 >
                <v-card class="mx-auto">
                  <v-flex xs12>
                    <!-- <v-subheader>Grower Details</v-subheader> -->
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 ml-6>
                    <v-select
                      color="pink"
                      label="Growing region"
                      v-model="form.regionId"
                      :items="regions"
                      item-value="Id"
                      item-text="Name"
                      :error-messages="fieldErrors('form.regionId')"
                      @blur="$v.form.regionId.$touch()"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 >
                    <v-text-field
                      v-model="form.ngr"
                      label="National Grower Registration Number (NGR)"
                      hint="NGR must be entered"
                      :error-messages="fieldErrors('form.ngr')"
                      @blur="$v.form.ngr.$touch()"
                      >
                    </v-text-field>
                  </v-flex>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.native="resetCompanyForm()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="update()"
            :disabled="$v.form.$invalid"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="createNewCompany()"
            :disabled="$v.form.$invalid"
            v-else
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { filter, findIndex } from "lodash/core";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
import debounce from "debounce";

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      entityName: { required },
      businessNumber: { required },
      email: { email },
      contactNumber: {
        required,
        validNumber,
        maxLength: maxLength(15),
        minLength: minLength(7)
      },
      regionId: { required },
      ngr: { required },
      address: { required } 
    }
  },
  validationMessages: {
    form: {
      email: {
        email: "Email must be valid"
      },
      contactNumber: {
        required: "Contact Number is required",
        maxLength: "Max 14 digits",
        minLength: "Min 7 digits",
        validNumber: "Contact number must be a valid number"
      },
      firstName: { required: "First Name is required" },
      lastName: { required: "Last Name is required" },
      entityName: { required: "Entity Name is required" },
      businessNumber: { required: "A.B.N is required" },
      address: { required: "Address is required" },
      regionId: { required: "Region is required" },
      ngr: { required: "NGR is required" },
    }
  },
  data() {
    return {
      title: "Companies",
      companyName: "REMOVE",
      regions: [],
      form: {
        entityName: null,
        businessNumber: null,
        address: null,
        regionId: null,
        contactNumber: null,
        ngr: null,
        firstName: null,
        lastName: null,
        email: null,
        position: null,
        refCode: null,
        companyType: 0,
        latitude: 0,
        longitude: 0,
        brokerageRateOverride: null
      },
      
      search: null,
      drawerinternal: true,
      activeMenu: "all",
      menuItems: [
        { title: "All Companies", isActive: true, slug: "all" },
        { title: "Growers", isActive: false, slug: "buyers" },
        { title: "Traders", isActive: false, slug: "traders" },
      ],
      Companys: [],
      confirmBox: {
        deleteCompany: false,
        item: null
      },
      CompanyDialog: false,
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
      },
      showMultipleRemoveConfirm: false
    };
  },
  methods: {
    ...mapActions("company", {
      getAllCompanies: "getAllCompanies",
      updateCompany: "updateCompany",
      deleteCompany: "deleteCompany",
      addCompany: "addCompany",
    }),
    ...mapActions("region", {
      getAllRegions: "getAllRegions"
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
          "fieldName": "EntityName",
          "value": this.search,
          "operator": 3
        });
      }
      payload = {
        ...searchObject,
        ...pageObject
      }
      switch (this.activeMenu) {
        case 'buyers':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "companyType",
            "value": 1,
            "operator": 1,
            "tablePrefix": "FT"
          });
          break;
        case 'traders':
          payload['hasFilter'] = true;
          payload['filters'].push({
            "fieldName": "companyType",
            "value": 0,
            "operator": 1,
            "tablePrefix": "FT"
          });
          break;
        default:
          break;
      }
      let res = await this.getAllCompanies(payload);
      this.Companys = Object.assign([], res.data);
      for (let i = 0; i < this.Companys.length; i ++) {
        const element = this.Companys[i];
        if (element.companyType == "Trader") {
          this.Companys[i].companyType = "0";
        } else {
          this.Companys[i].companyType = "1";
        }
      }
      this.pagination = Object.assign({}, res.pagination);
    },
    selectAll() {
      let tmp = Object.assign([], this.Companys);
      if (this.Companys.length > 0) {
        tmp.forEach(element => {
          element['selected'] = true;
        });
        this.Companys = Object.assign([], tmp);
      }
    },
    unselectAll() {
      let tmp = Object.assign([], this.Companys);
      if (this.Companys.length > 0) {
        tmp.forEach(element => {
          element['selected'] = false;
        });
        this.Companys = Object.assign([], tmp);
      }
    },
    toggleFavourite(item) {
      item.is_favourite = !item.is_favourite;
    },
    multipleRemove() {
      return Promise.all(this.selectedCompanys.map(item => {
        return this.deleteCompany(item).then(res => {
          return true;
        });
      })).then( _ => {
        this.showMultipleRemoveConfirm = false;
        this.goToPaging();
      })
    },
    remove() {
      let index = this.Companys.indexOf(this.confirmBox.item);
      return this.deleteCompany(this.confirmBox.item).then(res => {
        this.Companys.splice(index, 1);
        this.goToPaging();
        this.resetDialog();
      });
    },
    resetDialog() {
      this.confirmBox = {
        deleteCompany: false,
        item: null
      };
    },
    deleteCompanyDialogHandler(item) {
      this.confirmBox = {
        deleteCompany: true,
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
    resetCompanyForm() {
      this.form = {
        entityName: null,
        businessNumber: null,
        address: null,
        regionId: null,
        contactNumber: null,
        ngr: null,
        firstName: null,
        lastName: null,
        email: null,
        position: null,
        refCode: null,
        companyType: 0,
        latitude: 0,
        longitude: 0,
        brokerageRateOverride: null
      };
      this.CompanyDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editCompany(Company) {
      this.form = Company;
      this.isEditformMod = true;
      this.CompanyDialog = true;
      this.editIndex = findIndex(
        this.Companys,
        Company => Company === this.form
      );
    },
    createNewCompany() {
      this.isEditformMod = false;
      return this.addCompany(this.form).then(res => {
        this.goToPaging();
        this.resetCompanyForm();
        return res;
      });
    },
    update() {
      const index = this.editIndex;
      return this.updateCompany(this.form).then(res => {
        this.Companys[index] = this.form;
        this.resetCompanyForm();
      });
    }
  },
  computed: {
    selectedCompanys() {
      return filter(this.Companys, element => element.selected);
    },
    unselectedCompanys() {
      return filter(this.Companys, element => !element.selected);
    },
    showBulkActionOptions() {
      return this.selectedCompanys && this.selectedCompanys.length > 0;
    }
  },
  watch: {
    CompanyDialog(from, to) {
      if (to) {
        this.resetCompanyForm();
      }
    }
  },
  async mounted() {
    this.goToPaging();
    this.regions = await this.getAllRegions();
  }
};
</script>
<style scoped lang="stylus">
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}

.company-nav-drawer
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  height: calc(100vh - 214px) !important
.company-section
  width: calc(100% - 300px)
  margin: 0 !important
  padding: 0 !important
  display: block
  float left
  .company-list-section
    height: calc(100vh - 280px)
    overflow-y: auto
@media (max-width: 959px)
  .company-nav-drawer.v-navigation-drawer--close
    width: 0px !important
    + .contact-section
      width: 100%
  .company-nav-drawer.v-navigation-drawer--open
    overflow-y: auto
    + .company-section
      width: calc(100% - 80px)
</style>
