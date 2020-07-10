<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="d-flex d-sm-none"
      absolute
      temporary
      style="position: fixed; top: 0;"
    >
      <v-list light>
        <v-subheader>SEÇENEKLER</v-subheader>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :class="item.name === 'add_work' ? `${item.color}` : ''"
          link
          @click.stop="openModal(item.name, item.title)"
        >
          <v-list-item-icon>
            <v-icon
              :class="
                item.name === 'add_work' ? `white--text` : `${item.color}--text`
              "
            >
              {{ item.icon }}</v-icon
            >
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              :class="
                item.name === 'add_work' ? `white--text` : `${item.color}--text`
              "
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="error" block @click="$store.dispatch('logout')">
            Çıkış Yap
            <v-icon style="margin-left: 10px">login</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      v-if="$route.path !== '/login'"
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
      <v-toolbar-title
        v-if="$store.state.authenticated"
        class="d-none d-md-block mr-4"
      >
        {{ $store.state.user.name }}
      </v-toolbar-title>
      <v-btn v-if="!$store.state.authenticated" text color="white" to="/login">
        Giriş Yap
        <v-icon style="margin-left: 10px">login</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="d-none d-sm-block white black--text"
        @click="$store.dispatch('logout')"
      >
        Çıkış Yap
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
          name: 'locations',
          color: 'purple',
          title: 'Şehirler',
          icon: 'location_on'
        },
        {
          name: 'sectors',
          color: 'orange',
          title: 'Sektörler',
          icon: 'business_center'
        },
        {
          name: 'partners',
          color: 'indigo',
          title: 'Ustalar',
          icon: 'person'
        },
        {
          name: 'ads',
          color: 'success',
          title: 'Reklamlar',
          icon: 'insert_chart_outlined'
        },
        {
          name: 'add_work',
          color: 'primary',
          title: 'İş Ekle',
          icon: 'local_atm'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    openModal(name, title) {
      this.drawer = false
      this.$store.dispatch('toggleModal', { value: true, name, title })
    }
  }
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
