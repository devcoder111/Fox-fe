<template>
  <div>
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white custom-margin">
      <v-btn icon to="/market/trade" class="custom-margin">
        <v-icon size="30" color="md-grey-300 darken2 grey--text " >mdi-arrow-left</v-icon>
      </v-btn>
      <h1
        :class="{'headline': $vuetify.breakpoint.smAndDown, 'display-1': $vuetify.breakpoint.mdAndUp}"
        class="justify-center primary--text font-weight-bold"
      >Commodities</h1>
      <v-spacer></v-spacer>Markets
      <v-btn icon @click="toggleFilterList">
        <v-icon color="grey darken2 grey--text">filter_list</v-icon>
      </v-btn>
    </v-toolbar>
      <v-flex xs12 sm12 v-if="showFilterList">
        <v-card flat class="d-flex pa-2 filter-list">
          <div>
            <v-select
              :items="filterItems"
              v-model="activeFilter"
              label="Filter"
            ></v-select>
          </div>
          <div>
            <v-select
              :items="sortItems"
              v-model="sortDirection"
              label="Sort"
            ></v-select>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12>
        <v-card flat>
          <v-divider></v-divider>
          <v-list>
            <template v-for="(data, index) in filteredData">
              <v-list-tile :key="data.product" avatar ripple>
                <v-list-tile-content>
                  <v-list-tile-title class="display-paragraph-3">{{ data.name }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    {{ data.noOfMarket > 0 ? data.noOfMarket : "No" }} markets
                    <!--v-icon color="darken2 black--text" small>chevron_right</v-icon-->

                    <v-btn icon class="mr-0">
                      <router-link :to="{path: '/market/delivery/' + data.name + '/' + data.id }" target="_self" class="v-underline grey--text">
                        <v-icon  color="darken2 black--text " >chevron_right</v-icon>
                      </router-link>
                    </v-btn>

                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index < filteredData.length" :key="index"></v-divider>
            </template>
          </v-list>
          <v-card min-height="100px" flat></v-card>
        </v-card>
      </v-flex>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { defaultUserPic, users, authUser, commodities } from "@/data/dummyData";

export default {
  data() {
    return {
      admin: false,
      expanded: false,
      page: {
        title: "4 - MARKET",
        headline: "4 - MARKET",
        description: ``
      },
      breadcrumbs: [
        {
          text: "4.1 - COMMODITY SELECTION",
          disabled: false
        }
      ],
      data: [],
      showFilterList: false,
      activeFilter: true,
      filterItems: [
        { text: "Active", value: true },
        { text: "Inactive", value: false }
      ],
      sortItems: [
        { text: "Active market", value: true },
        { text: "Product", value: false }
      ],
      sortDirection: true,
    };
  },
  computed: {
    ...mapGetters('commodity', ['user']),
    filteredData() {

      function compareWithActiveMarket( a ) {
        if ( a.public ){
          return 1;
        }
        if ( !a.num ){
          return -1;
        }
        return 0;
      }

      function compareWithProductName( a, b ) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if ( nameA < nameB ){
          return -1;
        }
        if ( nameA > nameB ){
          return 1;
        }

        return 0;
      }
      let tmp = this.activeFilter ? Object.assign([], this.data.active) : Object.assign([], this.data.inActive);

      this.sortDirection ? tmp.sort( compareWithActiveMarket ) : tmp.sort( compareWithProductName )
      return tmp;
    }
  },
  methods: {
    ...mapActions("commodity", {
      _getAllCommoditiesSelection: "getAllCommodities",
    }),
    toggleFilterList() {
      this.showFilterList = !this.showFilterList;
    }
  },
  async mounted() {
    let res = await this._getAllCommoditiesSelection();
    this.data = res;
  }
};
</script>

<style scoped>
.v-bid-offer {
  vertical-align: super !important;
}

.v-wheat-table tbody tr td,
.v-wheat-table thead tr th {
  padding: 0 0 !important;
  text-align: center !important;
  width: initial !important;
  font-size: 12px !important;
}

.v-list--two-line .v-list__tile {
  height: 48px !important;
}

.filter-list {
  display: flex;
  justify-content: space-between;
}

.filter-list > div{
  width: 40%;
}
</style>