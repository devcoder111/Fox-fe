<template>
  <v-app>
    <v-img
      src="@/assets/images/HexesisMaterial01.png"
      height="125"
    >
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 sm3 justify-center>
            <v-card
              elevation="10"
              align="center"
              class="mt-3
              align-center
              border-radius6"
            >
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
              <v-toolbar flat class="white">
                  <h1 class="headline-text justify-center primary--text font-weight-bold" >Reset Password</h1>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                      <router-link to="/signin" target="_self" class="v-underline md-blue-600--text">
                          <v-icon color="grey darken2 grey--text ">close</v-icon>
                      </router-link>
                  </v-btn>
              </v-toolbar>
              <v-container>
                  <v-card
                  class="pt-2"
                  flat
                  >
                      <v-img
                        src="@/assets/images/forgotpassword-vuse.svg"
                        height="100"
                        width="100"
                      ></v-img>
                      <v-card-text
                          class="d-flex justify-center headline font-weight-bold md-blue-600--text mt-2"
                      >New Password
                      </v-card-text>
                      <v-card-text
                          class="d-flex justify-center md-blue-600--text text-center v-text mt-0 pt-0"
                      >Enter your new password
                      </v-card-text>
                      <v-form ref="form" v-model="valid" class="">
                          <v-text-field
                              v-model="password"
                              :append-icon="show1 ? 'visibility_off' : 'visibility'"
                              :rules="passwordRules"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Password"
                              hint="At least 8 characters"
                              @click:append="show1 = !show1"
                              class="mt-3"
                          ></v-text-field>
                          <v-text-field
                              v-model="confirmpass"
                              :append-icon="show2 ? 'visibility_off' : 'visibility'"
                              :rules="passwordRules"
                              :type="show2 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Confirm password"
                              hint=""
                              @click:append="show2 = !show2"
                              class="mt-3"
                          ></v-text-field>

                          <v-btn
                              raised
                              block
                              large
                              class="mt-5 md-deep-orange-500 font-weight-bold"
                              :disabled="!valid"
                              @click="submit"
                          >Save Password</v-btn>
                      </v-form>
                  </v-card>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- Your contet -->
      </v-container>
    </v-img>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
        valid: "",
        page: {
            title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
            headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
            description: ``
        },
        breadcrumbs: [
            {
                text: "1.7 - NEW PASSWORD",
                disabled: false
            }
        ],
        show1: false,
        show2: false,
        password: "",
        confirmpass: "",
        warning: {
            msg: "Your password has been updated",
            color: "success",
            icon: "check_circle"
        },
        passwordRules: [
            password => !!password || "Required.",
            password => password.length >= 8 || "Min 8 characters",
            confirmation => confirmation === this.password || "The password you entered doesn't match"
        ],
        snackbar: false,
    };
  },
  methods: {
    ...mapActions("auth", {
      _resetPassword: "resetPassword"
    }),
    async submit() {
      if (this.$refs.form.validate()) {

        let payload = {};

        payload.token = "";
        payload.newPassword = this.password;

        await this._resetPassword(payload).then(res => {
          this.warning = {
            msg: "Your password has been updated",
            color: "success",
            icon: "check_circle"
          };
          
          this.snackbar = true;
        }).catch(err => {
          
          this.warning = {
            msg: err.data.errors[0].errorMessage,
            color: "error",
            icon: "error"
          }
          this.snackbar = true;
        });
        console.log("1");
      }
    }
  }
};
</script>

<style>
.v-text {
    text-align: center !important;
}
</style>