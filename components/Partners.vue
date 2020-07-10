<template>
  <v-card-text>
    <v-container>
      <h3>Usta Ekle</h3>
      <v-row
        ref="partners"
        tag="form"
        lazy-validation
        @submit.prevent="submitForm"
      >
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="name"
            label="Usta Adı Giriniz*"
            prepend-icon="person"
            required
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="phone"
            label="Usta telefonu*"
            prepend-icon="phone"
            required
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          ></v-text-field>
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
            v-model="sectorIds"
            :items="sectors"
            item-text="name"
            item-value="id"
            prepend-icon="work"
            label="Sektör Seçiniz*"
            multiple
            :rules="[(v) => !!v || 'Bu kısım boş bırakılamaz.']"
          />
        </v-col>
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
      <h3>Tüm Ustalar</h3>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-simple-table :fixed-header="true" height="300">
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
                    <v-btn
                      text
                      fab
                      small
                      color="primary"
                      @click.stop="selectPartner(partner)"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      text
                      fab
                      small
                      color="error"
                      @click.stop="deletePartner(partner.id)"
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
    <small>Yanında * olanlar zorunludur.</small>
  </v-card-text>
</template>

<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/prop-name-casing */
import { mapState } from 'vuex'
import { handleLoading, handleError } from '../store'
import {
  CREATE_PARTNER,
  UPDATE_PARTNER,
  DELETE_PARTNER
} from '../graphql/queries'
import graphqlClient from '~/graphql'

export default {
  name: 'Partners',
  data() {
    return {
      partnerId: undefined,
      name: undefined,
      phone: undefined,
      locationId: undefined,
      sectorIds: undefined,
      isEdit: false
    }
  },
  computed: {
    ...mapState(['partners', 'locations', 'sectors'])
  },
  methods: {
    selectPartner(partner) {
      const { id, name, phone, location, sectors } = partner

      this.partnerId = id
      this.name = name
      this.phone = phone
      this.locationId = location.id
      this.sectorIds = sectors.map((s) => s.id)
      this.isEdit = true
    },
    clearForm() {
      this.name = undefined
      this.phone = undefined
      this.locationId = undefined
      this.sectorIds = undefined
      this.isEdit = false
    },
    async submitForm(e) {
      const { name, phone, locationId, sectorIds } = this

      if (!name && !phone && !locationId && !sectorIds.length) return
      this.$store.commit(handleLoading, { name: 'modal', value: true })

      if (this.isEdit) {
        await this.updatePartner()
      } else {
        await this.createPartner()
      }

      this.$store.dispatch('getData')
      this.$store.commit(handleLoading, { name: 'modal', value: false })
    },
    async createPartner() {
      const { name, phone, locationId, sectorIds } = this
      try {
        await graphqlClient.mutate({
          mutation: CREATE_PARTNER,
          variables: {
            createPartnerInput: {
              name,
              phone,
              locationId,
              sectorIds
            }
          }
        })
        this.$store.dispatch('toggleModal', {
          value: false,
          name: null,
          title: null
        })
      } catch (error) {
        window.location.reload()
        this.$store.commit(handleError, error.message)
      }
    },
    async updatePartner() {
      const { name, phone, locationId, sectorIds } = this
      try {
        await graphqlClient.mutate({
          mutation: UPDATE_PARTNER,
          variables: {
            updatePartnerInput: {
              id: this.partnerId,
              name,
              phone,
              locationId,
              sectorIds
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
        window.location.reload()
        this.$store.commit(handleError, error.message)
      }
    },
    async deletePartner(id) {
      if (confirm('Silmek istediğinize emin misiniz?')) {
        try {
          await graphqlClient.mutate({
            mutation: DELETE_PARTNER,
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
          window.location.reload()
          this.$store.commit(handleError, error.message)
        }
      }
    }
  }
}
</script>
