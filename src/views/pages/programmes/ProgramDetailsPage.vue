<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <v-card>
          <v-card-title>
            {{ program.name }}
          </v-card-title>
          <v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Code
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ program.alias_code }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Campus
                      </v-list-item-title>
                      <v-list-item-subtitle v-if="program.campus">
                        {{ program.campus.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Tuition Fees
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ program.tuition_fees }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Duration
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ program.years }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Study time
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ program.type }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <v-row
              v-if="program.essential_required||program.essential_optional"
              justify="start"
            >
              <v-col
                md="4"
              >
                <EssentialSubjects :program="program"></EssentialSubjects>
              </v-col>
              <v-col
                v-if="program.essential_optional.length > 0"
                md="4"
              >
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-card
                  tile
                >
                  <v-data-table
                    :headers="headers"
                    :items="cuttoffPoints"
                    item-key="id"
                    class="table-rounded"
                    :loading="loading"
                    disable-sort
                  ></v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import EssentialSubjects from './subjects/EssentialSubjects.vue'

export default {
  components: {
    EssentialSubjects,
  },
  data() {
    return {
      headers: [
        { text: 'Year', value: 'year' },
        { text: 'Scheme', value: 'scheme' },
        { text: 'Intake Year', value: 'intake_name' },
        { text: 'Male points', value: 'male_points' },
        { text: 'Female points', value: 'female_points' },
        { text: 'Average', value: 'average_points' },
      ],
      programId: this.$route.params.id,
      program: {},
      loading: true,
      cuttoffPoints: [],
    }
  },
  created() {
    this.fetchProgram()
    console.log(this.$route.params.id)
    this.fetchCuttoffPoints()
  },
  methods: {
    fetchProgram() {
      this.loading = true
      this.$http
        .get(`/courses/${this.programId}`)
        .then(res => {
          this.program = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    /* fetch cuttoff points for this course */
    fetchCuttoffPoints() {
      this.loading = true
      this.$http
        .get(`/points?filter[course_id]=${this.programId}`)
        .then(res => {
          this.cuttoffPoints = res.data.data
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
