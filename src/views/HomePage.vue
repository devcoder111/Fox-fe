<template>
  <div>
    <section-definition :title="page.title" :breadcrumbs="breadcrumbs"></section-definition>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <v-flex xs12 sm8 md12>
          <section-header v-text="page.headline"></section-header>
          <div class="subheading justify" v-html="page.description"></div>
          <div class="my-5"></div>
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
      page: {
        title: "Home Page",
        headline: "Home Page",
        description: `A blank page is good to quick-start from scratch.`
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
          text: "Blank",
          disabled: false
        }
      ]
    };
  }
};
</script>
