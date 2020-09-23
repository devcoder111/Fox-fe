<template>
  <v-navigation-drawer
    class="pb-0 vuse-sidebar google-material"
    :class="[navDrawerAlphaMod ? 'alpha' : '', navDrawerScheme, navDrawerVariant ? 'google-material-effect' : '']"
    persistent
    fixed
    width="260"
    :mini-variant.sync="mini"
    :clipped="clipped"
    v-model="drawer"
    :left="navDrawerPosition === 'left'"
    :right="navDrawerPosition === 'right'"
    enable-resize-watcher
    floating
    id="app-drawer"
    app
  >
    <!-- Drawer Toolbar -->
    <v-toolbar flat class="text-xs-center z-index-2" height="180px">
      <v-list v-if="!mini">
        <v-list-tile backround>
          <v-list-tile-avatar>
            <img :src="logo">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="headline">Strike</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
         
          <v-list-tile-content>
            <v-list-tile-title v-text="`Admin`"></v-list-tile-title>
            <v-list-tile-sub-title class="white--text">Paul at Fox</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <router-link to="#" @click.native="signOut()" target="_self" class="v-underline white--text">
              <v-icon>exit_to_app</v-icon>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userType == 'Broker'" id="client-select">
          <v-list-tile-content>
            <v-select 
              color="success--text"
              class="white--text"
              :items="clients"
              item-text="name"
              item-value="id"
              v-model="selectedClientId">
              <template v-slot:label>
                <span class="white--text">Select a client</span>
              </template>
              <template v-slot:selection="data">
                <span class="white--text">{{data.item.name}}</span>
              </template>
              <template v-slot:item="data">
                <v-list-tile-content>
                  <v-list-tile-title v-text="data.item.company"></v-list-tile-title>
                  <v-list-tile-sub-title class="text-weight-600 black--text">{{ data.item.name }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-select>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-btn
        icon
        light
        class="hidden-md-and-down"
        @click.stop="toggleMiniVariantMode"
        top
      >
        <v-tooltip bottom v-if="mini" color="sidebar">
          <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
          <span>Expand</span>
        </v-tooltip>
        <v-tooltip bottom v-else color="sidebar">
          <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
          <span>Collapse</span>
        </v-tooltip>
      </v-btn>

    </v-toolbar>
    <!-- Drawer Items -->
    <v-list dense="dense" expand="expand" class="nav-drawer" id="app-sidebar">
      <template v-for="(item, i) in items">
        <!--group with subitems-->
        <v-list-group
          v-if="item.items"
          :group="item.group"
          no-action
          :key="`${i}-item`"
          active-class="act-menu"
        >
          <v-list-tile slot="item"
            :to="item.path == '#' ? '' : item.path"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="(subItem, i) in item.items">
            <!--sub group-->
            <v-list-group
              v-if="subItem.items"
              :group="subItem.group"
              sub-group
              :key="`${i}-subitems`"
            >
              <v-list-tile 
                slot="item" ripple
                :to="item.path == '#' ? '' : item.path"
                class="list__tile-inner-group"
              >
                <v-list-tile-action v-if="subItem.icon">
                  <v-icon>{{ subItem.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-action v-else>
                  <v-avatar size="28">
                    <span>{{ subItem.title | first2Char }}</span>
                  </v-avatar>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(grand, i) in subItem.items"
                :key="i"
                :to="genChildTarget(item, grand)"
                :href="grand.href"
                ripple
              >
                <v-list-tile-action v-if="grand.icon">
                  <v-icon>{{ grand.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-action v-else>
                  <v-avatar size="28">
                    <span>{{ grand.title | first2Char }}</span>
                  </v-avatar>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-chip
                  v-if="grand.badge"
                  color="primary"
                  disabled
                  class="white--text pa-0 chip--x-small"
                >{{ grand.badge }}</v-chip>
              </v-list-tile>
            </v-list-group>

            <!--child item-->
            <v-list-tile
              v-else
              :key="i"
              :to="item.path == '#' ? '' : item.path"
              :href="subItem.href"
              :disabled="subItem.disabled"
              :target="subItem.target"
              ripple
              
            >
              <v-list-tile-action>
                <v-icon v-if="subItem.prependIcon">{{ subItem.prependIcon }}</v-icon>
                <v-avatar size="28" v-else>
                  <span>{{ subItem.title | first2Char }}</span>
                </v-avatar>
              </v-list-tile-action>
              <v-list-tile-content class>
                <v-list-tile-title>
                  <span>{{ subItem.title }}</span>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-chip
                v-if="subItem.badge"
                color="primary"
                disabled
                class="white--text pa-0 chip--x-small"
              >{{ subItem.badge }}</v-chip>
              <v-list-tile-action v-if="subItem.action">
                <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-subheader
          v-else-if="item.header"
          class="heading-text"
          :key="`${i}-item`"
          :class="[i !== 0 ? 'mt-3' : '']"
        >{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :key="`${i}-item`"></v-divider>
        <!--top-level link-->
        <v-list-tile
          v-else
          :to="item.path == '#' ? '' : item.path"
          :href="item.href"
          ripple
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="`${i}-item`"
          class="list__tile-solo"
        >
          <v-list-tile-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-avatar size="28" v-else>
              <span>{{ item.title | first2Char }}</span>
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-chip
            v-if="item.badge"
            :color="item.color || 'primary'"
            disabled
            class="white--text pa-0 chip--x-small"
          >{{ item.badge }}</v-chip>
          <v-list-tile-action v-if="item.subAction">
            <v-icon class="success--text">{{ item.subAction }}</v-icon>
          </v-list-tile-action>
          <v-chip
            v-else-if="item.chip"
            label="label"
            small="small"
            class="caption blue lighten-2 white--text mx-0"
          >{{ item.chip }}</v-chip>
        </v-list-tile>
      </template>
    </v-list>
    <div class="sidebar-background" :style="{ 'background-image': `url(${navDrawerAlphaImg})` }"></div>
    <v-flex xs12 text-xs-center layout align-center justify-center class="white--text pl-5" >
      <v-switch v-model="showAll" color="white">
        <template v-slot:label>
          <div><span class="white--text">Show all</span></div>
        </template>
      </v-switch>
      <!-- <v-checkbox
        v-model="showAll"
        color="white"
      >
        <template v-slot:label>
          <div><span class="white--text">Show all</span></div>
        </template>
      </v-checkbox> -->
    </v-flex>
    <v-flex xs12 text-xs-center layout align-center justify-center class="white--text pl-4" v-if="!showAll">
      <v-radio-group class="white--text" v-model="footerType" row v-if="userType == 'Broker'">
        <v-radio value="1" color="white">
          <template v-slot:label>
            <div><span class="white--text">Trader</span></div>
          </template>
        </v-radio>
        <v-radio value="0" color="white">
          <template v-slot:label>
            <div><span class="white--text">Grower</span></div>
          </template>
        </v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 text-xs-center layout align-center justify-center class="white--text pl-4" v-if="!showAll">
      <v-radio-group class="white--text" v-model="userType" row>
        <v-radio value="Admin" color="white">
          <template v-slot:label>
            <div><span class="white--text">Admin</span></div>
          </template>
        </v-radio>
        <v-radio value="Broker" color="white">
          <template v-slot:label>
            <div><span class="white--text">Broker</span></div>
          </template>
        </v-radio>
      </v-radio-group>
    </v-flex>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import appDrawerItems from "@/data/app-drawer-items";
import clientList from "@/data/clients";
import { camel } from "@/utils/helpers";

export default {
  data() {
    return {
      dark: false,
      logo: "/static/strike-white-logo.svg",
      mini: false,
      userType: "Broker",
      user: {},
      selectedClientId: null,
      showAll: false
    };
  },
  mounted() {
    const ps = document.getElementById("app-drawer");
    ps.addEventListener("mouseenter", this.miniEnterVariantHandler);
    ps.addEventListener("mouseleave", this.miniLeaveVariantHandler);

    this.user = localStorage.getItem('user');
  },
  beforeDestroy() {
    const ps = document.getElementById("app-drawer");
    if (ps) {
      ps.removeEventListener("mouseenter", this.miniEnterVariantHandler);
      ps.removeEventListener("mouseleave", this.miniVariantHandler);
    }
  },
  computed: {
    ...mapGetters({
      clipped: "navClipped",
      navDrawer: "navDrawer",
      navMiniVarient: "navMiniVarient",
      navDrawerPosition: "navDrawerPosition",
      navDrawerScheme: "navDrawerScheme",
      navDrawerAlphaMod: "navDrawerAlphaMod",
      navDrawerAlphaImg: "navDrawerAlphaImg",
      navDrawerVariant: "navDrawerVariant",
      fixedFooter: "fixedFooter",
      showFooter: "showFooter",
      getFooterType: "footerType",
      miniview: "miniview"
    }),
    items() {
      return this.showAll ? appDrawerItems : appDrawerItems.filter(item => item.role == this.userType || item.role == "Common" || (this.getFooterType && item.role == "Trader" && this.userType != "Admin") || (!this.getFooterType && item.role == "Grower" && this.userType != "Admin"));
    },
    clients() {
      return clientList;
    },
    selectedClient() {
      let client = clientList.filter(item => item.id == this.selectedClientId);
      return client.length > 0 ? client[0] : null;
    },
    activemenu() {
      return this.$vuetify.theme.activemenu;
    },
    drawer: {
      get() {
        return this.navDrawer;
      },
      set(value) {
        this.$store.dispatch("toggleDrawer", value);
      }
    },
    footerType: {
      get() {
        return this.getFooterType ? "1" : "0";
      },
      set(value) {
        let type = value == 1 ? true : false;
        this.$store.dispatch("toggleFooterType", type);
        if (this.$route.name == 'Profile' && type) {
          this.$router.push({ name: 'Trade'});
        } else if (this.$route.name == 'Trade' && !type) {
          this.$router.push({ name: 'Profile'});
        }
      }
    },
  },
  methods: {
    ...mapActions("navigation", {
      toggleFooterType: "toggleFooterType"
    }),
    signOut() {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      document.location.href = "/signin";
    },
    miniEnterVariantHandler() {
      // if it's tab or small devive then it won't listen this event
      if (
        this.miniview &&
        this.navMiniVarient === true &&
        this.$vuetify.breakpoint.mdAndDown === false
      ) {
        this.$store.dispatch("toggleMiniVarient", false);
        // const container = document.querySelector('#app-sidebar')
        // container.scrollTop = 0
      }
    },
    miniLeaveVariantHandler() {
      // if it's tab or small devive then it won't listen this event
      if (
        this.miniview &&
        this.navMiniVarient === false &&
        this.$vuetify.breakpoint.mdAndDown === false
      ) {
        this.$store.dispatch("toggleMiniVarient", true);
        // const container = document.querySelector('#app-sidebar')
        // container.scrollTop = 0
      }
    },
    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (item.component) {
        return {
          name: item.component,
          params: {
            section: item.group,
            component: subItem.name
          }
        };
      }
      // console.log(`Sidebar:`)
      // console.log({ name: `${item.group}/${camel(subItem.name)}` })
      return { name: `${item.group}/${camel(subItem.name)}` };
    },
    toggleMiniVariantMode() {
      this.mini = !this.mini;
    }
  }
};
</script>
<style scoped lang="stylus">
// .no-overflow
// overflow: hidden
#app-drawer {
  img.logo {
    margin: 40px 0 15px;
  }

  .chip--x-small {
    font-size: 10px;
    height: 16px;

    .chip__content {
      line-height: 1;
      padding: 8px;
    }
  }

  .diamond-sponsor {
    // todo trim down actual image file dimensions
    height: 35px;
    margin-bottom: 0.25em;

    aside.navigation-drawer ul li {
      font-size: 14px;
      color: #373737;
    }

    &-label {
      color: #676767;
      margin: 24px 0 16px 0;
      font-size: 13px;
    }
  }
}

>>>#client-select {
  height 60px
}

.vuse-sidebar .nav-drawer {
  height calc(100% - 150px)
}
</style>
