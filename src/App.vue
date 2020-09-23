<template>
  <v-app :dark="colorScheme.dark" :class="colorScheme.scheme">
    <router-view name="sidebar"/>
    <v-content>
      <router-view/>
    </v-content>
    <router-view name="header"/>
    <router-view name="footer"/>
    <div v-if="isLoading" id="loading-bg">
      <v-progress-circular
        :size="70"
        :width="5"
        color="green"
        indeterminate
        id="loading"
      ></v-progress-circular>
    </div>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      subDrawer: false
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    ...mapGetters({
      colorScheme: "colorScheme"
    })
  },
  methods: {
    ...mapActions("auth", {
      getCurrent: "getCurrent",
    }),
    ...mapActions("switch", {
      stopLoading: "stopLoading",
    }),
    handleSubdrawer(value) {
      this.subDrawer = value;
    }
  },
  created () {
    this.stopLoading()
    return this.getCurrent().then(res => {
      console.log(res);
    }).catch(err => {
      this.$router.push({ name: 'SignIn' });
    });
  },
};
</script>

<style lang="stylus">
table.v-table thead th.bg-grey
  background-color #f5f5f5

.custom-elevation1 
  box-shadow 0px 5px 8px 0px rgba(0,0,0,0.1)!important

#loading-bg {
  width: 100%;
  height: 100%;
  background: #292929;
  display: block;
  position: absolute;
  z-index: 99999;
  opacity: .7;
}
  
#loading {
  position: absolute;
  left: calc(50% - 70px);
  top: calc(50% - 70px);
  width: 55px;
  height: 55px;
}
</style>