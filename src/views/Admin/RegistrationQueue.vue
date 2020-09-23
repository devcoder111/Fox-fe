<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>assignment_returned</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
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

      <v-dialog v-model="dialog" max-width="500px">
        <!--v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn-->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12>
                  <v-text-field v-model="editedItem.internalNote" label="Internal Note"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="close">Close</v-btn>
            <v-btn color="md-deep-orange-500 border-radius6" :disabled="editedItem.actioned" @click.native="save">Approve</v-btn>
            <v-btn color="md-deep-orange-500 border-radius6" :disabled="editedItem.rejected" @click.native="reject">Reject</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-flex xs12>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="requests"
        hide-actions
        class="elevation-1"
        :pagination.sync="tablePagination"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }"><strong> {{ props.item.userRequestInfoModel.companyName }}</strong></td>
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }">{{ props.item.userRequestInfoModel.email }}</td>
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }">{{ props.item.contactnumber }}</td>
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }">{{ props.item.ngr }}</td>
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }">{{ props.item.createdDate | dateFormat }}</td>
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }"><span><v-checkbox disabled v-model="props.item.actioned" style="vertical-align:bottom;margin-bottom: -20px;"></v-checkbox></span></td>
          <td class="text-xs-left" v-bind:class="{ rejected: props.item.rejected }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="goToPaging">Reset</v-btn>
        </template>
      </v-data-table>
      <v-checkbox
        v-model="showRejectedItems"
        class="right"
        :label="`Include rejected requests`"
        @change="showRejectedItemsChanged"
      ></v-checkbox>
      <div class="text-xs-center pt-2" v-if="pagination.total">
        <v-pagination v-model="pagination.page" :length="Math.ceil(pagination.total / rowPerPage)" @input="goToPaging"></v-pagination>
      </div>
    </v-card>
    </v-flex>
    </v-container>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";

export default {
  data: () => ({
    dialog: false,
    title: "Registration Queue",
    headers: [
      {
        text: "Company Name",
        align: "left",
        sortable: false,
        value: "name",
        class: "bg-grey"
      },
      { text: "Email", value: "email", class: "bg-grey" },
      { text: "Contact", value: "contactnumber", class: "bg-grey" },
      { text: "N.G.R.", value: "ngr", class: "bg-grey" },
      { text: "Requested", value: "createdDate", class: "bg-grey" },
      { text: "Approved", value: "approved", class: "bg-grey" },
      { text: "Actions", value: "name", sortable: false, class: 'action bg-grey' }
    ],
    tablePagination: {
      sortBy: "createdDate",
      rowsPerPage: -1,
      descending: true,
    },
    requests: [],
    search: null,
    editedIndex: -1,
    editedItem: {
      name: "",
      email: 0,
      contact: 0,
      ngr: 0,
      requested: 0
    },
    defaultItem: {
      name: "",
      email: 0,
      contact: 0,
      ngr: 0,
      requested: 0
    },
    showRejectedItems: false,
    rowPerPage: 5,
    pagination: {
      count: 5,
      sinceId: 0,
      maxId: 0,
      page: 1,
      total: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.goToPaging();
  },

  methods: {
    ...mapActions("supportRequest", {
      getGrowerSupportRequest: "getGrowerSupportRequest",
      addSupportRequest: "addSupportRequest",
      deleteSupportRequest: "deleteSupportRequest",
      markAsReadSupportRequest: "markAsReadSupportRequest",
      markAsActionedSupportRequest: "markAsActionedSupportRequest",
      markAsRejectedSupportRequest: "markAsRejectedSupportRequest"
    }),

    searchInput: debounce(function(e) {
      this.search = e;
      this.pagination.page = 1;
      this.goToPaging();
    }, 500),

    showRejectedItemsChanged(e) {
      this.pagination.page = 1;
      this.goToPaging();
    },

    async goToPaging() {
      let pageObject = Object.assign({}, this.pagination);
      pageObject.count = this.rowPerPage;
      var payload = {
        ...pageObject
      }
      if (this.search && this.search.length > 0) {
        payload['keyword'] = this.search;
      }
      payload['isIncludeRejected'] = this.showRejectedItems ? true : false;
      
      let res = await this.getGrowerSupportRequest(payload);
      this.requests = Object.assign([], res.data);
      this.pagination = Object.assign({}, res.pagination);
    },

    editItem(item) {
      this.editedIndex = this.requests.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.requests.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.remove(item);
    },

    remove(item) {
      return this.deleteSupportRequest(item).then(res => {
        const index = this.requests.indexOf(item);
        this.requests.splice(index, 1);
      });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      // if (this.editedIndex > -1) {
      //   this.requests[this.editedIndex] = Object.assign(this.requests[this.editedIndex], this.editedItem);
      //   this.requests[this.editedIndex].approved = true;
      // } else {
      //   this.requests.push(this.editedItem);
      // }
      return this.markAsActionedSupportRequest(this.editedItem).then(res => {
        this.requests[this.editedIndex].actioned = true;
        this.close();
      });
    },

    reject() {
      return this.markAsRejectedSupportRequest(this.editedItem).then(res => {
        this.requests[this.editedIndex].rejected = true;
        this.close();
      });
    }
  }
};
</script>
<style scoped lang="stylus">
>>>table.v-table thead th {
  vertical-align middle
}
>>>table.v-table tbody td {
  vertical-align middle
}
>>>table.v-table tbody td.rejected {
  position: relative;
}
>>>table.v-table tbody td.rejected:after {
  text-decoration: line-through;
  position: absolute;
  left: 0;
  top: 50%;
  height: 1px;
  background: black;
  content: '';
  width: 100%;
  display: block;
}
>>>table.v-table thead th.action {
  min-width: 100px!important;
}
</style>