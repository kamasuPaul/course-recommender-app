<template>
  <v-row>
    <v-col
      cols="1"
      align="center"
      justify="space-around"
    >
      <v-btn
        tile
        color="grey"
        plain
        :to="{ name:'results'}"
      >
        <v-icon
          left
        >
          {{ icons.back }}
        </v-icon>
        Back
      </v-btn>
    </v-col>
    <v-col cols="11">
      <v-card>
        <v-card-title class="align-start">
          <span>Your eligble for the following university programmes </span>
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
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiKeyboardBackspace } from '@mdi/js'

export default {
  name: 'EligibleProgrammes',
  data() {
    return {
      resultId: this.$route.query.id,
      programmes: [],
      loading: true,
      search: '',
      headers: [
        { text: 'PROGRAMME', value: 'name' },
        { text: 'CODE', value: 'alias_code' },
        { text: 'WEIGHT', value: 'weight' },
        { text: 'CAMPUS', value: 'campus.name' },
        { text: 'TUITION FEES', value: 'tuition_fees' },
        { text: 'DURATION', value: 'years' },
        { text: 'STUDY TIME', value: 'type' },
      ],
      icons: {
        back: mdiKeyboardBackspace,
      },

    }
  },
  created() {
    this.fetchEligibleProgrammes()
  },
  methods: {
    fetchEligibleProgrammes() {
      this.loading = true

      // console.log(this.resultId)
      const parameters = {
        result: 1,
        gender: 'male',
      }
      this.$http
        .get('/courses/eligble', {
          params: parameters,
        })
        .then(res => {
          const progs = res.data.sort((a, b) => (b.weight - a.weight))
          this.programmes = progs
        })
        .finally(() => {
          this.loading = false
        })
    },
  },

}
</script>

<style>

</style>
