<template>
  <v-row justify="center">
    <v-dialog
      :value="toggle"
      max-width="800px"
      @keydown.esc="closeModal"
      @click:outside="closeModal"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ title_modal }}</span>
        </v-card-title>
        <Locations v-if="name_modal === 'locations'" />
        <Sectors v-else-if="name_modal === 'sectors'" />
        <Partners v-else-if="name_modal === 'partners'" />
        <Ads v-else-if="name_modal === 'ads'" />
        <AddWork v-else-if="name_modal === 'add_work'" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeModal">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

import Locations from '@/components/Locations'
import Sectors from '@/components/Sectors'
import Partners from '@/components/Partners'
import Ads from '@/components/Ads'
import AddWork from '@/components/AddWork'
export default {
  components: {
    Locations,
    Sectors,
    Partners,
    Ads,
    AddWork
  },
  props: {
    toggle: Boolean
  },
  computed: {
    ...mapState(['title_modal', 'name_modal'])
  },
  methods: {
    closeModal() {
      this.$store.dispatch('toggleModal', {
        value: false,
        name: null,
        title: null
      })
    }
  }
}
</script>
