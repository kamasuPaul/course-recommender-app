<template>
  <v-card
    tile
  >
    <v-card-title>Essential subjects</v-card-title>
    <v-card-text>
      <v-divider class="mx-1"></v-divider>
      <v-list
        v-if="program.essential_relationship== 'and'"
        dense
      >
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
      <v-list
        v-if="program.essential_relationship== 'one'"
        dense
      >
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
      <v-list
        v-if="program.essential_relationship== 'and_or'"
        dense
      >
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
          <span>and one of the following</span>
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
      <v-list
        v-if="program.essential_relationship== 'and/or'"
        dense
      >
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
          <span>and/or</span>
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
      <v-list
        v-if="program.essential_relationship== 'two_best_done'"
        dense
      >
        <span>Two best done of the following:</span>

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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    program: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {

    }
  },

}
</script>

<style>

</style>
