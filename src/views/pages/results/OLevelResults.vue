<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
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
          v-for="item in selectedSubjects"
          :key="item.subject_id"
        >
          <td>{{ item.subject_name }}</td>
          <td class="text-center">
            {{ item.grade }}
          </td>
          <td class="text-center">
            {{ item.code }}
          </td>
          <td class="text-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  size="30"
                  v-bind="attrs"
                  @click="removeItem(item.subject_id)"
                  v-on="on"
                >
                  {{ icons.mdiCloseCircleOutline }}
                </v-icon>
              </template>
              <span>Remove subject</span>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mdiCloseCircleOutline } from '@mdi/js'

export default {
  props: {
    selectedSubjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      icons: {
        mdiCloseCircleOutline,
      },
    }
  },
  methods: {
    removeItem(id) {
      this.$emit('removeItem', id)
    },
  },
}
</script>
