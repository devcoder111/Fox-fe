<template>
  <div>
    <section-definition v-if="admin" :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-toolbar color="primary"
      dark
      flat
    >
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
      <v-spacer ></v-spacer>
      <v-toolbar-title class="headline font-weight-bold smallest mt-2">
        <router-link to="/grower/setting" target="_self" class="v-underline white--text">
          Farm Access
        </router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="white--text primary pt-3 pb-5">
      <div class="display-1 font-weight-bold">Smith Farming Co</div>
      <div class="title-1">
        45 Grain Road, Dalby QLD 4405
        <v-spacer></v-spacer>
        <router-link to="/signin" target="_self" class="v-underline white--text">
          Sign out
        </router-link>
      </div>
    </v-card-text>
    <v-flex xs12 sm12 height='100%'>
      <v-card 
        color="lighten-4"
        flat
      >
        <v-container grid-list-xl fluid class="pb-0">
          <v-layout wrap>
            <v-btn to="/buyers/" text flat color="grey darken2 grey--text" class="">
              <v-icon dark left class="mr-1" color="grey darken2 grey--text">people</v-icon>3 Groups
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text flat color="grey darken2 grey--text" class="">
              <v-icon dark left class="mr-1">remove_red_eye</v-icon>Visible to 42 buyers
            </v-btn>
            <v-flex xs12>
              <v-card class="mt-3 border-radius6 elevation-0 custom-elevation1">
                <v-layout>
                  <v-flex class="pt-0 pb-0">
                    <v-card-title class="display-subheading-2 pb-1">
                      Messages
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-title class="pt-3 pb-0 pl-1 pr-1">
                  <v-flex xs3 class="pl-1 pr-1 pt-1">
                    <v-card-title class="pl-0 pr-1 pt-0 pb-0">
                      <div>
                        <v-icon color="grey darken2 grey--text" dark center>arrow_drop_down</v-icon>
                        <div>Buy</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <div>
                    <span class="display-paragraph-2 font-weight-bold">$105.00</span>
                    <div class="grey--text text--darken-2">
                      <small>500mt Sorghum</small>
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn icon class="mr-0">
                    <router-link to="/flow" target="_self" class="v-underline grey--text">
                      <v-icon size="30" >keyboard_arrow_right</v-icon>
                    </router-link>
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card class="mt-3 border-radius6 elevation-0 custom-elevation1">
                <v-layout>
                  <v-flex class="pt-0 pb-0">
                    <v-card-title class="display-subheading-2 pb-2">
                      Recent Orders
                      <v-spacer></v-spacer>
                      <span class="display-paragraph-3 font-weight-bold primary--text">4 Active</span>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-title class="pt-1 pb-1 pl-0 pr-0">
                  <v-flex xs3>
                    <v-card-title class="display-paragraph-3 pt-0 pb-0 pl-0 pr-0" >
                      Sorghum
                    </v-card-title>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-btn text flat color="grey darken2 grey--text" class="primary--text">
                    3 Active <v-icon dark left class="mr-0">keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider light></v-divider>
                <v-card-title class="pt-1 pb-1 pl-0 pr-0">
                  <v-flex xs3>
                    <v-card-title class="display-paragraph-3 pt-0 pb-0 pl-0 pr-0" >
                      Wheat
                    </v-card-title>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-btn text flat color="grey darken2 grey--text" class="primary--text">
                    4 Active <v-icon dark left class="mr-0">keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions class="pt-0 pb-5">
          <v-spacer></v-spacer>
          <v-btn
            flat 
            large 
            color="md-deep-orange-500" 
            class="font-weight-bold"
            @click="cancelConfirm"
          >CANCEL ALL</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" max-width="400px" persistent>
        <v-card class="border-radius6 pl-2 pb-2 pr-2 pt-2 pl-1 pr-1">
          <div class="text-center" align="center">
            <v-card-text class="primary--text font-weight-bold display-1" large>Cancel all?</v-card-text>
          </div>
          <v-card-text class="" large>Are you sure you wish to cancel all current trades?</v-card-text>
          <v-card-actions class="mt-5">
            <v-btn flat 
              @click="clear"
            >Abort</v-btn>
            <v-spacer></v-spacer>
            <v-btn 
              color="md-deep-orange-500 border-radius6"
              @click="submit" 
              >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>   
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      admin: false,
      page: {
        title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        description: ``,
      },
      breadcrumbs: [
        {
          text: "1.3 - GROWER PROFILE",
          disabled: false
        }
      ],
      dialog: false,
      snackbar: false
    };
  },
  methods: {
    ...mapActions("trade", {
      _cancelAllTrades: "cancelAllRecentOrderTrade"
    }),
    ...mapActions("user", {
      _getProfileInfo: "getProfileInfo"
    }),
    cancelConfirm() {
      this.dialog = true;
    },
    clear() {
      this.dialog = false;
    },
    submit() {
      this.dialog = false;
      this.snackbar = true;
      console.log("canceled");
    }

  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('auth', ['user', 'profile']),

  },

  async mounted() {
    await this._getProfileInfo();
    this.currentUser = this.user;

  }
};
</script>
<style scoped>

</style>