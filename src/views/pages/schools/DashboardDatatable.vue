<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Available schools </span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="programmes"
      item-key="id"
      class="table-rounded"
      :items-per-page="10"
      :loading="loading"
      :search="search"
      disable-sort
    >
      <!-- name -->
      <template #[`item.full_name`]="{item}">
        <div class="d-flex flex-column">
          <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.name }}</span>
        </div>
      </template>
      <template #[`item.tuition_fees`]>
        --
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'

export default {
  setup() {
    const statusColor = {
      /* eslint-disable key-spacing */
      DAY: 'primary',
      EVENNING: 'success',
      AFTERNOON: 'error',
      EXTERNAL: 'warning',
      SPECIAL: 'info',
      /* eslint-enable key-spacing */
    }

    return {
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'ADDRESS', value: 'address' },
        { text: 'DISTRICT', value: 'district' },
        { text: 'WEBSITE', value: 'website' },
        { text: 'EMAIL', value: 'email' },
        { text: 'TEL', value: 'phone' },
      ],
      status: {
        1: 'DAY',
        2: 'EVENNING',
        3: 'AFTERNOON',
        4: 'EXTERNAL',
        5: 'SPECIAL',
      },
      statusColor,

      // icons
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
    }
  },
  data() {
    return {
      programmes: [],
      loading: true,
      search: '',
    }
  },
  created() {
    this.fetchProgrammes()
  },
  methods: {
    fetchProgrammes() {
      this.$http
        .get('/schools')
        .then(res => {
          this.programmes = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
