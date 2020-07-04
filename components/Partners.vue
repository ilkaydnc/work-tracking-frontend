<template>
  <v-card-text>
    <v-container>
      <h3>Usta Ekle</h3>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="partner_form.name"
            label="Usta Adı Giriniz*"
            prepend-icon="person"
            required
            @input="formInput($event, 'partner', 'name')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="partner_form.phone"
            label="Usta telefonu*"
            prepend-icon="phone"
            required
            @input="formInput($event, 'partner', 'phone')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="partner_form.location"
            :items="locations"
            item-text="name"
            item-value="id"
            label="Şehir Seçiniz*"
            prepend-icon="location_on"
            required
            @input="formInput($event, 'partner', 'location')"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="partner_form.sectors"
            :items="sectors"
            item-text="name"
            item-value="id"
            attach
            prepend-icon="work"
            label="Sektör Seçiniz*"
            multiple
            @input="formInput($event, 'partner', 'sectors')"
          />
        </v-col>
        <v-col> </v-col>
        <v-col cols="12" sm="12" md="4" align-self="end">
          <v-btn class="my-3" color="primary" block>
            <v-icon dark left>add</v-icon>
            Ekle
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-divider class="py-4"></v-divider>
      </v-row>
      <h3>Tüm Ustalar</h3>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-simple-table :dense="false" :fixed-header="true" height="300">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">İsim</th>
                  <th class="text-left">Şehir</th>
                  <th class="text-left">Telefon</th>
                  <th class="text-left">Sektörler</th>
                  <th class="text-center">Eylemler</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="partner in partners" :key="partner.id">
                  <td>{{ partner.name }}</td>
                  <td>{{ partner.location.name }}</td>
                  <td>{{ partner.phone }}</td>
                  <td>
                    {{ partner.sectors.map((item) => item.name).join(', ') }}
                  </td>
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
export default {
  name: 'Partners',
  computed: {
    ...mapState(['partners', 'locations', 'sectors', 'partner_form'])
  },
  methods: {}
}
</script>
