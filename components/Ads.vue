<template>
  <v-card-text>
    <v-container>
      <h3>Reklam Ekle</h3>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="ad_form.amount"
            label="Reklam Ödeme Tutarı*"
            prepend-icon="money"
            required
            @input="formInput($event, 'ad', 'amount')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="ad_form.date"
                label="İş Yapılma Tarihi*"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :value="ad_form.date"
              locale="tr-TR"
              :max="new Date().toISOString().substr(0, 10)"
              @input="formInput($event, 'ad', 'date')"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="ad_form.location"
            :items="locations"
            item-text="name"
            item-value="id"
            label="Şehir Seçiniz*"
            prepend-icon="location_on"
            required
            @input="formInput($event, 'add_work', 'location')"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="ad_form.sector"
            :items="sectors"
            item-text="name"
            item-value="id"
            prepend-icon="work"
            label="Sektör Seçiniz*"
            @input="formInput($event, 'add_work', 'sector')"
          />
        </v-col>
        <v-col />
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
      <h3>Tüm Reklamlar</h3>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-simple-table :dense="false" :fixed-header="true" height="300">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Tarih</th>
                  <th class="text-left">Tutar</th>
                  <th class="text-center">Eylemler</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ad in ads" :key="ad.id">
                  <td>{{ ad.date }}</td>
                  <td>{{ ad.amount }}</td>
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
    ...mapState(['locations', 'sectors', 'partners', 'ad_form'])
  },
  methods: {}
}
</script>
