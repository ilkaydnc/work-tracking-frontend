<template>
  <v-data-table
    locale="tr-TR"
    :headers="headers"
    :loading="loading_datatable"
    loading-text="Veriler yükleniyor..."
    :items="works"
    no-data-text="Yüklenebilecek veri yok."
  >
    <template v-slot:item.id="{ item }">
      <span>{{ works.map((w) => w.id === item.id).indexOf(item.id) }} </span>
    </template>
    <template v-slot:item.date="{ item }">
      <span>{{ formatDate(item.date) }}</span>
    </template>
    <template v-slot:item.amount="{ item }">
      <span>{{ item.amount }} TL</span>
    </template>
    <template v-slot:item.action="{ item }">
      <span>
        <v-btn
          depressed
          class="mx-2"
          fab
          small
          icon
          color="primary"
          @click.stop="editWork('add_work', 'İş Düzenle', item)"
        >
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          depressed
          class="mx-2"
          fab
          small
          icon
          color="error"
          @click.stop="deleteItem(item.id)"
        >
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </span>
    </template>
    <template slot="footer">
      <v-row v-if="!loading_datatable" class="primary mx-0 white--text">
        <v-spacer class="d-none d-sm-flex" />
        <div class="col-6 col-md-4">
          <span class="font-weight-medium"></span>
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          <span class="body-2">Ciro</span>
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          <span class="body-2">Reklam</span>
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          <span class="body-2">Kâr</span>
        </div>
        <div class="d-none col-sm-1"></div>
      </v-row>
      <v-row v-if="!loading_datatable" class="grey lighten-3 mx-0 black--text ">
        <v-spacer class="d-none d-sm-flex" />
        <div class="col-6 col-md-4 text-left text-sm-right">
          <span class="font-weight-medium">Seçilenlere Göre Toplam</span>
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          {{ filteredStatistics.works_total }} TL
        </div>
        <div v-if="!filter_partner" class="col-2 col-md-2 col-lg-1 text-center">
          {{ filteredStatistics.ads_total }} TL
        </div>
        <div v-if="!filter_partner" class="col-2 col-md-2 col-lg-1 text-center">
          {{ filteredStatistics.works_total - filteredStatistics.ads_total }} TL
        </div>
        <div v-else class="col-2"></div>
        <div class="d-none col-sm-1"></div>
      </v-row>
      <v-row v-if="!loading_datatable" class="grey lighten-3 mx-0 black--text">
        <v-spacer />
        <div class="col-6 col-md-4 text-left text-sm-right">
          <span class="font-weight-medium">Genel Toplam</span>
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          {{ statistics.works_total }} TL
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          {{ statistics.ads_total }} TL
        </div>
        <div class="col-2 col-md-2 col-lg-1 text-center">
          {{ statistics.works_total - statistics.ads_total }} TL
        </div>
        <div class="d-none col-sm-1"></div>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import { formatDate } from '../utils/date'
import { selectWork, handleError } from '../store'
import { DELETE_WORK } from '../graphql/queries'
import graphqlClient from '~/graphql'
export default {
  name: 'Datatable',
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          value: 'index',
          sortable: true
        },
        {
          text: 'Tarih',
          align: 'center',
          value: 'date',
          sortable: true
        },
        {
          text: 'Usta',
          align: 'center',
          value: 'partner.name',
          sortable: false
        },
        {
          text: 'Şehir',
          align: 'center',
          value: 'location.name',
          sortable: false
        },
        {
          text: 'Sektör',
          align: 'center',
          value: 'sector.name',
          sortable: false
        },
        {
          text: 'İş Tutarı',
          align: 'center',
          value: 'amount',
          sortable: true
        },
        {
          text: '',
          align: 'center',
          value: 'action',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'works',
      'statistics',
      'filteredStatistics',
      'loading_datatable',
      'filter_partner'
    ])
  },
  methods: {
    formatDate: (date) => formatDate(date),
    editWork(name, title, work) {
      this.$store.commit(selectWork, work)
      this.$store.dispatch('toggleModal', { value: true, name, title })
    },
    async deleteItem(id) {
      if (confirm('Silmek istediğinize emin misiniz?')) {
        try {
          await graphqlClient.mutate({
            mutation: DELETE_WORK,
            variables: {
              id
            }
          })
          this.$store.dispatch('getData')
        } catch (error) {
          this.$store.commit(handleError, error.message)
        }
      }
    }
  }
}
</script>
