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
          <span>You are eligible for the following university programmes </span>
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
          class="table-rounded row-pointer"
          :items-per-page="10"
          :loading="loading"
          :search="search"
          disable-sort
          @click:row="onClickRow"
        >
          <template #item.index="{ item }">
            {{ programmes.indexOf(item)+1 }}
          </template>
          <template #item.cutoff="{ item }">
            {{ (programmes.indexOf(item)+1 == 10) ? 'N/A' : "--" }}
          </template>
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
      resultId: this.$route.params.id,
      programmes: [],
      loading: true,
      search: '',
      headers: [
        { text: '#', value: 'index' },
        { text: 'PROGRAMME', value: 'name' },
        { text: 'CODE', value: 'alias_code' },
        { text: 'WEIGHT', value: 'weight' },
        { text: 'CUTOFF', value: 'cutoff' },
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
      const parameters = { result: this.resultId }
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
    onClickRow(item) {
      this.$router.push({
        name: 'programme-details',
        params: { id: item.id },
      })
    },
  },

}
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
