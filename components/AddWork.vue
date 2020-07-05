<template>
  <v-card-text>
    <v-container>
      <v-row
        ref="add_work"
        tag="form"
        lazy-validation
        @submit.prevent="submitForm"
      >
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="partnerId"
            :items="partners"
            item-text="name"
            item-value="id"
            label="Usta Seçiniz*"
            prepend-icon="location_on"
            required
            clearable
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
            @input="getSectorsWithPartnerId"
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
            clearable
            :disabled="!partnerId"
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="amount"
            label="İş Tutarını Giriniz*"
            prepend-icon="money"
            type="number"
            required
            clearable
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
        <v-col />
        <v-col cols="12" sm="12" md="4" align-self="end">
          <v-btn type="submit" class="my-3" color="primary" block>
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
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/prop-name-casing */
import { mapState } from 'vuex'
import { CREATE_WORK, UPDATE_WORK } from '../graphql/queries'
import { handleError, handleLoading, selectWork } from '../store'
import graphqlClient from '~/graphql'
export default {
  name: 'Partners',
  props: ['work'],
  data({ work }) {
    return {
      partnerId: work && work.partner.id,
      locationId: work && work.location.id,
      sectorId: work && work.sector.id,
      amount: work && work.amount,
      date:
        (work && new Date(work.date).toISOString().substr(0, 10)) ||
        new Date().toISOString().substr(0, 10),
      menu: false,
      sectors: work ? work.partner.sectors : [],
      isEdit: Boolean(work)
    }
  },
  computed: {
    ...mapState(['partners'])
  },
  methods: {
    getSectorsWithPartnerId(e) {
      if (!e) {
        this.sectors = []
        return
      }
      const partner = this.partners.find((item) => item.id === e)
      this.sectors = partner.sectors
      this.locationId = partner.location.id
    },
    async submitForm(e) {
      const { partnerId, sectorId, amount, date } = this
      if (!partnerId && !sectorId && !amount && !date) return
      this.$store.commit(handleLoading, { name: 'modal', value: true })
      if (this.isEdit) {
        await this.updateWork(this)
      } else {
        await this.createWork(this)
      }
      this.$store.commit(handleLoading, { name: 'modal', value: false })
      this.$store.commit(selectWork, undefined)
    },
    async createWork(work) {
      const { partnerId, locationId, sectorId, amount, date } = work
      try {
        await graphqlClient.mutate({
          mutation: CREATE_WORK,
          variables: {
            createWorkInput: {
              partnerId,
              sectorId,
              locationId,
              amount: +amount,
              date: new Date(date).toISOString()
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
        throw new Error(error)
      }
    },
    async updateWork(work) {
      const { partnerId, locationId, sectorId, amount, date } = work
      try {
        await graphqlClient.mutate({
          mutation: UPDATE_WORK,
          variables: {
            updateWorkInput: {
              id: this.work.id,
              partnerId,
              sectorId,
              locationId,
              amount: +amount,
              date: new Date(date).toISOString()
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
    }
  }
}
</script>
