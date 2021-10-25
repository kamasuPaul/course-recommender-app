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
                    @click="addOSubject"
                  >
                    Add subject
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <OLevelResults :selected-subjects="selected_olevel_subjects"></OLevelResults>
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
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import OLevelResults from './OLevelResults.vue'

export default {
  components: {
    OLevelResults,
  },
  data() {
    return {
      e1: 1,
      subject_id: '',
      grade: '',
      o_subjects: [],
      o_grades: ['D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9', 'X'],
      selected_olevel_subjects: [
      ],
      a_subjects: [],
      a_grades: [],
      selected_alevel_subjects: [],
    }
  },
  mounted() {
    this.fetchSubjects()
  },
  methods: {
    addOSubject() {
      const sub = this.o_subjects.find(x => x.id === this.subject_id)
      const exists = this.selected_olevel_subjects.find(x => x.subject_id === this.subject_id)
      if (exists) {
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
    removeSubject() {

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
