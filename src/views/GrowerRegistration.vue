<template>
  <div>
    <section-definition :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-snackbar
              v-model="snackbar"
              absolute
              top
              center
              color="success"
            >
              <span>Registration successful!</span>
              <v-icon dark>check_circle</v-icon>
            </v-snackbar>
            <v-toolbar flat>
              <v-btn icon>
                <v-icon color="grey darken2 grey--text ">mdi-arrow-left</v-icon>
              </v-btn>
              <h1 class="headline justify-center primary--text font-weight-bold" >Grower Registration</h1>
              <v-spacer></v-spacer>
            </v-toolbar>
            <div class="subtitle-2 text-center pt-4 justify-center primary--text font-weight-bold">Registration complete you will be contacted for verification</div>

            <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      color="purple darken-2"
                      label="Entity name"
                      v-model="form.entityname"
                      :error-messages="fieldErrors('form.entityname')"
                      @blur="$v.form.entityname.$touch()"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      color="purple darken-2"
                      label="A.B.N."
                      v-model="form.abn"
                      :error-messages="fieldErrors('form.abn')"
                      @blur="$v.form.abn.$touch()"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      color="purple darken-2"
                      label="Account Email"
                      hint="A valid email address must be provided"
                      persistent-hint
                      v-model="form.email"
                      :error-messages="fieldErrors('form.email')"
                      @blur="$v.form.email.$touch()"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      color="purple darken-2"
                      label="Address"
                      v-model="form.address"
                      :error-messages="fieldErrors('form.address')"
                      @blur="$v.form.address.$touch()"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      color="pink"
                      label="Growing region"
                      v-model="form.growregion"
                      required
                      :items="regions"
                      :error-messages="fieldErrors('form.growregion')"
                      @blur="$v.form.growregion.$touch()"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                  <v-text-field
                    outline
                    v-model="form.ngr"
                    label="National Grower Registration Number (NGR)"
                    required
                    :error-messages="fieldErrors('form.ngr')"
                    @blur="$v.form.ngr.$touch()"
                  >
                  </v-text-field>
                    <v-icon class="primary--text">warning</v-icon><span class="subtitle-1 primary--text">your NGR must be provided</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      color="purple darken-2"
                      label="Registration contact(will not be published)"
                      v-model="form.contact"
                      :error-messages="fieldErrors('form.contact')"
                      @blur="$v.form.contact.$touch()"
                      required
                    ></v-text-field>
                  </v-flex> 
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-btn 
                  type="submit"
                  :disabled="$v.$invalid"
                  :large="$vuetify.breakpoint.smAndUp" xs12 class="border-radius6 md-deep-orange-500" block >
                  Registration
                </v-btn> 
              </v-card-actions>   
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- Your contet -->
    </v-container>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapGetters, mapActions } from 'vuex';

const defaultForm = {
  entityname: "",
  abn: "",
  email: "",
  address: "",
  ngr: "",
  growregion: "",
  contact: ""
}

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      entityname: { required },
      abn: { required },
      email: { required, email },
      address: { required },
      growregion: { required },
      ngr: { required },
      contact: { required }
    }
  },
  validationMessages: {
    form: {
      entityname: { required: "Entity Name is required" },
      abn: { required: "A.B.N is required " },
      email: { required: "Account Email is required", email: "Email must be valid" },
      address: { required: "Address is required"},
      region: { required: "Growing region is required" },
      contact: { required: "Registration contact is required" }
    }
  },
  data() {
    return {
      page: {
        title: "Grower Registration",
        headline: "Grower Registration",
        description: ``
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
          text: "grower",
          disabled: false
        }
      ],
      form: Object.assign({}, defaultForm),
      regions: ["grow region1", "grow region2", "grow region3", "grow region4"],
      snackbar: false
    };
  },

  methods: {
    ...mapActions("auth", {
      _register: "register"
    }),
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
      this.$v.$reset();
    },
    submit() {
       if (this.$refs.form.validate()) {
        this.snackbar = true;
        var model = this.defaultForm;
        this._register(model).then(result => {
          this.snackbar = false;
          if(result.successful) {
            this.resetForm();
            this.$v.$reset();
          }
          else {
            
          }
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
</style>
