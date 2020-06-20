<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="d-flex d-sm-none"
      absolute
      temporary
    >
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      color="primary"
      :elevation="3"
    >
      <v-app-bar-nav-icon
        dark
        class="d-flex d-sm-none"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>
        <nuxt-link
          class="white--text font-weight-medium text-decoration-none"
          to="/"
          >Work Tracking Dashboard</nuxt-link
        >
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!$auth.loggedId" text color="white" to="/login">
        Giriş Yap
        <v-icon style="margin-left: 10px">login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="px-lg-12" style="height: 100%; max-width: initial">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
