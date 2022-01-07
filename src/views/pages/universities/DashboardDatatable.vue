<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Available universities </span>
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
      <template #[`item.website`]="{item}">
        <div class="d-flex flex-column">
          <a
            :href="'https://'+item.website"
            target="_blank"
            class="d-block font-weight-semibold text--primary text-truncate"
          >{{ item.website }}</a>
        </div>
      </template>
      <template #[`item.portal_url`]="{item}">
        <div class="d-flex flex-column">
          <a
            :href="item.portal_url"
            target="_blank"
            class="d-block font-weight-semibold text--primary text-truncate"
          >{{ item.portal_url }}</a>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  setup() {
    return {
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'OWNERSHIP', value: 'ownership' },
        { text: 'WEBSITE', value: 'website' },
        { text: 'PORTAL', value: 'portal_url' },
        { text: 'EMAIL', value: 'email' },
        { text: 'TEL', value: 'phone' },
        { text: 'ZIP', value: 'zip' },
      ],
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
        .get('/universities')
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
