<template>
  <div>
    <section-definition :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-toolbar flat>
              <v-btn icon>
                <v-icon color="grey darken2 grey--text ">mdi-arrow-left</v-icon>
              </v-btn>
              <h1 class="headline justify-center primary--text font-weight-bold" >Wheat Market</h1>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-flex xs12 class="d-flex pb-0 pl-4 pr-4">
              <v-card-text class="display-1 primary--text font-weight-bold">
                Brisbane Ex-Farm
              </v-card-text>
              <v-spacer></v-spacer>
              <v-icon size="30" color="md-deep-orange-500">bookmark</v-icon>
            </v-flex>
            <v-flex xs12 class="d-flex pt-0 pb-0 pl-4 pr-4">
              <v-card-text class="headline font-weight-bold">
                APW Wheat CSC-11
              </v-card-text>
              <v-spacer></v-spacer>
              <v-icon size="30" color="grey--text md-deep-orange-500">help_outline</v-icon>
            </v-flex>
            <v-flex xs12 class="pl-0 pr-0 pt-0">
                <v-data-table
                  :headers="headers"
                  :items="data"
                  :expanded.sync="expanded"
                  hide-actions
                  class="elevation-1 text-center justify-center v-wheat-table"
                  item-key="id"
                >
                  <template slot="headers" slot-scope="props">
                    <tr>
                      <th
                        v-for="header in props.headers"
                        :key="header.value"
                        class=""
                      >
                        <span class="v-bid-offer">{{ header.text }}</span>
                        <v-icon class="primary--text" size="30">{{ header.icon }}</v-icon>
                      </th>
                    </tr>
                  </template>
                  <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded" class="v-cursor">
                      <td style="width: 30% !important" >
                        <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.date }}</span>
                        <v-icon size="25" v-if="props.item.icon" :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-5': $vuetify.breakpoint.mdAndUp}">{{ props.expanded? 'expand_less' : 'expand_more' }}</v-icon>
                      </td>
                      <td style="width: 20% !important" class="md-blue-600--text">
                        <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.vol1 }}</span>
                        <v-icon size="25" class="ml-1">info_outline</v-icon>
                      </td>
                      <td class="md-blue-600--text">{{ props.item.bid }}</td>
                      <td class="md-blue-600--text">{{ props.item.offer }}</td>
                      <td class=" md-blue-600--text" >{{ props.item.vol2 }}</td>
                    </tr>
                  </template>
                  <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
                    <v-data-table
                      :items="props.item.detailData"
                      :expanded.sync="expanded"
                      item-key="id"
                      hide-actions
                      hide-headers
                    >
                      <template v-slot:items="props">
                        <tr class="v-cursor" @click="props.expanded = !props.expanded">
                          <td style="width: 30% !important"></td>
                          <td style="width: 20% !important" class="md-blue-600--text">
                            <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.vol1 }}</span>
                            <v-icon size="25" class="ml-1">info_outline</v-icon>
                          </td>
                          <td class="md-blue-600--text">{{ props.item.bid }}</td>
                          <td class="md-blue-600--text">{{ props.item.offer }}</td>
                          <td class=" md-blue-600--text">{{ props.item.vol2 }}</td>
                        </tr>
                      </template>
                    </v-data-table>
                  </template>
                </v-data-table>
            </v-flex>
            <v-flex xs12 class="d-flex pt-0 pb-0 pl-4 pr-4">
              <v-card-text class="headline font-weight-bold">
                APW Wheat GRADE-XY
              </v-card-text>
            </v-flex>
            <v-flex xs12 class="pl-0 pr-0 pt-0">
                <v-data-table
                  :headers="headers"
                  :items="data"
                  :expanded.sync="expanded"
                  hide-actions
                  class="elevation-1 text-center justify-center v-wheat-table"
                  item-key="id"
                >
                  <template slot="headers" slot-scope="props">
                    <tr>
                      <th
                        v-for="header in props.headers"
                        :key="header.value"
                        class=""
                      >
                        <span class="v-bid-offer">{{ header.text }}</span>
                        <v-icon class="primary--text" size="30">{{ header.icon }}</v-icon>
                      </th>
                    </tr>
                  </template>
                  <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded" class="v-cursor">
                      <td style="width: 30% !important" >
                        <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.date }}</span>
                        <v-icon size="25" v-if="props.item.icon" :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-5': $vuetify.breakpoint.mdAndUp}">{{ props.expanded? 'expand_less' : 'expand_more' }}</v-icon>
                      </td>
                      <td style="width: 20% !important" class="md-blue-600--text">
                        <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.vol1 }}</span>
                        <v-icon size="25" class="ml-1">info_outline</v-icon>
                      </td>
                      <td class="md-blue-600--text">{{ props.item.bid }}</td>
                      <td class="md-blue-600--text">{{ props.item.offer }}</td>
                      <td class=" md-blue-600--text" >{{ props.item.vol2 }}</td>
                    </tr>
                  </template>
                  <template slot="expand" slot-scope="props" v-if="(props.item.detailData).length">
                    <v-data-table
                      :items="props.item.detailData"
                      :expanded.sync="expanded"
                      item-key="id"
                      hide-actions
                      hide-headers
                    >
                      <template v-slot:items="props">
                        <tr class="v-cursor" @click="props.expanded = !props.expanded">
                          <td style="width: 30% !important"></td>
                          <td style="width: 20% !important" class="md-blue-600--text">
                            <span :class="props.item.textColor+'--text'" class="font-weight-bold v-bid-offer">{{ props.item.vol1 }}</span>
                            <v-icon size="25" class="ml-1">info_outline</v-icon>
                          </td>
                          <td class="md-blue-600--text">{{ props.item.bid }}</td>
                          <td class="md-blue-600--text">{{ props.item.offer }}</td>
                          <td class="md-blue-600--text">{{ props.item.vol2 }}</td>
                        </tr>
                      </template>
                    </v-data-table>
                  </template>
                </v-data-table>
              </v-flex>
            <v-flex xs12>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn large class="font-weight-bold border-radius6" color="md-deep-orange-500 " >BID</v-btn>
                <v-btn large class="font-weight-bold border-radius6" color="md-deep-orange-500" >OFFER</v-btn>
              </v-card-actions>
              <a href="#" class="font-weight-bold headline md-blue-600--text d-flex justify-center mt-2 mb-2">Create new market request</a>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- Your contet -->
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expanded: false,
      page: {
        title: "Home Page",
        headline: "Home Page",
        description: `A blank page is good to quick-start from scratch.`
      },
      breadcrumbs: [
        {
          text: "Src",
          disabled: false
        },
        {
          text: "Views",
          disabled: false
        },
        {
          text: "Blank",
          disabled: false
        }
      ],
      headers: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "date"
        },
        { text: "VOL", icon: "", value: "vol1", sortable: false, align: "center"},
        { text: "BID", icon: "add_circle_outline", value: "bid", sortable: false, align: "center"},
        { text: "OFFER", icon: "add_circle_outline", value: "offer", sortable: false, align: "center" },
        { text: "VOL", icon: "", value: "vol2", sortable: false, align: "center" },
      ],
      data: [
        { 
          id:0,
          value: false,
          date: "March 2020",
          vol1: "2,000",
          bid: "$150.00",
          offer: "$100.00",
          vol2: "2,000",
          icon: true,
          detailData: [
            { 
              id:0,
              value: false,
              date: "",
              vol1: "2,000",
              bid: "$150.00",
              offer: "$100.00",
              vol2: "2,000",
              icon: false
            }
          ]
        },

        {
          id:1, 
          value: false,
          date: "March 2020",
          vol1: "2,000",
          bid: "$150.00",
          offer: "$100.00",
          vol2: "2,000",
          icon: true,
          detailData: [
            {
              id:1,
              value: false,
              date: "",
              vol1: "2,000",
              bid: "$150.00",
              offer: "$100.00",
              vol2: "2,000",
              icon: false
            }
          ]

        },

      ]

    };
  }
};
</script>

<style scoped>
.v-bid-offer {
  vertical-align: super !important;
}

.v-wheat-table tbody tr td, .v-wheat-table thead tr th {
  padding: 0 0 !important;
  text-align: center !important;
  width: initial !important;
  font-size: 12px !important;
}
</style>