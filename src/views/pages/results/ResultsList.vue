<template>
  <v-container>
    <v-card id="account-setting-card">
      <v-card-title>Submit new results</v-card-title>
      <v-card-text>
        Submit your O and A level results, and once saved they will appear under saved results
      </v-card-text>
      <v-card-text>
        <v-divider></v-divider>
      </v-card-text>
      <v-stepper
        v-model="e1"
        alt-labels
      >
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            O level results
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            A level results
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Gender
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col
                md="12"
              >
                <v-form class="multi-col-validation mt-6">
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th class="text-uppercase">
                          Subject
                        </th>
                        <th class="text-center text-uppercase">
                          Grade
                        </th>
                        <th class="text-center text-uppercase">
                          Subject code
                        </th>
                        <th class="text-center text-uppercase">
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item,index) in selected_olevel_subjects"
                        :key="item.subject_id"
                      >
                        <td>{{ index+1 }}</td>
                        <td>
                          <v-select
                            v-model="item.subject_id"
                            :items="o_subjects"
                            filled
                            label="Subject"
                            item-text="name"
                            item-value="id"
                          ></v-select>
                        </td>
                        <td class="text-center">
                          <v-select
                            v-model="item.grade"
                            :items="o_grades"
                            filled
                            label="Grade"
                          ></v-select>
                        </td>
                        <td class="text-center">
                          {{ item.code }}
                        </td>
                        <td class="text-center">
                          <span v-if="item.removable">
                            <v-tooltip bottom>
                              <template
                                v-slot:activator="{ on, attrs }"
                              >
                                <v-icon
                                  size="30"
                                  v-bind="attrs"
                                  @click="removeSubject(item.subject_id)"
                                  v-on="on"
                                >
                                  {{ icons.mdiCloseCircleOutline }}
                                </v-icon>
                              </template>
                              <span>Remove subject</span>
                            </v-tooltip>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  color="primary mt-6"
                  :disabled="!stepOlevelValid"
                  @click="e1 = 2"
                >
                  Next: A level results
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-row>
              <v-col
                md="12"
              >
                <v-form class="multi-col-validation mt-6">
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th class="text-uppercase">
                          Subject
                        </th>
                        <th class="text-center text-uppercase">
                          Grade
                        </th>
                        <th class="text-center text-uppercase">
                          Subject code
                        </th>
                        <th class="text-center text-uppercase">
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item,index) in selected_alevel_subjects"
                        :key="item.subject_id"
                      >
                        <td>{{ index+1 }}</td>
                        <td>
                          <v-select
                            v-model="item.subject_id"
                            :items="a_subjects"
                            filled
                            label="Subject"
                            item-text="name"
                            item-value="id"
                          ></v-select>
                        </td>
                        <td class="text-center">
                          <v-select
                            v-model="item.grade"
                            :items="a_grades"
                            filled
                            label="Grade"
                          ></v-select>
                        </td>
                        <td class="text-center">
                          {{ item.code }}
                        </td>
                        <td class="text-center">
                          <span v-if="item.removable">
                            <v-tooltip bottom>
                              <template
                                v-slot:activator="{ on, attrs }"
                              >
                                <v-icon
                                  size="30"
                                  v-bind="attrs"
                                  @click="removeASubject(item.subject_id)"
                                  v-on="on"
                                >
                                  {{ icons.mdiCloseCircleOutline }}
                                </v-icon>
                              </template>
                              <span>Remove subject</span>
                            </v-tooltip>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="mt-6">
              <v-col>
                <v-btn
                  text
                  @click="e1 = 1"
                >
                  Back
                </v-btn>
                <v-btn
                  color="primary"
                  :disabled="!stepAlevelValid"
                  @click="e1 = 3"
                >
                  Next: Gender
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12 center"
              color="grey lighten-1"
            >
              <v-item-group
                v-model="selected_gender"
                mandatory
              >
                <v-container>
                  <v-row justify="center">
                    <v-col
                      cols="4"
                    >
                      <v-item
                        v-slot="{ active, toggle }"
                      >
                        <v-card
                          :color="active ? 'primary' : ''"
                          class="d-flex align-center"
                          dark
                          height="200"
                          @click="toggle"
                        >
                          <v-scroll-y-transition>
                            <div
                              v-if="active"
                              class="text-h2 flex-grow-1 text-center"
                            >
                              Male
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                    <v-col
                      cols="4"
                    >
                      <v-item v-slot="{ active, toggle }">
                        <v-card
                          :color="active ? 'primary' : ''"
                          class="d-flex align-center"
                          dark
                          height="200"
                          @click="toggle"
                        >
                          <v-scroll-y-transition>
                            <div
                              v-if="active"
                              class="text-h2 flex-grow-1 text-center"
                            >
                              Female
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-card>
            <v-btn
              text
              @click="e1 = 2"
            >
              Back
            </v-btn>
            <v-btn
              color="primary mt-3 mb-3"
              :loading="submitLoading"
              @click="submitResults()"
            >
              SUBMIT AND CALCULATE WEIGHTS
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <SavedResults
      v-if="results.length > 0"
      :results="results"
      :loading="loading"
    ></SavedResults>
    <v-snackbar
      v-model="snackbar"
      class="float-right"
      timeout="-1"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mdiCloseCircleOutline } from '@mdi/js'
import SavedResults from './SavedResults.vue'

export default {
  components: {
    SavedResults,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      results: [],
      e1: 1,
      subject_id: null,
      grade: null,
      a_subject_id: null,
      a_grade: null,
      o_subjects: [],
      o_grades: ['D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9', 'X'],
      selected_olevel_subjects: [
      ],
      a_subjects: [],
      a_grades: ['A', 'B', 'C', 'D', 'E', 'F', 'O', 'U', 'P', '1', '0'],
      selected_alevel_subjects: [
      ],
      gender: true,
      selected_gender: '',
      submitLoading: false,
      loading: true,
      icons: {
        mdiCloseCircleOutline,
      },
    }
  },
  computed: {
    disabled() {
      return this.subject_id == null || this.grade == null
    },
    disabledA() {
      return this.a_subject_id == null || this.a_grade == null
    },
    stepOlevelValid() {
      return this.selected_olevel_subjects.length >= 9 && this.subjectsValid(this.selected_olevel_subjects)
    },
    stepAlevelValid() {
      return this.selected_alevel_subjects.length >= 5 && this.subjectsValid(this.selected_alevel_subjects)
    },
  },
  watch: {
    selected_olevel_subjects: {
      handler() {
        if (this.selected_olevel_subjects.length >= 10) { return }
        const lastSubject = this.selected_olevel_subjects[this.selected_olevel_subjects.length - 1]
        if (lastSubject.subject_id != null && lastSubject.grade != null) {
          const sub = this.o_subjects.find(x => x.id === lastSubject.subject_id)
          lastSubject.code = sub.code
          lastSubject.name = sub.name
          lastSubject.removable = true
          this.$set(this.selected_olevel_subjects, this.selected_olevel_subjects.length - 1, lastSubject)
          this.disableOLevelOptions()
          this.addOSubject()
        }
      },
      deep: true,
    },
    selected_alevel_subjects: {
      handler() {
        if (this.selected_alevel_subjects.length >= 5) { return }
        const lastSubject = this.selected_alevel_subjects[this.selected_alevel_subjects.length - 1]
        if (lastSubject.subject_id != null && lastSubject.grade != null) {
          const sub = this.a_subjects.find(x => x.id === lastSubject.subject_id)
          lastSubject.code = sub.code
          lastSubject.name = sub.name
          lastSubject.removable = true
          this.$set(this.selected_alevel_subjects, this.selected_alevel_subjects.length - 1, lastSubject)
          this.disableALevelOptions()
          this.addASubject()
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchSubjects()
    this.fetchSavedResults()
  },
  methods: {
    subjectsValid(subjectArray) {
      let allSubjectsValid = true
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < subjectArray.length; i++) {
        const subject = subjectArray[i]
        if (subject.grade === ''
         || subject.grade == null
         || subject.subject_id === ''
         || subject.subject_id == null) {
          allSubjectsValid = false
          break
        }
      }

      return allSubjectsValid
    },
    bulkAddSubjects() {
      const subs = [
        { id: 2, name: 'BIOLOGY', code: '553' },
        { id: 4, name: 'CHEMISTRY', code: '545' },
        { id: 6, name: 'ENGLISH LANGUAGE', code: '112' },
        { id: 15, name: 'GEOGRAPHY', code: '273' },
        { id: 5, name: 'HISTORY', code: '241' },
        { id: 13, name: 'MATHEMATICS', code: '456' },
        { id: 10, name: 'PHYSICS', code: '535' },
      ]

      subs.forEach(subb => {
        const sub = this.o_subjects.find(x => x.code === subb.code)
        const subject = {
          subject_id: sub.id,
          grade: '',
          subject_name: '',
          code: sub.code,
          removable: true,
        }
        this.selected_olevel_subjects.push(subject)
      })
    },
    bulkAddASubjects() {
      const subs = [{ id: 89, name: 'GENERAL PAPER', code: 'S101' },
        { id: 63, name: 'SUBSIDIARY ICT', code: 'S850' },
        { id: 62, name: 'SUBSIDIARY MATHEMATICS', code: 'S475' },
      ]
      subs.forEach(subb => {
        const sub = this.a_subjects.find(x => x.code === subb.code)
        const subject = {
          subject_id: sub.id,
          grade: '',
          subject_name: '',
          code: sub.code,
          removable: true,
        }
        this.selected_alevel_subjects.push(subject)
      })
    },
    removeItem(id) {
      this.$emit('removeItem', id)
    },
    disableOLevelOptions() {
      const subjectIds = this.selected_olevel_subjects.map(item => item.subject_id)
      subjectIds.forEach(subjectId => {
        const sub = this.o_subjects.find(x => x.id === subjectId)
        if (sub) {
          sub.disabled = true
          this.$set(this.o_subjects, this.o_subjects.indexOf(sub), sub)
        }
      })
    },
    disableALevelOptions() {
      const subjectIds = this.selected_alevel_subjects.map(item => item.subject_id)
      subjectIds.forEach(subjectId => {
        const sub = this.a_subjects.find(x => x.id === subjectId)
        if (sub) {
          sub.disabled = true
          this.$set(this.a_subjects, this.a_subjects.indexOf(sub), sub)
        }
      })
    },
    addOSubject() {
      // const sub = this.o_subjects.find(x => x.id === this.subject_id)
      const exists = false// this.selected_olevel_subjects.find(x => x.subject_id === this.subject_id)
      if (exists || this.selected_olevel_subjects.length >= 10) {
        return
      }
      const subject = {
        subject_id: this.subject_id,
        grade: this.grade,
        subject_name: 'name', // sub.name,
        code: 'code', // sub.code,
        removable: false,
      }
      this.selected_olevel_subjects.push(subject)

      // make grade and subject empty
      this.subject_id = null
      this.grade = null
    },
    addASubject() {
      // const sub = this.a_subjects.find(x => x.id === this.a_subject_id)
      const exists = false// this.selected_alevel_subjects.find(x => x.subject_id === this.a_subject_id)
      if (exists || this.selected_alevel_subjects.length >= 5) {
        return
      }
      const subject = {
        subject_id: this.a_subject_id,
        grade: this.a_grade,
        subject_name: '',
        code: '',
        removable: false,
      }
      this.selected_alevel_subjects.push(subject)

      // make grade and subject empty
      this.a_subject_id = null
      this.a_grade = null
    },
    removeSubject(id) {
      this.selected_olevel_subjects = this.selected_olevel_subjects.filter(x => x.subject_id !== id)
      const sub = this.o_subjects.find(x => x.id === id)
      sub.disabled = false
      this.$set(this.o_subjects, this.o_subjects.indexOf(sub), sub)
    },
    removeASubject(id) {
      this.selected_alevel_subjects = this.selected_alevel_subjects.filter(x => x.subject_id !== id)
      const sub = this.a_subjects.find(x => x.id === id)
      sub.disabled = false
      this.$set(this.a_subjects, this.a_subjects.indexOf(sub), sub)
    },
    fetchSubjects() {
      this.$http.get('/subjects')
        .then(res => {
          const subjects = res.data.data
          subjects.forEach(subject => {
            if (subject.level === 'A') {
              this.a_subjects.push(subject)
            } else {
              this.o_subjects.push(subject)
            }
          })
        })
        .finally(() => {
          // sort the a_subjects and o_subjects arrays

          this.a_subjects.sort((a, b) => a.name.localeCompare(b.name))
          this.o_subjects.sort((a, b) => a.name.localeCompare(b.name))

          this.bulkAddSubjects()
          this.bulkAddASubjects()
        })
    },
    submitResults() {
      this.submitLoading = true
      this.loading = true
      const data = {
        o_level_subjects: this.selected_olevel_subjects,
        a_level_subjects: this.selected_alevel_subjects,
        gender: this.selected_gender === 0 ? 'male' : 'female',
      }

      this.$http.post('/results', data)
        .then(response => {
          console.log(response)
          this.fetchSavedResults()
          this.snackbarText = 'Results saved successfully'
          this.snackbar = true

          // go to courses page
          const resultId = response.data.id
          this.$router.push({ name: 'results-eligible', params: { id: resultId } })
        })
        .catch(error => {
          console.log(error)
          this.snackbarText = error.response.data.message
          this.snackbar = true
        })
        .finally(() => {
          this.submitLoading = false
          this.loading = false
        })
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
