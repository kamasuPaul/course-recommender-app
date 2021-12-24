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
                      <v-list-item-subtitle>
                        {{ program.campus.name}}
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
              justify="start"
            >
              <v-col>
                <v-card
                  max-width="300"
                  tile
                >
                  <v-list dense>
                    <v-subheader>Required subjects</v-subheader>
                    <v-list-item-group
                      color="primary"
                    >
                      <v-list-item
                        v-for="(item, i) in program.essential_required"
                        :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
              <v-col>
                <v-card
                  max-width="300"
                  tile
                >
                  <v-list dense>
                    <v-subheader>Relevant subjects</v-subheader>
                    <v-list-item-group
                      color="primary"
                    >
                      <v-list-item
                        v-for="(item, i) in program.essential_optional"
                        :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
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
export default {
  data() {
    return {
      programId: this.$route.params.id,
      program: {},
      loading: true,
    }
  },
  created() {
    this.fetchProgram()
    console.log(this.$route.params.id)
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
  },

}
</script>
<style>
</style>
