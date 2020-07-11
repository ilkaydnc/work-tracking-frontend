<template>
  <v-card-text>
    <v-container>
      <h3>Reklam Ekle</h3>
      <v-row ref="ads" tag="form" lazy-validation @submit.prevent="submitForm">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="amount"
            type="number"
            label="Reklam Tutarı*"
            prepend-icon="money"
            required
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="İş Yapılma Tarihi*"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              locale="tr-TR"
              :max="new Date().toISOString().substr(0, 10)"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="locationId"
            :items="locations"
            item-text="name"
            item-value="id"
            label="Şehir Seçiniz*"
            prepend-icon="location_on"
            required
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="sectorId"
            :items="sectors"
            item-text="name"
            item-value="id"
            prepend-icon="work"
            label="Sektör Seçiniz*"
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
            required
          />
        </v-col>
        <v-col />
        <v-col> </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-btn
            class="my-3"
            color="grey lighten-2"
            block
            @click.stop="clearForm"
          >
            Temizle
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4" align-self="end">
          <v-btn type="submit" class="my-3" color="primary" block>
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
                  <th class="text-left">Şehir</th>
                  <th class="text-left">Sektör</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ad in ads" :key="ad.id">
                  <td>{{ formatDate(ad.date) }}</td>
                  <td>{{ ad.amount }} TL</td>
                  <td>{{ ad.location.name }}</td>
                  <td>{{ ad.sector.name }}</td>
                  <td class="d-flex flex-row justify-center align-center">
                    <v-btn
                      text
                      fab
                      small
                      color="primary"
                      @click.stop="selectAd(ad)"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      text
                      fab
                      small
                      color="error"
                      @click.stop="deleteAd(ad.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import { mapState } from 'vuex'
import { handleLoading, handleError } from '../store'
import { formatDate } from '../utils/date'
import { CREATE_AD, DELETE_AD, UPDATE_AD } from '../graphql/queries'
import graphqlClient from '~/graphql'
export default {
  amount: 'Partners',
  data() {
    return {
      adId: undefined,
      amount: undefined,
      locationId: undefined,
      sectorId: undefined,
      date: new Date().toISOString().substr(0, 10),
      isEdit: false,
      menu: false
    }
  },
  computed: {
    ...mapState(['locations', 'sectors', 'partners', 'ads'])
  },
  methods: {
    formatDate: (date) => formatDate(date),
    selectAd(ad) {
      const { id, amount, location, sector, date } = ad

      this.adId = id
      this.amount = amount
      this.locationId = location.id
      this.sectorId = sector.id
      this.date = new Date(date).toISOString().substr(0, 10)
      this.isEdit = true
    },
    clearForm() {
      this.amount = undefined
      this.locationId = undefined
      this.sectorId = undefined
      this.date = new Date().toISOString().substr(0, 10)
      this.isEdit = false
    },
    async submitForm(e) {
      const { amount, locationId, sectorId, date, isEdit } = this

      if (!amount && !locationId && !sectorId && !date) return
      this.$store.commit(handleLoading, { name: 'modal', value: true })

      if (isEdit) {
        await this.updateAd()
      } else {
        await this.createAd()
      }

      this.$store.dispatch('getData')
      this.$store.commit(handleLoading, { name: 'modal', value: false })
    },
    async createAd() {
      const { amount, date, locationId, sectorId } = this
      try {
        await graphqlClient.mutate({
          mutation: CREATE_AD,
          variables: {
            createAdInput: {
              amount: +amount,
              date: new Date(date).toISOString(),
              locationId,
              sectorId
            }
          }
        })
        this.$store.dispatch('toggleModal', {
          value: false,
          name: null,
          title: null
        })
      } catch (error) {
        this.$store.commit(handleError, error.message)
      }
    },
    async updateAd() {
      const { amount, date, locationId, sectorId, adId } = this
      try {
        await graphqlClient.mutate({
          mutation: UPDATE_AD,
          variables: {
            updateAdInput: {
              id: adId,
              amount: +amount,
              date: new Date(date).toISOString(),
              locationId,
              sectorId
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
    async deleteAd(id) {
      if (confirm('Silmek istediğinize emin misiniz?')) {
        try {
          await graphqlClient.mutate({
            mutation: DELETE_AD,
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
}
</script>
