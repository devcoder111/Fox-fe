<template>
  <v-app id="lateral">
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar flat class="white">
        <v-btn icon>
        <v-icon size="30" color="md-grey-300 darken2 grey--text " @click="$router.go(-1)">mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="display-1 justify-center primary--text font-weight-bold" >New Bid</h1>
    </v-toolbar>
    <v-flex xs12 sm12 class="white">
        <v-card flat>
            <v-container fluid >
              <v-card-text class="display-header-4 ml-0 pl-0 font-weight-bold primary--text">Wheat - Brisbane Track</v-card-text>
              <v-card class="pa-4">
                  <v-select
                      v-model="grade"
                      :items="gradeItems"
                      label="Grade"
                  ></v-select>
                  <v-select
                      v-model="period"
                      :items="periodItems"
                      label="Period"
                  ></v-select>
                  <v-select
                      v-model="reminder"
                      :items="reminderItems"
                      label="Group"
                  ></v-select>
                  <v-text-field
                    v-model="price"
                    label="Price $AUD"
                    hint="Business rule warning TBA"
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
              <v-card-actions class="justify-center">
                <v-btn 
                    type="submit"
                    large xs12 class="mt-4 border-radius8 md-deep-orange-500 font-weight-bold display-header-4"  >
                    CONFIRM BID
                </v-btn>               
              </v-card-actions>
            </v-container>
        </v-card>
    </v-flex>
  </v-app>
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
          text: "5.4 - NEW BID",
          disabled: false
        }
      ],
      gradeItems: ["1", "2", "3"],
      periodItems: ["1", "2", "3"],
      groupItems: ["1", "2", "3"],
      durationItems: ["1", "2", "3"],
      reminderItems: ["Primary", "Secondary", "Consumers"],
      grade: "",
      period: "",
      reminder: "",
      price: "",
      volume: "",
      duration: ""
    };
  },
  computed: {

  },
  methods: {
    
  }
};
</script>

<style scoped>
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
</style>
