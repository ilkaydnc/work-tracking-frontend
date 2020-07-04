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
          text: 'Aksiyon',
          align: 'center',
          value: 'action',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapState(['works', 'loading_datatable'])
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
