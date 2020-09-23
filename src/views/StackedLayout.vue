<template>
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12 sm12 md4>
            <CommoditySelection />
        </v-flex>
        <v-flex xs12 sm12 md4 class="custom-margin">
            <DeliveryPointSelection />
        </v-flex>
        <v-flex xs12 sm12 md4 class="custom-margin">
            <MarketTradeScreen />
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import CommoditySelection from "@/views/Market/CommoditySelection";
import DeliveryPointSelection from "@/views/Market/DeliveryPointSelection";
import MarketTradeScreen from "@/views/Market/MarketTradeScreen";

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
        title: "Home Page",
        headline: "Home Page",
        description: `A blank page is good to quick-start from scratch.`
      },
      breadcrumbs: [
        {
          text: "1.1 - SIGN IN",
          disabled: false
        }
      ],
    };
  },
  components: {
      CommoditySelection,
      DeliveryPointSelection,
      MarketTradeScreen
  },
  computed: {

  },
  methods: {

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

.custom-margin {
}

.v-input__append-outer {
  position: absolute !important;
  top: 50% !important;
}

.custom-margin .v-toolbar__content {
    padding: 0px 0px !immportant;
}

.v-underline {
  text-decoration: none;
}

.container {
    padding: 0px 0px !important;
}

#app {
    text-align: center;
    margin: 65px auto;
}
.content {
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 9px;
}

.e-splitter {
    margin: 0 auto;
}

.v-toolbar__content .v-toolbar__extension {
    padding-left: 0px !important;
}

.custom-margin {
    margin-left: -24px !important;
}

.e-pane {
  text-align: center;
  align-items: center;
  display: grid;
}
</style>
