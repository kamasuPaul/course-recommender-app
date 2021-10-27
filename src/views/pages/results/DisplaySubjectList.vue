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
            Score
          </th>
          <th class="text-center text-uppercase">
            Subject code
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in selectedSubjects"
          :key="item.id"
        >
          <td>{{ item.subject.name }}</td>
          <td class="text-center">
            {{ item.grade }}
          </td>
          <td class="text-center">
            {{ item.score }}
          </td>
          <td class="text-center">
            {{ item.subject.code }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

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
