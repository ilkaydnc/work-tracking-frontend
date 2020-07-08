<template>
  <v-card-text>
    <v-container>
      <h3>Şehir Ekle</h3>
      <v-row tag="form" @submit.prevent="createLocation">
        <v-col cols="8" sm="9" md="9">
          <v-text-field
            v-model="name"
            label="Şehir Adı Giriniz*"
            prepend-icon="location_on"
            required
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="3" md="3" align-self="center">
          <v-btn type="submit" class="my-3" color="primary" block>
            <v-icon dark left>add</v-icon>
            Ekle
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-divider class="py-4"></v-divider>
      </v-row>
      <h3>Tüm Şehirler</h3>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-simple-table :dense="false" :fixed-header="true" height="300">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">İsim</th>
                  <th class="text-center">Eylemler</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="location in locations" :key="location.id">
                  <td>{{ location.name }}</td>
                  <td class="d-flex flex-row justify-center align-center">
                    <v-btn
                      text
                      fab
                      small
                      color="error"
                      @click.stop="deleteLocation(location.id)"
                    >
                      <v-icon>delete_outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <small>Yanında * olanlar zorunludur.</small>
  </v-card-text>
</template>

<script>
import { mapState } from 'vuex'
import { handleError } from '../store'
import { CREATE_LOCATION, DELETE_LOCATION } from '../graphql/queries'
import graphqlClient from '~/graphql'
export default {
  name: 'Locations',
  data() {
    return {
      name: undefined
    }
  },
  computed: {
    ...mapState(['locations'])
  },
  methods: {
    async createLocation() {
      try {
        await graphqlClient.mutate({
          mutation: CREATE_LOCATION,
          variables: {
            createLocationInput: {
              name: this.name
            }
          }
        })
        this.$store.dispatch('getData')
        this.$store.dispatch('toggleModal', {
          value: false,
          name: null,
          title: null
        })
      } catch (error) {
        this.$store.commit(handleError, error.message)
      }
    },
    async deleteLocation(id) {
      if (confirm('Silmek istediğinize emin misiniz?'))
        try {
          await graphqlClient.mutate({
            mutation: DELETE_LOCATION,
            variables: {
              id
            }
          })
          this.$store.dispatch('getData')
          this.$store.dispatch('toggleModal', {
            value: false,
            name: null,
            title: null
          })
        } catch (error) {
          this.$store.commit(handleError, error.message)
        }
    }
  }
}
</script>
