<template>
  <v-row align="center" justify="center" style="height: 100%">
    <v-col cols="12" sm="12" md="8" lg="4" xl="3">
      <v-alert
        :value="Boolean(error_message)"
        transition="slide-x-transition"
        type="error"
      >
        {{ error_message }}
      </v-alert>
      <v-card class="elevation-4">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Giriş Yap</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form
            id="loginForm"
            ref="form"
            v-model="valid"
            @submit.prevent="login"
          >
            <v-text-field
              v-model="email"
              label="Kullanıcı Adı"
              name="email"
              prepend-icon="mdi-account"
              type="text"
              color="primary"
              :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
            />
            <v-text-field
              id="password"
              v-model="password"
              label="Parola"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              color="primary"
              :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" form="loginForm" color="primary" dark>
            Giriş
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { CURRENT_USER } from '../graphql/queries'
import { setAuth, setUser, setAppLoading } from '../store'
import graphqlClient from '~/graphql'
export default {
  name: 'Login',
  data() {
    return {
      email: 'ilkay@mail.com',
      password: '123456789',
      valid: true
    }
  },
  computed: {
    ...mapState(['error_message'])
  },
  async mounted() {
    try {
      const { data } = await graphqlClient.query({
        query: CURRENT_USER,
        fetchPolicy: 'network-only'
      })
      this.$store.commit(setAuth, true)
      this.$store.commit(setUser, data.me)
      this.$router.push('/')
    } catch (error) {
      this.$store.commit(setAppLoading, false)
    }
  },
  methods: {
    login() {
      const { email, password } = this
      if (!email && !password) return

      this.$store.dispatch('signIn', { email, password })
    }
  }
}
</script>
