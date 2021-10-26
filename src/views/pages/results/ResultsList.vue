<template>
  <v-card id="account-setting-card">
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
          <v-card
            class="mb-12"
            color="grey lighten-1"
          >
            <v-form class="multi-col-validation mt-6">
              <v-row>
                <v-col
                  md="4"
                  cols="12"
                >
                  <v-select
                    v-model="subject_id"
                    :items="o_subjects"
                    filled
                    label="Subject"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-col>

                <v-col
                  md="4"
                  cols="12"
                >
                  <v-select
                    v-model="grade"
                    :items="o_grades"
                    filled
                    label="Grade"
                  ></v-select>
                </v-col>
                <v-col
                  md="4"
                  cols="12"
                >
                  <v-btn
                    dense
                    outlined
                    :disabled="disabled"
                    @click="addOSubject"
                  >
                    Add subject
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <OLevelResults
                    :selected-subjects="selected_olevel_subjects"
                    @removeItem="removeSubject($event)"
                  ></OLevelResults>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
          >
            <v-form class="multi-col-validation mt-6">
              <v-row>
                <v-col
                  md="4"
                  cols="12"
                >
                  <v-select
                    v-model="a_subject_id"
                    :items="a_subjects"
                    filled
                    label="Subject"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-col>

                <v-col
                  md="4"
                  cols="12"
                >
                  <v-select
                    v-model="a_grade"
                    :items="a_grades"
                    filled
                    label="Grade"
                  ></v-select>
                </v-col>
                <v-col
                  md="4"
                  cols="12"
                >
                  <v-btn
                    dense
                    outlined
                    :disabled="disabledA"
                    @click="addASubject"
                  >
                    Add subject
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <ALevelResults
                    :selected-subjects="selected_alevel_subjects"
                    @removeItem="removeASubject($event)"
                  ></ALevelResults>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn
            text
            @click="e1 = 1"
          >
            Back
          </v-btn>
          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12 center"
            color="grey lighten-1"
          >
            <v-item-group mandatory>
              <v-container>
                <v-row justify="center">
                  <v-col
                    cols="4"
                  >
                    <v-item @click="gender= !gender" v-slot="{ active, toggle }">
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
            color="primary"
            @click="e1 = 1"
          >
            Submit
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import OLevelResults from './OLevelResults.vue'
import ALevelResults from './ALevelResults.vue'

export default {
  components: {
    OLevelResults,
    ALevelResults,
  },
  data() {
    return {
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
      a_grades: ['A', 'B', 'C', 'D', 'E', 'F', 'O', 'U', 'P'],
      selected_alevel_subjects: [],
      gender: true,
    }
  },
  computed: {
    disabled() {
      return this.subject_id == null || this.grade == null
    },
    disabledA() {
      return this.a_subject_id == null || this.a_grade == null
    },
  },
  mounted() {
    this.fetchSubjects()
  },
  methods: {
    addOSubject() {
      const sub = this.o_subjects.find(x => x.id === this.subject_id)
      const exists = this.selected_olevel_subjects.find(x => x.subject_id === this.subject_id)
      if (exists || this.selected_olevel_subjects.length > 10) {
        return
      }
      const subject = {
        subject_id: this.subject_id,
        grade: this.grade,
        subject_name: sub.name,
        code: sub.code,
      }
      this.selected_olevel_subjects.push(subject)

      // make grade and subject empty
      this.subject_id = null
      this.grade = null
    },
    addASubject() {
      const sub = this.a_subjects.find(x => x.id === this.a_subject_id)
      const exists = this.selected_alevel_subjects.find(x => x.subject_id === this.a_subject_id)
      if (exists || this.selected_alevel_subjects.length > 5) {
        return
      }
      const subject = {
        subject_id: this.a_subject_id,
        grade: this.a_grade,
        subject_name: sub.name,
        code: sub.code,
      }
      this.selected_alevel_subjects.push(subject)

      // make grade and subject empty
      this.a_subject_id = null
      this.a_grade = null
    },
    removeSubject(id) {
      this.selected_olevel_subjects = this.selected_olevel_subjects.filter(x => x.subject_id !== id)
    },
    removeASubject(id) {
      this.selected_alevel_subjects = this.selected_alevel_subjects.filter(x => x.subject_id !== id)
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
    },
  },
}
</script>
