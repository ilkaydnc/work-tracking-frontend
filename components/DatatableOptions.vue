<template>
  <div class="d-flex flex-wrap flex-lg-nowrap col-12 pa-0 pa-md-3">
    <v-dialog ref="dialog" v-model="modal" persistent width="350px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="date_range_text"
          label="Tarih Araligi"
          append-icon="mdi-menu-down"
          color="purple"
          class="col-12 col-sm-12 col-md-6 col-lg-3 px-0 px-sm-4"
          readonly
          v-bind="attrs"
          solo
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        :value="filter_dates"
        locale="tr-TR"
        :max="new Date().toISOString().substr(0, 10)"
        range
        @input="updateDate"
      >
        <v-spacer />
        <v-btn text color="error" @click="modal = false">İptal</v-btn>
        <v-btn color="primary" @click="closeModal(filter_dates)">
          Onayla
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-select
      :value="filter_partner"
      :items="partners"
      item-text="name"
      item-value="id"
      label="Usta Seç"
      color="purple"
      no-data-text="Usta bulunamadı."
      class="col-12 col-sm-12 col-md-6 col-lg-3 px-0 px-sm-4"
      clearable
      solo
      @input="handleSelect($event, 'partner')"
    >
    </v-select>
    <v-select
      :value="filter_location"
      :items="locations"
      item-text="name"
      item-value="id"
      label="Şehir Seç"
      no-data-text="Şehir bulunamadı."
      color="purple"
      class="col-12 col-sm-12 col-md-6 col-lg-3 px-0 px-sm-4"
      clearable
      solo
      @input="handleSelect($event, 'location')"
    >
    </v-select>
    <v-select
      :value="filter_sector"
      :items="sectors"
      item-text="name"
      item-value="id"
      label="Sektör Seç"
      no-data-text="Sektör bulunamadı."
      color="purple"
      class="col-12 col-sm-12 col-md-6 col-lg-3 px-0 px-sm-4"
      clearable
      solo
      @input="handleSelect($event, 'sector')"
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
      'partners',
      'locations',
      'sectors',
      'filter_dates',
      'filter_location',
      'filter_sector',
      'filter_partner'
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
