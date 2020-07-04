<template>
  <v-row justify="center">
    <v-dialog
      :value="toggle"
      max-width="800px"
      @keydown.esc="closeModal"
      @click:outside="closeModal"
    >
      <v-card :loading="loading_modal">
        <v-card-title>
          <span class="headline">{{ title_modal }}</span>
        </v-card-title>
        <Locations v-if="name_modal === 'locations'" />
        <Sectors v-else-if="name_modal === 'sectors'" />
        <Partners v-else-if="name_modal === 'partners'" />
        <Ads v-else-if="name_modal === 'ads'" />
        <!-- eslint-disable vue/attribute-hyphenation -->
        <AddWork v-else-if="name_modal === 'add_work'" :work="selected_work" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

import { handleLoading, selectWork } from '../store'
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
    ...mapState(['title_modal', 'name_modal', 'loading_modal', 'selected_work'])
  },
  methods: {
    closeModal() {
      this.$store.dispatch('toggleModal', {
        value: false,
        name: null,
        title: null
      })
      this.$store.commit(handleLoading, { name: 'modal', value: false })
      this.$store.commit(selectWork, undefined)
    }
  }
}
</script>
