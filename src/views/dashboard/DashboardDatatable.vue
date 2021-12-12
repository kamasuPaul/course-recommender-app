<template>
  <v-card>
    <v-card-title class="align-start">
      <span>All available university programmes </span>
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
      :server-items-length="totalProgrammes"
      :page-count="numberOfPages"
      :options.sync="options"
      :page.sync="page"
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
        { text: 'PROGRAMME', value: 'name' },
        { text: 'CODE', value: 'alias_code' },
        { text: 'CAMPUS', value: 'campus.name' },
        { text: 'TUITION FEES', value: 'tuition_fees' },
        { text: 'DURATION', value: 'years' },
        { text: 'STUDY TIME', value: 'type' },
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
      numberOfPages: 0,
      totalProgrammes: 0,
      search: '',
      page: 1,
      options: {},
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchProgrammes()
      },
    },
    deep: true,
  },
  created() {
    this.fetchProgrammes()
  },
  methods: {
    fetchProgrammes() {
      this.loading = true
      const { page, itemsPerPage } = this.options
      this.$http
        .get(`/courses?page=${page}&per_page=${itemsPerPage}`)
        .then(res => {
          this.programmes = res.data.data
          this.totalProgrammes = res.data.total
          this.numberOfPages = res.data.last_page
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
