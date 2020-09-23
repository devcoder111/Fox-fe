<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
      <v-toolbar flat class="transparent section-definition-toolbar mb-3">
        <v-avatar class="box-glow" tile>
          <v-icon dark>headset_mic</v-icon>
        </v-avatar>
        <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          solo
          append-icon="search"
          class="max-width-300x"
        ></v-text-field>
      </v-toolbar>

      <v-dialog v-model="dialog" max-width="500px">
        <!--v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn-->
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span class="headline">{{ formTitle }}</span>
            <v-icon flat right class="close-icon" @click="close" >close</v-icon>
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
            <v-btn flat @click.native="ignoreItem">Ignore</v-btn>
            <v-btn color="md-deep-orange-500 border-radius6" @click.native="save">Complete</v-btn>
            
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-flex xs12>
        <v-card>
          <v-data-table :headers="headers" :items="listSearch" hide-actions :pagination.sync="pagination">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" v-bind:class="{ rejected: props.item.closed }">{{ props.item.request }}</td>
              <td class="text-xs-left" v-bind:class="{ rejected: props.item.closed }">{{ props.item.supportType }}</td>
              <td class="text-xs-left" v-bind:class="{ rejected: props.item.closed }">{{ props.item.internalNote }}</td>
              <td class="text-xs-left" v-bind:class="{ rejected: props.item.closed }">{{ props.item.requested | dateFormat }}</td>
              <td class="text-xs-left" v-bind:class="{ rejected: props.item.closed }">
                <span>
                  <v-checkbox
                    disabled
                    :false-value="false"
                    :true-value="true"
                    v-model="props.item.closed"
                    style="vertical-align:bottom;margin-bottom: -20px;"
                  ></v-checkbox>
                </span>
              </td>
              <td class="text-xs-left">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
          <v-checkbox v-model="showClosedItems" class="right" :label="`Include completed and rejected requests`"></v-checkbox>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    title: "Support Queue",
    breadcrumbs: [
      {
        text: "Support Queue",
        disabled: false
      }
    ],
    headers: [
      { text: "Request", value: "request", class: "bg-grey" },
      { text: "Type", value: "supportType", class: "bg-grey" },
      { text: "Internal Note", value: "internalNote", class: "bg-grey" },
      { text: "Requested", value: "requested", class: "bg-grey" },
      { text: "Closed", value: "actioned", class: "bg-grey" },
      {
        text: "Actions",
        value: "name",
        sortable: false,
        align: "left",
        class: "action bg-grey"
      }
    ],
    pagination: {
      sortBy: "requested",
      rowsPerPage: -1,
      descending: true,
    },
    search: null,
    editedIndex: -1,
    editedItem: {
      name: "",
      email: 0,
      contact: 0,
      type: 0,
      requested: 0
    },
    defaultItem: {
      name: "",
      email: 0,
      contact: 0,
      type: 0,
      requested: 0
    },
    action: {
      actionType: null,
      id: null,
      internalNote: null
    },
    showClosedItems: false,
    supportQueue: [],
    confirmDialog: false,
    confirmDialogTitle: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Process Request";
    },
    listSearch() {
      let list = this.supportQueue;
      if (this.search) {
        list = this.supportQueue.filter(item => {
          return (
            (item.request.toLowerCase().includes(this.search.toLowerCase()) ||
              item.supportType.toLowerCase().includes(this.search.toLowerCase()) ||
              item.internalNote.toLowerCase().includes(this.search.toLowerCase())) &&
            (this.showClosedItems ||
              (!this.showClosedItems &&
                (item.actioned == null && item.rejected == null)))
          );
        });
      } else {
        list = list = this.supportQueue.filter(
          item =>
            this.showClosedItems ||
            (!this.showClosedItems &&
              (item.actioned == null && item.rejected == null))
        );
      }
      list = list.map(item => {
        item['closed'] = item.actioned || item.rejected ? true : false;
        return item;
      })
      return list;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions("supportRequest", {
      getSupportRequestList: "getSupportRequestList",
      addSupportRequest: "addSupportRequest",
      deleteSupportRequest: "deleteSupportRequest",
      markAsReadSupportRequest: "markAsReadSupportRequest",
      markAsActionedSupportRequest: "markAsActionedSupportRequest",
      markAsRejectedSupportRequest: "markAsRejectedSupportRequest"
    }),

    async initialize() {
      this.supportQueue = await this.getSupportRequestList();
    },

    ignoreItem() {
      this.markAsRejectedSupportRequest(this.editedItem).then(res => {
        this.supportQueue[this.editedIndex] = Object.assign({}, res);
        this.close();
      });
    },

    editItem(item) {
      this.editedIndex = this.supportQueue.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.remove(item);
    },

    remove(item) {
      return this.deleteSupportRequest(item).then(res => {
        const index = this.supportQueue.indexOf(item);
        this.supportQueue.splice(index, 1);
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
      this.markAsActionedSupportRequest(this.editedItem).then(res => {
        this.supportQueue[this.editedIndex] = Object.assign({}, res);
        this.close();
      });
    },

    reject() {
      this.supportQueue[this.editedIndex].actioned = false;
      this.close();
    }
  }
};
</script>
<style scoped lang="stylus">
>>>table.v-table thead th {
  vertical-align: middle;
}

>>>table.v-table tbody td {
  vertical-align: middle;
}

>>>table.v-table thead th.action {
  min-width: 100px !important;
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

.close-icon {
  max-width: 30px;
}
</style>
