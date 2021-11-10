<template>
  <v-card
    class="mt-5"
    outlined
  >
    <v-card-title>Saved Results</v-card-title>
    <v-card-text>
      You can use saved results to get eligble courses for those results.
    </v-card-text>
    <v-card-text>
      <v-divider></v-divider>
    </v-card-text>
    <v-data-table
      :headers="resultHeaders"
      :items="results"
      :single-expand="true"
      :expanded.sync="expanded"
      :loading="loading"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers,item }">
        <td :colspan="headers.length">
          <v-card>
            <v-tabs
              class="tab-index"
            >
              <v-tab>
                O LEVEL
              </v-tab>
              <v-tab>
                A LEVEL
              </v-tab>
              <v-tab>
                GENDER
              </v-tab>

              <v-tab-item
                class="mt-2"
              >
                <DisplaySubjectList :selected-subjects="getLevelSubjects(item.id,'O')"></DisplaySubjectList>
              </v-tab-item>
              <v-tab-item
                class="mt-2"
              >
                <DisplaySubjectList :selected-subjects="getLevelSubjects(item.id,'A')"></DisplaySubjectList>
              </v-tab-item>
              <v-tab-item
                class="mt-2"
              >
                <v-card-title>
                  Male
                </v-card-title>
              </v-tab-item>
            </v-tabs>
            <v-btn
              :to="{name:'results-eligible', params:{id: item.id}}"
              color="primary mt-3 mb-3"
            >
              CALCULATE WEIGHTS
            </v-btn>
          </v-card>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import DisplaySubjectList from './DisplaySubjectList.vue'

export default {
  components: {
    DisplaySubjectList,
  },
  data() {
    return {
      expanded: [],
      loading: true,
      resultHeaders: [
        {
          text: 'userId',
          align: 'start',
          sortable: false,
          value: 'user_id',
        },
        { text: 'Date created', value: 'created_at' },
        { text: 'Date updated', value: 'updated_at' },
        { text: 'Gender', value: 'user_id' },
        { text: '', value: 'data-table-expand' },
      ],
      results: [],
      tab: null,
      tab2: null,
      items: ['O LEVEL', 'A LEVEL', 'GENDER'],
      text: 'Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards…',
      a_level_results: [],
      o_level_results: [],
    }
  },
  created() {
    this.fetchSavedResults()
  },
  methods: {
    getLevelSubjects(resultId, level) {
      const result = this.results.find(x => x.id === resultId)
      const subjects = result.result_subjects.filter(x => x.subject.level === level)

      return subjects
    },
    fetchSavedResults() {
      const user = this.$auth.user()
      this.loading = true
      this.$http.get(`/users/${user.id}/results`)
        .then(res => {
          const resultsData = res.data
          this.results = resultsData
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
