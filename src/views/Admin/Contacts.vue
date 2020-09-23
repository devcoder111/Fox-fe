<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>contacts</v-icon>
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
          label="Search User"
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
        class="contact-nav-drawer"
        floating
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <!--img :src="authUser.avatar"-->
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{companyName}}</v-list-tile-title>
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
      <v-layout row class="contact-section">
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
              <v-btn class="box-glow" dark small right icon @click="contactDialog = !contactDialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0 contact-list-section">
              <div>
                <v-list two-line class="v-menu-trans-list-npd">
                  <template v-for="(item, index) in contacts">
                    <v-list-tile @click="editContact(item)" :key="`${index}-listcontact`">
                      <v-list-tile-action @click.stop>
                        <v-checkbox color="sidebar" hide-details v-model="item.selected"></v-checkbox>
                      </v-list-tile-action>
                      
                      <v-list-tile-action
                        @click.stop="item.isPrimary = !item.isPrimary"
                        class="compact-action"
                      >
                        <v-icon
                          :color="item.isPrimary ? 'amber' : ''"
                        >{{ item.isPrimary ? 'label_important' : 'grain' }}</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-content @click="editContact(item)">
                        <v-list-tile-title class="ma-0">{{ item.firstName }} {{ item.lastName }}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title class="ma-0 menu-list-hover-text hidden-sm-and-up">{{ item.email }}</v-list-tile-sub-title> -->
                      </v-list-tile-content>

                      <v-list-tile-content v-if="companyName == 'All'" @click="$router.push({ name: 'Companies' })" class="hidden-md-and-down">
                        <v-list-tile-title>{{ item.entityName }}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-content @click="() => {}" class="hidden-sm-and-down">
                        <v-list-tile-title>{{ item.email }}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-content @click="() => {}" class="hidden-md-and-down">
                        <v-list-tile-title>{{ item.phone }}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action class="compact-action" @click.stop>
                        <v-menu offset-y>
                          <v-btn icon small slot="activator" class="content-ma-0">
                            <v-icon small>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile @click="deleteContactDialogHandler(item)">
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
    <!-- Delete Contact confirmbox -->
    <v-dialog v-model="confirmBox.deleteContact" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Contact ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete the Contact ?</v-card-text>
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
    <v-dialog v-model="confirmMultipleRemove" max-width="290">
      <v-card class="confirm-box">
        <v-card-title class="pb-0">
          <span class="margin-auto">Delete Contact ?</span>
        </v-card-title>
        <v-card-text class="text-xs-center py-2">Are you sure you want to delete the selected Contacts ?</v-card-text>
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block class="ma-0 cancel" flat @click.stop="confirmMultipleRemove = false">Cancel</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block class="ma-0 action" flat @click.stop="removeMultipleItems" :loading="deleteLoading">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Create Contact Modal -->
    <v-dialog v-model="contactDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text">New Contact <br/> at {{companyName}}</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click="contactDialog = false">
                <v-icon color="white">close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-img height="200px" class="primary">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 text-xs-center layout align-center justify-center class="white--text">
                <v-avatar size="125px" class="grey">
                  <v-icon large>contacts</v-icon>
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-autocomplete
                  :disabled="mode"
                  :items="companyItems"
                  item-text="entityName"
                  item-value="id"
                  label="Company"
                  v-model="form.companyId"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.firstName')"
                  @input="$v.form.firstName.$touch()"
                  @blur="$v.form.firstName.$touch()"
                  prepend-icon="person"
                  label="First name"
                  v-model="form.firstName"
                  required
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.lastName')"
                  @input="$v.form.lastName.$touch()"
                  @blur="$v.form.lastName.$touch()"
                  prepend-icon="person"
                  label="Last name"
                  v-model="form.lastName"
                  required
                ></v-text-field>
              </v-flex> -->
              <v-flex xs12>
                <v-text-field prepend-icon="c" label="Last name" v-model="form.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="fax"
                  label="Brokerage Rate Override"
                  v-model="form.brokerageRateOverride"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="mobile"
                  label="mobile"
                  v-model="form.mobile"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="fax"
                  label="fax"
                  v-model="form.fax"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.phone')"
                  @input="$v.form.phone.$touch()"
                  @blur="$v.form.phone.$touch()"
                  prepend-icon="phone"
                  label="Phone"
                  v-model="form.phone"
                  mask="+#### #### #######"
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
              <!--v-flex xs12>
                <v-text-field prepend-icon="domain" label="Company" v-model="form.company"></v-text-field>
              </v-flex-->
              <v-flex xs12>
                <v-text-field prepend-icon="work" label="Position" v-model="form.position"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.native="resetContactForm()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="updateContact()"
            :disabled="$v.form.$invalid"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            color="md-deep-orange-500 border-radius6"
            @click.native="createNewContact()"
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
  minLength,
  email
} from "vuelidate/lib/validators";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      // lastName: { required },
      companyId: { required },
      email: { required, email },
      phone: {
        required,
        validNumber,
        maxLength: maxLength(15),
        minLength: minLength(7)
      }
    }
  },
  validationMessages: {
    form: {
      firstName: { required: "First name is required" },
      lastName: { required: "Last name is required" },
      companyId: { required: "Company is required" },
      email: {
        required: "Email is required",
        email: "Email must be valid"
      },
      phone: {
        maxLength: "Max 14 digits",
        minLength: "Min 7 digits",
        validNumber: "Phone number must be a valid number"
      }
    }
  },
  data() {
    return {
      mode: true,
      title: "Contacts",
      companyName: "",
      breadcrumbs: [
        {
          text: "",
          disabled: false,
          href: "/admin/companies",
        },
        {
          text: "Contacts",
          disabled: true,
          href: "",
        }
      ],
      form: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        mobile: null,
        fax: null,
        companyId: "",
        brokerageRateOverride: null,
        position: null,
        public: false,
        selected: false
      },
      search: null,
      drawerinternal: true,
      activeMenu: "all",
      menuItems: [
        { title: "All Contacts", isActive: true, slug: "all" },
        { title: "Primary", isActive: false, slug: "primary" },
        { title: "Secondary", isActive: false, slug: "secondary" }
      ],
      contacts: [],
      confirmBox: {
        deleteContact: false,
        item: null
      },
      contactDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false,
      companyItems: [],
      rowPerPage: 5,
      pagination: {
        count: 5,
        sinceId: 0,
        maxId: 0,
        page: 1,
        total: null
      },
      confirmMultipleRemove: false,
      deleteLoading: false
    };
  },
  methods: {
    ...mapActions("contact", {
      getAllContacts: "getAllContacts",
      searchContacts: "searchContacts",
      addContact: "addContact",
      getContactsByCompany: "getContactsByCompany",
      deleteContact: "deleteContact",
    }),
    ...mapActions("company", {
      getAllCompanies: "getAllCompanies",
      getCompanyDetail: "getCompanyDetail"
    }),
    removeMultipleItems() {
      this.deleteLoading = true;
      return Promise.all(this.selectedContacts.map(item => {
        return this.deleteContact(item).then(res => {
          return true;
        })
      })).then( _ => {
        this.contacts = this.unselectedContacts;
        this.goToPaging();
        this.deleteLoading = false;
      }).catch( error => {
        this.deleteLoading = false;
        throw error;
      })
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
      let payload = Object.assign({}, this.pagination);
      payload.count = this.rowPerPage;
      if (this.$route.query.id) {
        payload['companyId'] = this.$route.query.id;
      }
      if (this.search && this.search.length > 0) {
        payload['name'] = this.search;
      }
      if (this.activeMenu != 'all') {
        payload['isPrimary'] = this.activeMenu == 'primary' ? true : false;
      }
      let res = await this.searchContacts(payload);
      this.contacts = Object.assign([], res.data);
      this.pagination = Object.assign({}, res.pagination);
    },
    selectAll() {
      let tmp = Object.assign([], this.contacts);
      if (this.contacts.length > 0) {
        tmp.forEach(element => {
          element['selected'] = true;
        });
        this.contacts = Object.assign([], tmp);
      }
    },
    unselectAll() {
      let tmp = Object.assign([], this.contacts);
      if (this.contacts.length > 0) {
        tmp.forEach(element => {
          element['selected'] = false;
        });
        this.contacts = Object.assign([], tmp);
      }
    },
    toggleFavourite(item) {
      item.is_favourite = !item.is_favourite;
    },
    remove() {
      let index = this.contacts.indexOf(this.confirmBox.item);
      return this.deleteContact(this.confirmBox.item).then(res => {
        this.contacts.splice(index, 1);
        this.resetDialog();
      });
    },
    resetDialog() {
      this.confirmBox = {
        deleteContact: false,
        item: null
      };
    },
    deleteContactDialogHandler(item) {
      this.confirmBox = {
        deleteContact: true,
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
    resetContactForm() {
      this.form = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        mobile: null,
        fax: null,
        companyId: "",
        brokerageRateOverride: null,
        position: null,
        public: false,
        selected: false
      };
      this.contactDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editContact(contact) {
      this.form = contact;
      this.isEditformMod = true;
      this.contactDialog = true;
      this.editIndex = findIndex(
        this.contacts,
        contact => contact === this.form
      );
    },
    createNewContact() {
      this.isEditformMod = false;
      return this.addContact(this.form).then(res => {
        this.contacts.push(res);
        this.resetContactForm();
      });
    },
    updateContact() {
      const index = this.editIndex;
      this.contacts[index] = this.form;
      this.resetContactForm();
    }
  },
  computed: {
    selectedContacts() {
      return filter(this.contacts, element => element.selected);
    },
    unselectedContacts() {
      return filter(this.contacts, element => !element.selected);
    },
    showBulkActionOptions() {
      return this.selectedContacts && this.selectedContacts.length > 0;
    }
  },
  watch: {
    contactDialog(from, to) {
      if (to) {
        this.resetContactForm();
      }
    }
  },
  async mounted() {
    if (this.$route.query.id) {
      let companyDetail = await this.getCompanyDetail(this.$route.query);
      this.companyName = companyDetail.entityName;
      this.breadcrumbs[0]['text'] = this.companyName;
      this.mode = true;
      this.form.companyId = this.$route.query.id;
    } else {
      this.mode = false;
      this.companyName = 'All'
      this.breadcrumbs[0]['text'] = this.companyName;
    }
    this.goToPaging();
  }
};
</script>
<style scoped>
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}
</style>
