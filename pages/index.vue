<template>
  <v-layout column justify-center align-center>
    <v-flex col-12>
      <v-alert
        v-show="error_message"
        transition="scroll-x-transition"
        :leave-absolute="false"
        prominent
        type="error"
        border="left"
      >
        <v-row align="center">
          <v-col class="grow py-1">
            {{ error_message }}
          </v-col>
          <v-col class="shrink py-1">
            <v-btn text fab small @click.stop="dismissError">
              <v-icon>
                close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <Modal :toggle="toggle_modal">
        <nuxt />
      </Modal>
      <TopBar />
      <v-card>
        <v-card-title>
          <DatatableOptions />
        </v-card-title>
        <Datatable />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { handleError } from '../store'

import TopBar from '@/components/TopBar'
import Datatable from '@/components/Datatable'
import DatatableOptions from '@/components/DatatableOptions'
import Modal from '@/components/Modal'

export default {
  name: 'Home',
  components: {
    TopBar,
    Datatable,
    DatatableOptions,
    Modal
  },
  computed: {
    ...mapState([
      'toggle_modal',
      'title_modal',
      'error_message',
      'loading_datatable'
    ])
  },
  mounted() {
    this.$store.dispatch('getData')
  },
  methods: {
    dismissError() {
      this.$store.commit(handleError, null)
    }
  }
}
</script>

<style>
.v-alert--prominent .v-alert__icon:after {
  display: none;
}
</style>
