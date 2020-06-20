<template>
  <v-row align="center" justify="center" style="height: 100%">
    <v-col cols="12" sm="12" md="8" lg="4" xl="3">
      <v-alert
        v-model="error"
        transition="slide-x-transition"
        type="error"
        dismissible
      >
        {{ errorMessage }}
      </v-alert>
      <v-card class="elevation-4">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Giriş Formu</v-toolbar-title>
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
              v-model="loginForm.username"
              label="Kullanıcı Adı"
              name="username"
              prepend-icon="mdi-account"
              type="text"
              color="primary"
              :rules="[rules.required]"
            />
            <v-text-field
              id="password"
              v-model="loginForm.password"
              label="Parola"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              color="primary"
              :rules="[rules.password]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" form="loginForm" color="primary" dark>
            Giriş Yap
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'test',
        password: 'Qq12345678.'
      },
      rules: {
        required: (value) => !!value || 'Kullanıcı adı boş olamaz.',
        password: (value) => {
          // eslint-disable-next-line no-useless-escape
          const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])[a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]*/
          return (
            pattern.test(value) ||
            'Şifre minimum 8 karakter ve en az bir tane büyük, küçük harf, rakam ve sembol içermelidir.'
          )
        }
      },
      valid: true,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      await this.validate()
      if (!this.valid) return null

      try {
        await this.$auth.loginWith('local', {
          data: this.loginForm
        })
      } catch (error) {
        this.error = true
        this.errorMessage = error.message
      }
    },
    validate() {
      this.$refs.form.validate()
    }
  }
}
</script>
