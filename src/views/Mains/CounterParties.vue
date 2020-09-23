<template>
  <v-app id="lateral">
    <section-definition v-if="admin" :title="page.name" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-flex xs12 sm12 v-if="searchFlag" style="margin-top: 12px;">
        <v-text-field
          v-model="searchData"
          label="Search"
          v-on:keyup="filterCounterParties"
        ></v-text-field>
      </v-flex>
      <v-btn icon to="/market/commodity" v-if="!searchFlag">
        <v-icon size="30" color="md-grey-300 darken2 grey--text " >mdi-arrow-left</v-icon>
      </v-btn>
      <h1 v-if="!searchFlag" class="display-1 justify-center primary--text font-weight-bold" >Counter parties</h1>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="md-deep-orange-500" @click="searchFunc()">{{ searchFlag ? 'close' : 'search'}}</v-icon>
      </v-btn>
      <v-tabs slot="extension" v-model="tabs" color="transparent" grow class="mt-2">
        <v-tab href="#one" class="font-weight-bold text-capitalize v-custom-tab">Parties</v-tab>
        <v-tab href="#two" class="font-weight-bold text-capitalize v-custom-tab">Groups</v-tab>
        <v-tabs-slider color="primary"></v-tabs-slider>
      </v-tabs>
      <v-snackbar
          v-model="snackbar"
          absolute
          top
          center
          :color="warning.color"
      >
          <span>{{warning.msg }}</span>
          <v-icon dark>{{ warning.icon }}</v-icon>
      </v-snackbar>

    </v-toolbar>
    <v-flex xs12 sm12 class="white pt-4">
      <v-card
        flat
      >
        <v-tabs-items v-model="tabs">
          <v-tab-item key="one" value="one" >
            <v-data-table
                :headers="headers"
                :items="data"
                :search="search"
                v-model="selected"
                select-all
                item-key="id"
                hide-actions
                class="mb-5"
            >
                <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
                        <span slot="activator">
                        {{ props.header.text }}
                        </span>
                        <span>
                        {{ props.header.text }}
                        </span>
                    </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                    <tr >
                        <td >
                            <v-checkbox
                            v-model="props.selected"
                            primary
                            hide-details
                            ></v-checkbox>
                        </td>
                        <td @click="editItem(props.item)" class="text-xs-left">{{ companies.length > 0 ? companies.filter(item => item.id == props.item.companyId || item.entityName == props.item.companyId )[0].entityName : "" }}</td>
                        <td @click="editItem(props.item)" class="text-xs-left">{{ groups.length > 0 ? groups.filter(item => item.id == props.item.counterPartyGroupId || item.name == props.item.counterPartyGroupId )[0].name : "" }}</td>
                        <td @click="editItem(props.item)" class="text-xs-center">{{ props.item.dailyVolumeLimit ? "Y" : "N" }}</td>
                        <td @click="editItem(props.item)" class="text-xs-right">{{ props.item.dailyVolumeLimit ? props.item.dailyVolumeLimit + "mt" : "n/a" }}</td>
                    </tr>
                </template>
            </v-data-table>
            <v-card-text class="grey--text text-center v-text-center">
                Your order will only be visible to the <span class="font-weight-bold ">checked counter parties</span>. Search to add parties not already in your list.
            </v-card-text>
            <v-card-text class="pt-0 pb-0 caption grey--text text-center justify-center d-flex">Note: Your identity will only be disclosed when a trade has been approved.</v-card-text>
            <v-card min-height="100px" flat>
            </v-card>
            <v-fab-transition>
              <v-btn
                :color="activeFab.color"
                :key="activeFab.icon"
                v-model="fab"
                dark
                fab
                fixed
                bottom
                right
                @click="dialog = !dialog"
                class="v-custom-zIndex-2"
              >
                <v-icon>add</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-dialog v-model="dialog" max-width="400px" persistent>
              <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
                <div class="text-center" align="center">
                  <v-card-text class="primary--text font-weight-bold display-1" large>{{ formTitle }}</v-card-text>
                </div>
                <v-form  @submit.prevent="$v.$invalid ? null : submit()" ref="editedItem" class="pl-3 pr-3">
                  <v-select
                  :items="companySelect"
                  v-model="editedItem.companyId"
                  :disabled="editedIndex == -1 ? false : true"
                  :error-messages="fieldErrors('editedItem.companyId')"
                  @blur="$v.editedItem.companyId.$touch()"
                  label="NAME"
                  required
                  ></v-select>
                  <v-select
                  :items="groupSelect"
                  v-model="editedItem.counterPartyGroupId"
                  :error-messages="fieldErrors('editedItem.counterPartyGroupId')"
                  @blur="$v.editedItem.counterPartyGroupId.$touch()"
                  label="GROUP"
                  required
                  ></v-select>
                  <v-switch
                  label="DAILY LIMIT"
                  v-model="editedItem.dailyLimit"
                  ></v-switch>
                  <v-text-field
                    v-if="editedItem.dailyLimit"
                    v-model="editedItem.dailyVolumeLimit"
                    persistent-hint
                    label="TONNAGE"
                    class="mb-3"
                    type="number"
                    required
                  ></v-text-field>

                  <v-card-actions class="mt-5">
                    <v-btn flat 
                      @click="clear"
                    >CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="submit"
                      :disabled="$v.$invalid"
                      color="md-deep-orange-500"
                      class="border-radius8"
                      >
                      SUBMIT
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-tab-item>
          <v-tab-item key="two" value="two" >
            <v-flex xs12 centered class="pb-0 pt-3">
              <v-card-text class="d-flex pb-0">
                <span class="headline primary--text font-weight-bold text-xs-left text-sm-left text-lg-left text-xl-left ml-4" >Name</span>
                <span class="headline primary--text font-weight-bold text-xs-right text-sm-right text-lg-right text-xl-right mr-4">Actions</span>
              </v-card-text>
            </v-flex>
            <v-card elevation="3" class="border-radius6 mt-2 mb-2 ml-4 mr-4 pt-1 pb-1" centered v-for="group in groups" :key="group.id">
              <v-card-title class="pt-0 pb-0 pl-0 pr-1">
                <v-flex xs6 class="pl-1">
                  <v-card-title class="display-paragraph-3 font-weight-bold pt-0 pb-0">
                    {{group.name}}
                  </v-card-title>
                </v-flex>
                <v-flex xs6 class="text-xs-right text-lg-right">
                  <span class="grey--text" >{{ group.counterParties.length }} Parties</span>
                  <v-btn icon class="mr-0">
                    <v-icon size="20" class="md-blue-500--text" @click="deleteGroup(group.id)">delete</v-icon>
                  </v-btn>
                </v-flex>
              </v-card-title>
            </v-card>
            <v-fab-transition>
              <v-btn
                :color="activeFab.color"
                :key="activeFab.icon"
                v-model="fab"
                dark
                fab
                fixed
                bottom
                right
                @click="dialogGroup = !dialogGroup"
                class="v-custom-zIndex-2"
              >
                <v-icon>add</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-dialog v-model="dialogGroup" max-width="400px" persistent>
              <v-card class="border-radius6 pl-2 pb-3 pr-2 pt-3 v-custom-shadow">
                <div class="text-center" align="center">
                  <v-fab-transition>
                    <v-btn
                      color="primary"
                      dark
                      fab
                      large
                    >
                      <v-icon>group_add</v-icon>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-fab-transition>
                  <v-card-text class="primary--text font-weight-bold display-paragraph-1" large>Add Group</v-card-text>
                </div>
                <v-form v-model="groupValid" ref="form">
                  <v-text-field
                    v-model="name"
                    :rules="rules"
                    counter="25"
                    :hint="hint"
                    persistent-hint
                    label="New Group"
                    class="mb-0 pl-3 pr-3 pb-3 mt-0"
                    required
                  ></v-text-field>
                  <v-card-actions class="mt-4">
                    <v-btn flat @click="groupClear">CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn 
                      :disabled="!groupValid" 
                      color="md-deep-orange-500"
                      class="border-radius8 display-paragraph-3"
                      @click="groupSubmit"
                      >
                      SUBMIT
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-flex xs10 centered mt-5 pt-4>
              <v-card flat>
                <v-icon class="darken2 grey--text" large size="25">people</v-icon>
                <v-card-text class="darken2 grey--text font-weight-bold">
                  <small>This default 'Group' is 'Public.' Create groups above to allow targeting of buyers.</small>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-card min-height="100px" flat>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-app>
</template>
<script>
import { defaultUserPic, users, authUser, group, countryParties } from "@/data/dummyData";

import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapActions, mapGetters } from "vuex";

const defaultForm = {
  companyId: "",
  counterPartyGroupId: "",
  dailyLimit: false,
  dailyVolumeLimit: null,

}

export default {
  mixins: [validationMixin],
  validations: {
    editedItem: {
      companyId: { required },
      counterPartyGroupId: { required },
    }
  },
  validationMessages: {
    editedItem: {
      companyId: { required: "Name is required" },
      counterPartyGroupId: { required: "Group is required" },
    }
  },
  data() {
    return {
        admin: false,
        searchflag: true,
        checkboxFlag: false,
        dialog: false,
        dialogGroup: false,
        fab: false,
        hidden: false,
        valid: false,
        groupValid: false,
        tabs: null,
        page: {
        title: "2 - MAIN SCREENS / PROFILE",
        headline: "2 - MAIN SCREENS / PROFILE",
        description: ``
        },
        breadcrumbs: [
          {
              text: "2.2 - COUNTER PARTIES",
              disabled: false
          }
        ],
        headers: [

        { text: "NAME", value: "name", sortable: false, align: "left"},
        { text: "GROUP", value: "group", sortable: false, align: "left"},
        { text: "DAILY LIMIT", value: "daily_limit", sortable: false, align: "center" },
        { text: "TONNAGE", value: "dailyVolumeLimit", sortable: false, align: "right" },
        ],
        hint: "",
        name: "",
        rules: [
          v => !!v || "Group name is required",
        ],

        tradeGroups: [],
        search: "",
        selected: [],
        editedIndex: -1,
        editedItem: Object.assign({}, defaultForm),
        tmpEditedItem: [],
        data: [],
        groups: [],
        companies: [],
        group_items: [],
        searchFlag: false,
        searchData: "",
        warning: {
            msg: "A group added!",
            color: "success",
            icon: "check_circle"
        },
        snackbar: false
    };
  },
  watch: {
    async searchData(text) {
      if(!text) {
        switch(this.tabs) {
          case "one":
            await this._getAllCounterParties(null);
            this.data = this.getCounterParties;
            break;
          case "two":
            await this._getAllGroups("");
            this.groups = this.getGroups;
            break;

        }
      }
    }
  },
  computed: {
    ...mapGetters("counterParty", ['getGroups', 'getCounterParties']),
    ...mapGetters("company", ['getAllCompanyData']),

    formTitle() {
      return this.editedIndex === -1 ? "New Party" : "Edit Item";
    },
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "#f44336"};
        case "two":
          return { color: "#f44336" };
        default:
          return {};
      }
    },
    companySelect() {
      var tmpArray = [];

      this.companies.filter(function(item) {
        tmpArray.push( item.entityName );
      });

      return tmpArray;
    },
    groupSelect() {
      var tmpArray = [];

      this.groups.filter(function(item) {
        tmpArray.push( item.name );
      });
      return tmpArray;
    }
  },
  methods: {
    ...mapActions("counterParty", {
      _getAllCounterParties: "getAllCounterParties",
      _addCounterParty: "addCounterParty",
      _updateCounterParty: "updateCounterParty",
      _getAllGroups: "getAllGroups",
      _addGroup: "addGroup",
      _delGroup: "delGroup",
    }),
    ...mapActions("company", {
        _getAllCompany: "getAllCompanies"
    }),
    clear() {
      setTimeout(() => {

        if( this.editedIndex != -1) Object.assign(this.data[this.editedIndex], this.convertIdValue(1, this.tmpEditedItem));
        this.init();
      }, 300);
    },
    init() {
      this.dialog = false;
      this.editedItem = Object.assign({}, defaultForm);
      this.$refs.editedItem.reset();
      this.$v.$reset();
      this.editedIndex = -1;

    },
    editItem(item) {
      this.tmpEditedItem = item;
      this.editedIndex = this.data.indexOf(item);
      item.dailyLimit = item.dailyVolumeLimit ? true : false;
      this.editedItem = Object.assign({}, this.convertIdValue(0, item));
      this.dialog = true;
    },
    
    async submit() {

        var payload = {};

      if (this.editedIndex > -1) {
        if( !this.editedItem.dailyLimit ) { this.editedItem.dailyVolumeLimit = null; }
        if( !this.editedItem.dailyVolumeLimit ) { this.editedItem.dailyLimit = false; }

        payload.id = this.editedItem.id;
        payload.companyId = this.companies.filter(item => item.entityName == this.editedItem.companyId )[0].id;
        payload.counterPartyGroupId = this.groups.filter(item => item.name == this.editedItem.counterPartyGroupId)[0].id;
        payload.dailyVolumeLimit = this.editedItem.dailyVolumeLimit;
        await this._updateCounterParty(payload);
        this.data = this.getCounterParties;
      } else {

        if( !this.editedItem.dailyLimit ) { this.editedItem.dailyVolumeLimit = null; }

        payload.companyId = this.companies.filter(item => item.entityName == this.editedItem.companyId )[0].id;
        payload.counterPartyGroupId = this.groups.filter(item => item.name == this.editedItem.counterPartyGroupId)[0].id;
        payload.dailyVolumeLimit = this.editedItem.dailyVolumeLimit;

        await this._addCounterParty(payload);
        this.data = this.getCounterParties;
      }


      this.init();
    },

    // Group Form submit
    async groupSubmit() {
      if (this.$refs.form.validate()) {
        if(this.nameFilter(this.name)) {
          this.hint = "Name already exists";
          return;
        }

        let payload = {};
        payload.name = this.name;

        await this._addGroup(payload)
        this.groups = this.getGroups;
        this.dialogGroup = false;
      }
      this.groupClear();
    },

    groupClear() {
      this.$refs.form.reset();
      this.dialogGroup = false;
      this.hint = "";
    },

    async deleteGroup(groupId) {

      let payload = {};
      payload.id = groupId;

      await this._delGroup(payload)
      this.groups = this.getGroups;
    },

    nameFilter(name) {
      let counter = 0;

      this.groups.map(trade => {
        if(trade.name == name)
          counter++;
      });
      if(counter > 0) {
        return true;
      }
      else if( counter <= 0) {
        return false;
      }
    },

    searchFunc() {
      this.searchFlag = !this.searchFlag;
      this.searchData = "";
    },

    // ID to Value or Value to ID
    convertIdValue(index, item) {
      var tmpData;
      var tmpCompany;

      switch(index) {
        case 0:
          tmpCompany = this.companies.filter(companyItem => companyItem.id == item.companyId )[0].entityName;
          tmpData = this.groups.filter(groupItem => groupItem.id == item.counterPartyGroupId)[0].name;
          break;
        case 1:
          tmpCompany = this.companies.filter(companyItem => companyItem.entityName == item.companyId )[0].id;
          tmpData = this.groups.filter( groupItem => groupItem.name == item.counterPartyGroupId )[0].id;
          break;
      }

      item.companyId = tmpCompany;
      item.counterPartyGroupId = tmpData;
      return item;
    },

    groupCompany() {

      let tmpGroup = countryParties.reduce((r, a) => {
        r[a.counterPartyGroupId] = [...r[a.counterPartyGroupId] || [], a];
        return r;
      }, {});

      this.tradeGroups = tmpGroup;
    },
    warningMsgFunc(index = 1, text = "" ) {
      switch(index) {
        case 1:
          this.warning = {
            msg: text,
            color: "success",
            icon: "check_circle"
          };
          this.snackbar = true;
          break;
        case 2:
          this.warning = {
            msg:  text,
            color: "error",
            icon: "error"
          };
          this.snackbar = true;
          break;
      }
    },

    async filterCounterParties(e) {
      if(e.keyCode === 13) {
       switch(this.tabs) {
         case "one":
          await this._getAllCounterParties(this.searchData);
          this.data = this.getCounterParties;
          break;
          case "two":
            await this._getAllGroups(this.searchData);
            this.groups = this.getGroups;
       }
      }
    }

  },
  async mounted() {
    this.groupCompany();
    if (this.$route.params.tab) {
      this.tabs = this.$route.params.tab;
    }
    
    await this._getAllCompany();
    await this._getAllGroups("");
    await this._getAllCounterParties(null);
    
    this.companies = this.getAllCompanyData;
    this.groups = this.getGroups;
    this.data = this.getCounterParties;
  }
};
</script>

<style scoped lang="stylus">
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-speed-dial,
#lateral .v-btn--floating {
  position: absolute;
}
#lateral .v-btn--floating {
  margin: 0 0 16px 16px;
}

.v-text-name {
  text-align: left !important;
  padding-left: 25px !important;
}

table tbody tr td, table thead tr th {
  padding: 0 2px !important;
  width: 16.5%;
}

.v-text-action {
  text-align: right !important;
}

>>>table.v-table tbody td, >>>table.v-table thead th {
  padding: 0 2px !important;
  width: 16.5%;
}

>>>table.v-table thead tr th {
  font-weight: 700 !important;
  color: #000 !important;
}

table tbody tr {
  border-bottom: 1px solid rgba(0,0,0,0.12) !important;
}


.v-sub-name {
  width: 17% !important;
}

.v-cursor {
  cursor: pointer;
}

</style>
