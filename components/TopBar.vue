<template>
  <v-card class="d-flex wrap mb-5 align-center">
    <v-card-title
      class="d-none d-sm-flex col-12 align-items justify-center justify-lg-end"
    >
      <div v-for="button in buttons" :key="button.text">
        <v-btn
          large
          :text="button.icon !== 'local_atm' ? true : false"
          depressed
          :color="button.color"
          class="mx-2"
          @click.prevent="openModal(button.name, button.text)"
        >
          {{ button.text }}
          <v-icon style="margin-left: 10px">{{ button.icon }}</v-icon>
        </v-btn>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      buttons: [
        {
          name: 'locations',
          color: 'purple',
          text: 'Şehirler',
          icon: 'location_on'
        },
        {
          name: 'sectors',
          color: 'orange',
          text: 'Sektörler',
          icon: 'business_center'
        },
        {
          name: 'partners',
          color: 'indigo',
          text: 'Ustalar',
          icon: 'person'
        },
        {
          name: 'ads',
          color: 'success',
          text: 'Reklamlar',
          icon: 'insert_chart_outlined'
        },
        {
          name: 'add_work',
          color: 'primary',
          text: 'İş Ekle',
          icon: 'local_atm'
        }
      ]
    }
  },
  methods: {
    openModal(name, title) {
      this.$store.dispatch('toggleModal', { value: true, name, title })
    }
  }
}
</script>
