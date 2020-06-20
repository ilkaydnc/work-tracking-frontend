<template>
  <v-data-table
    locale="tr-TR"
    :headers="headers"
    :loading="loading_datatable"
    loading-text="Veriler yükleniyor..."
    :items="works"
    no-data-text="Yüklenebilecek veri yok."
  >
    <template v-slot:item.calories="{ item }">
      <v-chip color="purple" dark>{{ item.calories }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Datatable',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          visible: false
        },
        {
          text: 'İş Yapılan Tarih',
          align: 'start',
          value: 'date',
          sortable: false
        },
        {
          text: 'Usta',
          align: 'start',
          value: 'partner',
          sortable: false
        },
        {
          text: 'Şehir',
          align: 'start',
          value: 'location',
          sortable: false
        },
        {
          text: 'Sektörler',
          align: 'start',
          value: 'sector',
          sortable: false
        },
        {
          text: 'İş Tutarı',
          align: 'start',
          value: 'amount',
          sortable: false
        },
        {
          text: 'Aksiyon',
          align: 'start',
          value: 'action',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapState(['works', 'loading_datatable'])
  }
}
</script>
