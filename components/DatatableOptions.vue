<template>
  <div class="d-flex flex-wrap flex-lg-nowrap col-12">
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="selected_dates"
      persistent
      width="350px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="date_range_text"
          label="Tarih Araligi"
          append-icon="mdi-menu-down"
          color="purple"
          class="col-12 col-sm-12 col-md-6 col-lg-3 px-4"
          readonly
          v-bind="attrs"
          solo
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        :value="selected_dates"
        locale="tr-TR"
        :max="new Date().toISOString().substr(0, 10)"
        range
        @input="updateDate"
      >
        <v-spacer />
        <v-btn text color="error" @click="modal = false">İptal</v-btn>
        <v-btn color="primary" @click="closeModal(selected_dates)">
          Onayla
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-select
      :value="selected_location"
      item-text="enabled.text"
      :items="locations"
      label="Şehir Seç"
      no-data-text="Şehir bulunamadı."
      color="purple"
      class="col-12 col-sm-12 col-md-6 col-lg-3 px-4"
      clearable
      solo
      @input="handleSelect($event, 'location')"
    ></v-select>
    <v-select
      :value="selected_sector"
      :items="sectors"
      label="Sektör Seç"
      no-data-text="Sektör bulunamadı."
      color="purple"
      class="col-12 col-sm-12 col-md-6 col-lg-3 px-4"
      clearable
      solo
      @input="handleSelect($event, 'sector')"
    ></v-select>
    <v-select
      :value="selected_partner"
      :items="partners"
      label="Usta Seç"
      color="purple"
      no-data-text="Usta bulunamadı."
      class="col-12 col-sm-12 col-md-6 col-lg-3 px-4"
      clearable
      solo
      @input="handleSelect($event, 'partner')"
    ></v-select>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { handleDatePicker } from '../store'
export default {
  name: 'DatatableOptions',
  data() {
    return {
      modal: false
    }
  },
  computed: {
    ...mapState([
      'selected_dates',
      'locations',
      'sectors',
      'partners',
      'selected_location',
      'selected_sector',
      'selected_partner'
    ]),
    ...mapGetters(['date_range_text'])
  },
  methods: {
    handleSelect(e, name) {
      this.$store.dispatch('handleSelect', {
        name,
        value: e
      })
    },
    updateDate(e) {
      this.$store.commit(handleDatePicker, e)
    },
    closeModal(dates) {
      this.handleSelect(dates, 'dates')
      this.$refs.dialog.save(dates)
    }
  }
}
</script>
