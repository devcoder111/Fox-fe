<template>
  <v-app>
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
    </v-toolbar>
    <v-card-text class="white--text primary pt-3 pb-5">
      <div class="display-paragraph-1 font-weight-bold">{{ currentUser.companyName }}</div>
      <div class="title-1">
        {{ currentUser.firstName }}
        <v-spacer></v-spacer>
        <router-link to="/signin" target="_self" class="v-underline white--text">
          Sign out
        </router-link>
      </div>
    </v-card-text>
    <v-flex xs12 sm12 class="white">
      <v-card 
      color="lighten-4"
      flat
      >
        <v-container grid-list-xl fluid class="pb-0">
          <v-layout wrap>
            <v-btn text flat color="grey darken2 grey--text" @click="$router.push({ name: 'CParties', params: {tab: 'two'}})">
              <v-icon dark left class="mr-1" color="grey darken2 grey--text" >people</v-icon>Trade Groups
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text flat color="grey darken2 grey--text" class="" @click="$router.push('/main/countparties')">
              <v-icon dark left class="mr-1">remove_red_eye</v-icon>Counter Parties
            </v-btn>
            <v-flex xs12 >
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
                    <div>
                      <v-icon color="grey darken2 grey--text" dark center>arrow_drop_down</v-icon>
                      <div>Buy</div>
                    </div>
                  </v-flex>
                  <div>
                    <span class="display-paragraph-2 font-weight-bold" >Gain Brains Pty Ltd</span>
                    <div class="grey--text text--darken-2">
                      <small>500mt Sorghum - Brisbane Ex-Farm</small>
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn icon class="mr-0">
                    <router-link to="/flow" target="_self" class="v-underline grey--text">
                      <v-icon size="30">keyboard_arrow_right</v-icon>
                    </router-link>
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs12 class="">
              <v-card class="mt-3 border-radius6 elevation-0 custom-elevation1">
                <v-layout>
                  <v-flex class="pt-0 pb-0">
                    <v-card-title class="display-subheading-2">
                      Recent trades
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-title class="pt-0 pb-0 pl-0 pr-0">
                  <v-flex xs3>
                    <v-card-title class="display-paragraph-3 pt-0 pb-0 pl-0 pr-0" >
                      Sorghum
                    </v-card-title>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-btn to="/main/recent/filter" icon class="mr-5 font-weight-bold v-underline grey--text">
                      1 x Buy, 1 x Sell<v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider light></v-divider>
              </v-card>
            </v-flex>
            <v-flex xs12 >
              <v-card class="mt-3 border-radius6 elevation-0 custom-elevation1">
                <v-layout>
                  <v-flex class="pt-0 pb-0">
                    <v-card-title class="display-subheading-2">
                      Recent Orders
                      <v-spacer></v-spacer>
                      <router-link to="/main/recent/trader" target="_self" class="font-weight-bold v-underline">
                        <span class="headline font-weight-bold primary--text">4 Active<v-icon>keyboard_arrow_right</v-icon></span>
                      </router-link>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-title class="pt-0 pb-0 pl-0 pr-0">
                  <v-flex xs3>
                    <v-card-title class="display-paragraph-3 pt-0 pb-0 pl-0 pr-0" >
                      Sorghum
                    </v-card-title>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-btn icon class="mr-4">
                    3 Active<v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider light></v-divider>
                <v-card-title class="pt-0 pb-0 pl-0 pr-0">
                  <v-flex xs3>
                    <v-card-title class="display-paragraph-3 pt-0 pb-0 pl-0 pr-0" >
                      Sorghum
                    </v-card-title>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-btn icon class="mr-4">
                    3 Active<v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat 
            large 
            color="md-deep-orange-500" 
            class="font-weight-bold"
            @click="cancelConfirm"
          > CANCEL ALL </v-btn>
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
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      admin: false,
      page: {
        title: "2 - MAIN SCREENS / PROFILE",
        headline: "2 - MAIN SCREENS / PROFILE",
        description: ``
      },
      breadcrumbs: [
        {
          text: "2.1 - TRADER MAIN SCREEN",
          disabled: false
        }
      ],
      dialog: false,
      snackbar: false,
      currentUser: []
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
    async submit() {

      let res = await this._cancelAllTrades();
      
      if(res.data) {
        this.dialog = false;
        this.snackbar = true;
      }

    }
  },
  computed: {
    ...mapGetters({
      getFooterType: "footerType",
    }),
    ...mapGetters('auth', ['user', 'profile']),
    footerType() {
      return this.getFooterType ? 0 : 1;
    },
  },

  async mounted() {
    await this._getProfileInfo();
    this.currentUser = this.user;
  }
};
</script>
<style scoped>

</style>