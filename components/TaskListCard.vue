<template>
  <b-card class="mb-2 p-0">
    <b-table
      hover
      borderless
      :fields="fields"
      :items="taskList"
      :per-page="perPage"
      :current-page="currentPage"
      small
      show-empty
      responsive
      striped
      outlined
    >
      <!-- Column: Task Status -->
      <template #cell(done)="rowData">
        <div v-if="rowData.item.done">
          yes it's done
        </div>
        <div v-else>
          noope, undone
        </div>
      </template>

      <!-- Column: Task Title -->
      <template #cell(taskTitle)="rowData">
        <b>{{ rowData.item.title }}</b>
        <br>
        <small>{{ rowData.item.dueDate }}</small>
      </template>

      <!-- Column: Delete Action -->
      <template #cell(action)="rowData">
        <b-button size="sm" @click="deleteTask(rowData.item)">Delete</b-button>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0"
    ></b-pagination>
  </b-card>
</template>

<script>
export default {
  name: 'TaskListCard',
  props: {
    taskList: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      currentPage: 1,
      rows: 0,
      perPage: 5,
      fields: [
        { key: 'done', label: '' },
        { key: 'taskTitle', label: '' },
        { key: 'action', label: '', thStyle: { width: '10%'} }
      ],
    }
  },
  methods: {
    deleteTask(task) {
      this.$emit('deleteTask', task);
    }
  }
}
</script>

<style scoped>

</style>
