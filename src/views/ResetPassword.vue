<template>
  <v-app>
    <v-img
      src="@/assets/images/HexesisMaterial01.png"
      height="125"
    >
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 sm6 md6 lg4 xl3 justify-center>
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
                  <span>{{warning.msg}}</span>
                  <v-icon dark>{{warning.icon}}</v-icon>
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
                      >Request reset
                      </v-card-text>
                      <v-card-text
                          class="d-flex justify-center md-blue-600--text text-center v-text mt-0 pt-0"
                      >Enter your email address to receive a link to reset your password.
                      </v-card-text>
                      <v-form ref="form" v-model="valid" class="">
                          <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="Email"
                              required
                              v-on:keydown.enter.prevent='submit'
                          ></v-text-field>
                          <v-btn
                              raised
                              block
                              large
                              class="mt-5 pl-2 pr-2 md-deep-orange-500 font-weight-bold"
                              :disabled="!valid"
                              type="button"
                              @click="submit"
                          >Reset Password</v-btn>
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
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
        valid: false,
        page: {
            title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
            headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
            description: ``
        },
        breadcrumbs: [
            {
                text: "1.6 - RESET PASSWORD",
                disabled: false
            }
        ],
        email: "",
        emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        snackbar: false,
        warning: {
            msg: "Check your inbox for the reset link and next steps",
            color: "success",
            icon: "check_circle"
        },
    };
  },
  methods: {
    ...mapActions("auth", {
      _forgotPassword: "forgotPassword"
    }),
    async submit() {
      if (this.$refs.form.validate()) {
        let payload = {};
        payload.email = this.email;

        await this._forgotPassword(payload).then(res => {
          this.warning = {
            msg: "Check your inbox for the reset link and next steps",
            color: "success",
            icon: "check_circle"
          };
          this.snackbar = true;

        }).catch(err => {
          
          this.warning = {
            msg: err.data.errors[0].errorMessage,
            color: "error",
            icon: "error"
          };
          this.snackbar = true;

        });
      }
    }
  }
};
</script>
