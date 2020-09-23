<template>
  <v-app>
    <v-img
      src="@/assets/images/HexesisMaterial01.png"
      height="125"
    >
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 sm6 md6 lg4 xl3 justify-center>
              <v-card elevation="10" align="center" class="mt-3 align-center border-radius6" >
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
                <v-container class="pl-5 pr-5">
                  <v-form ref="form" v-model="valid">
                      <v-img
                        src="@/assets/images/logo.png"
                        height="100"
                        width="100"
                        class="text-xs-center"
                      ></v-img>
                    <v-card-text :class="{'headline': $vuetify.breakpoint.smAndDown, 'display-1': $vuetify.breakpoint.mdAndUp}" class="d-flex justify-center font-weight-bold md-blue-600--text">
                      Welcome
                    </v-card-text>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :append-icon="show ? 'visibility_off' : 'visibility'"
                      :rules="[passRules.required, passRules.min]"
                      :type="show ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      @click:append="show = !show"
                      class="mt-4"
                    ></v-text-field>
                    <v-btn
                      raised
                      block
                      large
                      class="mt-4 md-deep-orange-500 font-weight-bold v-button"
                      :disabled="!valid"
                      @click="submit"
                    >SIGN IN</v-btn>
                  </v-form>
                  <v-flex xs12 class="d-flex mt-3 ml-0 pl-0 pr-0 mr-0">
                    <small class=" md-blue-600--text xs-6">
                      Don't have an account?
                    </small>
                    <small class="xs-6 md-blue-600--text">
                    <router-link to="/grower-Registration" target="_self" >
                      Apply here
                    </router-link>
                    </small>
                  </v-flex>
                  <router-link to="/reset/request" target="_self" class="mt-5 d-flex justify-center md-blue-600--text">
                    Forgot your password?
                  </router-link>
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
      show: false,
      admin: false,
      email: "admin@fox.app",
      password: "T3mp0r4ryEM@",
      passRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      page: {
        title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        description: ``
      },
      breadcrumbs: [
        {
          text: "1.1 - SIGN IN",
          disabled: false
        }
      ],
      snackbar: false,
      warning: {
          msg: "Check your inbox for the reset link and next steps",
          color: "success",
          icon: "check_circle"
      },
    };
  },
  computed: {
    ...mapGetters("auth", {

    })
  },
  mounted() {
    this.stopLoading();
  },
  methods: {
    ...mapActions("auth", {
      _signIn: "signIn"
    }),
    ...mapActions("switch", {
      stopLoading: "stopLoading"
    }),
    submit() {
      if (this.$refs.form.validate()) {
        var model = {
          userName: this.email,
          password: this.password
        };
        this._signIn(model).then(result => {
          if(result){
            this.$router.push("/main/trade")
          }
        }).catch(err => {
          this.warning = {
            msg: err.data.errors[0].errorMessage,
            color: "error",
            icon: "error"
          }
          this.snackbar = true;

        });
      }
    }
  }
};
</script>

<style scoped>

.v-ngr {
  position: relative;
  top: -25px;
}

.v-btn {
  color: white !important;
}

.subtitle-2 {
   text-align: center;
}

.json-pre {
  min-height: 748px;
  max-height: 748px;
  height: 748px;
  overflow-y: auto;
}

.v-input__append-outer {
  position: absolute !important;
  top: 50% !important;
}

.v-underline {
  text-decoration: none;
}
</style>
