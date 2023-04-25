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
          <b-button class="btn-status-task" @click="() => { rowData.item.done = !rowData.item.done }">
            <i class='bx bx-check-circle done-task'/>
          </b-button>
        </div>
        <div v-else>
          <b-button class="btn-status-task" @click="() => { rowData.item.done = !rowData.item.done }">
            <i class='bx bx-circle undone-task'/>
          </b-button>
        </div>
      </template>

      <!-- Column: Task Title -->
      <template #cell(taskTitle)="rowData">
        <b :class="{ 'strikethrough': rowData.item.done }">{{ rowData.item.title }}</b>
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
    },
    onChangeStatus() {
      console.log('on change status')
    }
  }
}
</script>

<style scoped>
.btn-status-task {
  background: transparent;
  border: none;
}

.btn-status-task.btn:focus,
.btn-status-task.btn:active:focus,
.btn-status-task.btn-secondary:focus,
.btn-status-task.btn-secondary:active:focus {
  box-shadow: none;
}

.undone-task {
  color: yellow;
  font-size: 2em;
}

.done-task {
  color: green;
  font-size: 2em;
}

.strikethrough {
  text-decoration: line-through;
  color: grey;
  font-style: italic;
}

</style>
