<template>
  <v-card-text>
    <v-container>
      <h3>Şehir Ekle</h3>
      <v-row>
        <v-col cols="8" sm="9" md="9">
          <v-text-field
            :value="location_form.name"
            label="Şehir Adı Giriniz*"
            prepend-icon="location_on"
            required
            @input="formInput($event, 'location', 'name')"
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="3" md="3" align-self="center">
          <v-btn class="my-3" color="primary" block>
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
                <tr v-for="location in raw_locations" :key="location.id">
                  <td>{{ location.name }}</td>
                  <td class="d-flex flex-row justify-center align-center">
                    <!-- <v-btn text fab small color="green">
                      <v-icon>edit</v-icon>
                    </v-btn> -->
                    <v-btn text fab small color="error">
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
import { handleForm } from '../store'
export default {
  name: 'Locations',
  computed: {
    ...mapState(['raw_locations', 'location_form'])
  },
  methods: {
    formInput(value, name, key) {
      this.$store.commit(handleForm, { value, name, key })
    }
  }
}
</script>
