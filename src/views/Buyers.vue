<template>
  <div id="lateral">
    <section-definition :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-toolbar flat>
              <v-btn icon>
                <v-icon color="grey darken2 grey--text ">mdi-arrow-left</v-icon>
              </v-btn>
              <h1 class="display-1 justify-center primary--text font-weight-bold" >Buyers</h1>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
              <v-tabs slot="extension" v-model="tabs" color="transparent" grow>
                <v-tab href="#one" class="font-weight-bold">Parties</v-tab>
                <v-tab href="#two" class="font-weight-bold">Groups</v-tab>
                <v-tabs-slider color="primary"></v-tabs-slider>
              </v-tabs>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
              <v-tab-item v-for="content in ['one', 'two']" :key="content" :value="content">
                <v-flex xs11 centered class="pb-0">
                  <v-card-text class="d-flex pb-0">
                    <span class="headline primary--text font-weight-bold v-text-name" >Name</span>
                    <span class="headline primary--text text-right font-weight-bold v-text-action">Action</span>
                  </v-card-text>
                </v-flex>
                <v-flex xs11 centered v-for="buyer in buyers" :key="buyer.name">
                  <v-card class="border-radius6">
                    <v-card-title class="pt-0 pb-0">
                      <v-flex xs3>
                        <v-card-title class="headline font-weight-bold">
                          {{buyer.name}}
                        </v-card-title>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <div>
                        <span class="grey--text" >{{buyer.num}} Parties</span>
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn icon class="mr-0">
                        <v-icon class="primary--text">delete</v-icon>
                      </v-btn>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-tab-item>
            </v-tabs-items>
            <v-fab-transition>
              <v-btn
                :color="activeFab.color"
                :key="activeFab.icon"
                v-model="fab"
                dark
                fab
                fixed
                bottom
                right
                @click="dialog = !dialog"
              >
                <v-icon>add</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-dialog v-model="dialog" max-width="400px" persistent>
              <v-card class="border-radius6 pl-2 pb-3 pr-2 pt-3">
                <div class="text-center" align="center">
                  <v-fab-transition>
                    <v-btn
                      color="primary"
                      dark
                      fab
                      large
                    >
                      <v-icon>group_add</v-icon>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-fab-transition>
                  <v-card-text class="primary--text font-weight-bold display-1" large>Add Group</v-card-text>
                </div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    v-model="name"
                    :rules="rules"
                    counter="25"
                    :hint="hint"
                    persistent-hint
                    label="New Group"
                    class="mb-5 pl-3 pr-3 pb-3 mt-5"
                    required
                  ></v-text-field>
                  <v-card-actions class="mt-5">
                    <v-btn flat @click="clear">CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn 
                      :disabled="!valid" 
                      color="md-deep-orange-500 border-radius6"
                      @click="submit"
                      >
                      SUBMIT
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-flex xs10 centered mt-5>
              <v-card flat>
                <v-icon class="darken2 grey--text" large>people</v-icon>
                <v-card-text class="darken2 grey--text">
                  This default 'Group' is 'Public.' Create groups above to allow targeting of buyers.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-card min-height="100px" flat>
            </v-card>
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
      hint: "",
      valid: true,
      dialog: false,
      counter: 0,
      page: {
        title: "Home Page",
        headline: "Home Page",
        description: `A blank page is good to quick-start from scratch.`
      },
      fab: false,
      hidden: false,
      name: "",
      rules: [
        v => !!v || "Group name is required",
      ],
      tabs: null,
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
      buyers: [
        {name: "Primary", num: "3"},
        {name: "Secondary", num: "3"},
        {name: "Consumers", num: "3"},
      ],
    };
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "#f44336"};
        case "two":
          return { color: "#f44336" };
        default:
          return {};
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        
        if(this.nameFilter(this.name)) {
          this.hint = "Name already exists";
          this.counter = 0;
          return;
        }

        this.buyers.push({name: this.name, num: "1"});
        this.dialog = false;
        this.$refs.form.reset();
        this.hint = "";
        this.counter = 0;
      }
    },

    clear() {
      this.$refs.form.reset();
      this.dialog = false;
      this.hint = "";
    },

    nameFilter(name) {
      
      this.buyers.map(buyer => {
        if(buyer.name == name)
          this.counter++;
      });

      if(this.counter > 0) {
        return true;
      }
      else if( this.counter <= 0) {
        return false;
      }
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
</style>
