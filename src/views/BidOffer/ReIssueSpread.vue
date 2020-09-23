<template>
  <div id="lateral">
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
      <v-snackbar
        v-model="snackbar"
        absolute
        top
        center
        color="success"
      >
        <span>Canceled!</span>
        <v-icon dark>check_circle</v-icon>
      </v-snackbar>
      <v-btn icon>
      <v-icon size="30" color="md-grey-300 darken2 grey--text " @click="$router.go(-1)">mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 justify-center primary--text font-weight-bold"> Edit Spread</h1>
    </v-toolbar>
    <v-flex xs12 sm12 class="white">
        <v-card flat>
            <v-container fluid >
              <v-card-text class="display-header-4 ml-0 pl-0 font-weight-bold primary--text">Wheat - Brisbane Track</v-card-text>
              <v-card class="pa-4 mb-3">
                  <p class="display-header-4 ml-0 pl-0 font-weight-bold primary--text">Bid</p>
                  <v-select
                      v-model="grade1"
                      :items="gradeItems"
                      label="Grade"
                  ></v-select>
                  <v-select
                      v-model="period1"
                      :items="periodItems"
                      label="Period"
                  ></v-select>
                  <v-select
                      v-model="reminder1"
                      :items="reminderItems"
                      label="Group"
                  ></v-select>

                  <p class="display-header-4 ml-0 pl-0 font-weight-bold primary--text">Offer</p>
                  <v-container grid-list-md text-xs-center class="pl-0 pr-0">
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-select
                            v-model="commodity"
                            :items="commodityItems"
                            label="Commodity"
                        ></v-select>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                            v-model="deliveryPoint"
                            :items="deliveryPointItems"
                            label="Delivery Point"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-select
                      v-model="grade2"
                      :items="gradeItems"
                      label="Grade"
                  ></v-select>
                  <v-select
                      v-model="period2"
                      :items="periodItems"
                      label="Period"
                  ></v-select>
                  <v-select
                      v-model="reminder2"
                      :items="reminderItems"
                      label="Group"
                  ></v-select>
                  <v-text-field
                    v-model="price2"
                    label="Price $AUD"
                    hint="Business rule warning TBA"
                    class="mt-4"
                  ></v-text-field>
                  <v-text-field
                    v-model="volume"
                    label="Volume (mt)"
                    hint="Business rule warning TBA"
                  ></v-text-field>
                  <v-select
                      v-model="duration"
                      :items="durationItems"
                      label="Duration (Expiry in mins)"
                  ></v-select>
              </v-card>
              <span class="v-underline md-blue-600--text pl-3 " aria-controls @click="requestDialog = true">
                <small class="pt-3">Cancel/Delete this Order > </small>
              </span>
              <v-card-actions class="justify-center">
                <v-btn 
                    type="submit"
                    large xs12 class="mt-4 border-radius8 md-deep-orange-500 font-weight-bold"  >
                    RE-ISSUE
                </v-btn>
              </v-card-actions>
            </v-container>
            <v-dialog v-model="requestDialog" max-width="400px" persistent>
              <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
                <div class="text-center" align="center">
                  <v-card-text class="primary--text font-weight-bold display-1" large>Cancel Order</v-card-text>
                </div>
                <v-card-text class="" large>Are you sure you wish to cancel this order?</v-card-text>
                <v-card-actions class="mt-5">
                  <v-btn flat 
                    @click="clear"
                  >Abort</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn 
                    color="md-deep-orange-500 border-radius6"
                    @click="cancelSubmit" 
                    >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        </v-card>
    </v-flex>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: false,
      page: {
        title: "5 - BID/OFFER",
        headline: "5 - BID/OFFER",
        description: ``
      },
      breadcrumbs: [
        {
          text: "5.7- VIEW/EDIT/RE-ISSUE SPREAD",
          disabled: false
        }
      ],
      gradeItems: ["1", "2", "3"],
      periodItems: ["1", "2", "3"],
      groupItems: ["1", "2", "3"],
      durationItems: ["1", "2", "3"],
      reminderItems: ["Primary", "Secondary", "Consumers"],
      commodityItems: [ "Wheat" ],
      deliveryPointItems: ["Brisbane Track", "Newcastle Track", "Brisbane Delivery"],
      grade1: "",
      grade2: "",
      period1: "",
      period2: "",
      price1: "",
      price2: "",
      reminder1: "",
      reminder2: "",
      volume: "",
      duration: "",
      commodity: "",
      deliveryPoint: "",
      requestDialog: false,
      snackbar: false
    };
  },
  computed: {

  },
  methods: {
    
    clear() {
      this.requestDialog = false;
    },

    cancelSubmit() {
      this.requestDialog = false;
      this.snackbar = true;
      console.log("canceled");
    }

  }
};
</script>

<style>
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

.v-text-action {
  text-align: right !important;
}

.v-input {
  font-size: 12px !important;
}
</style>
