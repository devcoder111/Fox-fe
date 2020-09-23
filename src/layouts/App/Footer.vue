<template>
  <v-footer
    fixed
    v-if="isMobile"
    height="100px"
    app
  >
    <v-layout
      row
      wrap
      style="height: 100px;"
      align-end
    >
      <v-toolbar
        color="white"
        tabs
        height="100px"
      >
        <v-tabs
          v-model="tab"
          color="white"
          height="90px"
          hide-slider
          grow
          fixed
        >

          <v-tab v-if="footerType" @click="$router.push('/main/trade')">
            <div class="footer-tab-item">
              <v-icon size="50">account_circle</v-icon>
              <span class="text-capitalize text-weight-500">Profile</span>
            </div>
          </v-tab>

          <v-tab v-else @click="$router.push('/profile')">
            <div class="footer-tab-item">
              <v-icon size="50">account_circle</v-icon>
              <span class="text-capitalize text-weight-500">Profile</span>
            </div>
          </v-tab>

          <v-tab @click="$router.push('/market/trade')">
            <div class="footer-tab-item">
              <img :src="tab == 1 ? `/static/icons/market_active.png` : `/static/icons/market.png`" width="50" />
              <span class="text-capitalize text-weight-500">Market</span>
            </div>
          </v-tab>

          <v-tab v-if="!footerType" @click="$router.push('/flow')">
            <div class="footer-tab-item">
              <v-icon size="50">layers</v-icon>
              <span class="text-capitalize text-weight-500">Flow</span>
            </div>
          </v-tab>

          <v-tab v-else @click="$router.push('/order/orderList')">
            <div class="footer-tab-item">
              <v-badge color="blue lighten-1" overlap>
                <span slot="badge">2</span>
                <v-icon size="50">insert_drive_file</v-icon>
              </v-badge>
              <span class="text-capitalize text-weight-500">Order</span>
            </div>
          </v-tab>
        </v-tabs>
      </v-toolbar>
    </v-layout>
  </v-footer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      fixedFooter: "fixedFooter",
      footer: "showFooter",
      footerType: "footerType",
      navFooterScheme: "navFooterScheme"
    })
  },
  data() {
    return {
      tab: null,
      pathItems: [
        '/main/trade',
        '/market/trade',
        '/flow'
      ],
      isMobile: false
    }
  },
  methods: {
    onResize(event) {
      this.isMobile = window.innerWidth < 600 ? true : false;
    }
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.tab = this.pathItems.indexOf(this.$route.path);
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      // in dev mode
      this.isMobile = window.innerWidth < 600 ? true : false;
    }
    window.addEventListener('resize', this.onResize)
  }
};
</script>

<style lang="stylus" scoped>
.footer-tab-item 
  display flex
  flex-direction column
  i 
    color #d9d9d9

.v-tabs__item.v-tabs__item--active .footer-tab-item
  color #263A74
  i  
    color #263A74
</style>
