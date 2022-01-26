<template>
  <v-app>
    <Home />
  </v-app>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",

  components: {
    Home,
  },

  data: () => ({
    //
  }),
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title || "BMI Calculator";
      },
      immediate: true,
    },
  },
};
</script>
