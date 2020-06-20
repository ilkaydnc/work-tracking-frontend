<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="add_work_form.partner"
            :items="partners"
            label="Usta Seçiniz*"
            prepend-icon="location_on"
            required
            @input="formInput($event, 'add_work', 'partner')"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="add_work_form.location"
            :items="locations"
            label="Şehir Seçiniz*"
            prepend-icon="location_on"
            required
            @input="formInput($event, 'add_work', 'location')"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :value="add_work_form.sector"
            :items="sectors"
            attach
            prepend-icon="work"
            label="Sektör Seçiniz*"
            multiple
            @input="formInput($event, 'add_work', 'sector')"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="add_work_form.customer_phone"
            label="Müşteri Telefonu Giriniz*"
            prepend-icon="phone"
            required
            @input="formInput($event, 'add_work', 'customer_phone')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="add_work_form.amount"
            label="İş Tutarını Giriniz*"
            prepend-icon="money"
            required
            @input="formInput($event, 'add_work', 'amount')"
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
                :value="add_work_form.date"
                label="İş Yapılma Tarihi*"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :value="add_work_form.date"
              locale="tr-TR"
              :max="new Date().toISOString().substr(0, 10)"
              @input="formInput($event, 'add_work', 'date')"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col />
        <v-col cols="12" sm="12" md="4" align-self="end">
          <v-btn class="my-3" color="primary" block>
            <v-icon dark left>add</v-icon>
            Ekle
          </v-btn>
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
  name: 'Partners',
  computed: {
    ...mapState(['locations', 'sectors', 'partners', 'add_work_form'])
  },
  methods: {
    formInput(value, name, key) {
      this.$store.commit(handleForm, { value, name, key })
    }
  }
}
</script>
