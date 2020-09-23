<template>
  <v-app>
    <v-img
      src="@/assets/images/HexesisMaterial01.png"
      height="125"
    >
      <v-container bg fill-height fluid grid-list-md text-xs-center >
        <v-layout row wrap :align="{'start': $vuetify.breakpoint.smAndDown, 'center': $vuetify.breakpoint.mdAndUp}" justify-center >
          <v-flex xs12 sm6 md6 lg4 xl3 fill-height fluid  >
            <v-card
              elevation="10"
              class="border-radius5 card-height"
            >
              <v-toolbar flat class="white mb-3">
                <v-btn icon>
                  <router-link to="/signin" target="_self" class="v-underline md-blue-600--text">
                    <v-icon size="30" color="md-grey-300 darken2 grey--text ">mdi-arrow-left</v-icon>
                  </router-link>
                </v-btn>
                <v-toolbar-title class="headline-text justify-center primary--text font-weight-bold v-header ml-3" >Grower Registration</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-snackbar
                v-model="snackbar"
                absolute
                top
                center
                xs12 sm3
                color="success"
              >
                <span>Registration successful!</span>
                <v-icon dark>check_circle</v-icon>
              </v-snackbar>
              <small d-flex xs12 class=" text-center justify-center md-blue-600--text font-weight-bold v-header">Welcome to Strike App</small>
              <v-container
              fluid
              class="mt-0 pt-0"
              >
                <v-form id="custom-form " class="mt-3" @submit.prevent="$v.$invalid ? null : submit()" ref="form" :style="formStyles" :class="{'overflow-y-auto': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp}">
                  <v-container grid-list-xl fluid id="scroll-target" >
                    <v-layout wrap>
                      <v-flex xs12 sm12>
                        <v-text-field
                          color="purple darken-2"
                          label="Entity name"
                          v-model="form.companyBindingModel.entityName"
                          :error-messages="fieldErrors('form.companyBindingModel.entityName')"
                          @blur="$v.form.companyBindingModel.entityName.$touch()"
                          class="mt-0 pt-0"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12>
                        <v-text-field
                          color="purple darken-2"
                          label="A.B.N."
                          v-model="form.companyBindingModel.businessNumber"
                          :error-messages="fieldErrors('form.companyBindingModel.businessNumber')"
                          @blur="$v.form.companyBindingModel.businessNumber.$touch()"
                          class="mt-0 pt-0 v-header"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 class="text-xs-left text-sm-left text-md-left text-lg-left text-xl-text">
                        <v-text-field
                          color="purple darken-2"
                          label="Account Email"
                          v-model="form.email"
                          :error-messages="fieldErrors('form.email')"
                          @blur="$v.form.email.$touch()"
                          class="mt-0 pt-0 my-text-style"
                          required
                        ></v-text-field>
                        <small :class="fieldErrors('form.email')== ' ' ? 'red--text' : 'primary--text' " style="position:relative;top:-20px" >A valid email address must be provided</small>
                      </v-flex>
                      <v-flex xs12 sm12>
                        <v-text-field
                          color="purple darken-2"
                          label="Address"
                          v-model="form.companyBindingModel.address"
                          :error-messages="fieldErrors('form.companyBindingModel.address')"
                          @blur="$v.form.companyBindingModel.address.$touch()"
                          class="mt-0 pt-0"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12>
                        <v-select
                          color="pink"
                          label="Growing region"
                          v-model="form.companyBindingModel.regionId"
                          required
                          :items="regions"
                          item-value="Id"
                          item-text="Name"
                          :error-messages="fieldErrors('form.companyBindingModel.regionId')"
                          @blur="$v.form.companyBindingModel.regionId.$touch()"
                          class="mt-0 pt-0"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm12 class=" text-xs-left text-sm-left text-md-left text-lg-left text-xl-text" style="height:110px !important">
                        <small :class="fieldErrors('form.companyBindingModel.ngr') == ' ' ? 'red--text' : 'primary--text' " style="position:relative;top: -3px">National Grower Registration Number (NGR)</small>
                        <v-text-field
                          outline
                          v-model="form.companyBindingModel.ngr"
                          required
                          :error-messages="fieldErrors('form.companyBindingModel.ngr')"
                          @blur="$v.form.companyBindingModel.ngr.$touch()"
                          class="mt-0 pt-0 v-border"
                          height="40px"
                          rounded
                        >
                        </v-text-field>
                        <small class="" :class="fieldErrors('form.companyBindingModel.ngr') == ' ' ? 'red--text' : 'primary--text' " style="position:relative;top:-30px" >
                          <v-icon :class="fieldErrors('form.companyBindingModel.ngr') == ' ' ? 'red--text' : 'primary--text' " size="20">report_problem</v-icon>
                          <span class="v-ngr-position font-weight-bold">Your NGR must be provided</span>
                        </small>
                      </v-flex>
                      <v-flex xs6 sm6>
                        <v-text-field
                          color="purple darken-2"
                          label="First name"
                          v-model="form.firstName"
                          :error-messages="fieldErrors('form.firstName')"
                          @blur="$v.form.firstName.$touch()"
                          class="mt-0 pt-0"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm6>
                        <v-text-field
                          color="purple darken-2"
                          label="Last name"
                          v-model="form.lastName"
                          :error-messages="fieldErrors('form.lastName')"
                          @blur="$v.form.lastName.$touch()"
                          class="mt-0 pt-0"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 >
                        <v-text-field
                          color="purple darken-2"
                          label="Registration contact(will not be published)"
                          v-model="form.companyBindingModel.contactNumber"
                          :error-messages="fieldErrors('form.companyBindingModel.contactNumber')"
                          @blur="$v.form.companyBindingModel.contactNumber.$touch()"
                          class="mt-0 pt-0"
                          required
                        ></v-text-field>
                      </v-flex> 
                    </v-layout>
                  </v-container>
                  <v-card-actions class="justify-center" xs8>
                    <v-btn 
                      type="submit"
                      :disabled="$v.$invalid"
                      xs12 class="md-deep-orange-500 justify-center v-header v-button" large block >
                      Register
                    </v-btn>
                  </v-card-actions>   
                </v-form>
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
import { mapActions, mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  companyBindingModel: {
    entityName: "",
    businessNumber: "",
    address: "",
    regionId: "",
    contactNumber: "",
    ngr: "",
    companyType: 0,
    latitude: 0,
    longitude: 0,
    "brokerageRateOverride": 0
  },
  gRecaptchaResponse: "wegsdfgsdfwew",
  admin: false
}

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      companyBindingModel: {
        entityName: { required },
        businessNumber: { required },
        address: { required },
        regionId: { required },
        contactNumber: { required },
        ngr: { required },
      },
    }
  },
  validationMessages: {
    form: {
      firstName: { required: "First Name is required" },
      lastName: { required: "Last Name is required" },
      email: { required: " " },
      companyBindingModel: {
        entityName: { required: "Entity Name is required" },
        businessNumber: { required: "A.B.N is required" },
        address: { required: "Address is required" },
        regionId: { required: "Region is required" },
        contactNumber: { required: "Registration Contact is required" },
        ngr: { required: " " },
      },

    }
  },
  data() {
    return {
            page: {
        title: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        headline: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE",
        description: ``
      },
      breadcrumbs: [
        {
          text: "1.2 - GROWER REGISTRATION",
          disabled: false
        }
      ],

      form: Object.assign({}, defaultForm),
      regions: [],
      snackbar: false,
      width: 0,
      height: 0
    };
  },

  methods: {
    ...mapActions("region", {
      _getAllRegions: "getAllRegions",
    }),
    ...mapActions("grower", {
      _growerRegistration: "growerRegistration"
    }),
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
      this.$v.$reset();
    },
    async submit() {
      
      this.snackbar = true;

      let payload = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        companyBindingModel: {
          entityName: this.form.companyBindingModel.entityName,
          businessNumber: this.form.companyBindingModel.businessNumber,
          address: this.form.companyBindingModel.address,
          regionId: this.form.companyBindingModel.regionId,
          contactNumber: this.form.companyBindingModel.contactNumber,
          ngr: this.form.companyBindingModel.ngr,
          companyType: 0,
          latitude: 0,
          longitude: 0,
          brokerageRateOverride: 0
        },
        gRecaptchaResponse: this.form.gRecaptchaResponse
      };

      let res = await this._growerRegistration( payload );
      this.$v.$reset();
    },
    handleResize() {
      this.height = window.innerHeight;
    }
  },

  async mounted() {
    console.log(this.$vuetify.breakpoint)
    let payload = {
      hasFilter: false,
      filters: [
        {
          fieldName: "string",
          value: {},
          operator: 0,
          tablePrefix: "FT"
        }
      ]
    };

    await this._getAllRegions(payload).then(res => {
      this.regions = res.map(region => region);
    }).catch(err => {});
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    formStyles() {
      return {
        height: this.height
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Avenir');

.subtitle-2 {
   text-align: center;
}

.json-pre {
  min-height: 748px;
  max-height: 748px;
  height: 748px;
  overflow-y: auto;
}

.v-messages__wrapper .v-messages__message {
  color: yellow;
}

.v-ngr-position {
  position: relative;
  top: -2px;
}

@media only screen and (max-width: 768px) {
  .card-height {
    height: 100%;
  }
}

@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) {
    #custom-form, form {
      height: 400px;
    }
}

@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    #custom-form, form {
      height: 400px;
    }
}

@media only screen 
  and (min-device-width: 360px) 
  and (max-device-width: 640px)
  and (-webkit-min-device-pixel-ratio: 2) {
    #custom-form, form {
      height: 480px;
    }
}

@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    #custom-form, form {
      height: 510px;
    }
}

@media only screen 
  and (min-device-width: 414px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 3) { 
    #custom-form, form {
      height: 400px;
    }
}

@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 812px) 
  and (-webkit-min-device-pixel-ratio: 3) { 
    #custom-form, form {
      height: 630px;
    }
}

@media only screen 
  and (min-device-width: 414px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 3) { 
    #custom-form, form {
      height: 560px;
    }
}

</style>
