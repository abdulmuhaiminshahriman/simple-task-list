<template>
  <b-card no-body class="mb-2 p-0 border-0 card-min-width text-center">
    <b-table
      :current-page="currentPage"
      :fields="fields"
      :items="taskList"
      :per-page="perPage"
      :total-rows="rows"
      borderless
      class="mb-0"
      empty-text="Please enter at least one task"
      theah-class="d-none"
      responsive
      show-empty
      hover
    >
      <template #cell(taskTitle)="rowData">
        <b-card class="card-hover">
          <b-row align-v="center">
            <b-col cols="auto">
              <span class="cursor-pointer btn-status-task" @click="() => { rowData.item.done = !rowData.item.done }">
                <span v-if="rowData.item.done">
                  <i class='bx bx-check-circle done-task'/>
                </span>
                <span v-else>
                  <i class='bx bx-circle undone-task'/>
                </span>
              </span>
            </b-col>

            <b-col>
              <span>
                <b :class="{ 'strikethrough': rowData.item.done }">{{ rowData.item.title }}</b>
                <br>
                <small>{{ rowData.item.dueDate }}</small>
              </span>
            </b-col>

            <b-col cols="auto">
              <span class="cursor-pointer" @click="deleteTask(rowData.item)">
                <i class='bx bx-trash remove-task'/>
              </span>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <b-pagination
      v-if="taskList.length > 5"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="rows"
      align="center"
      class="my-3"
      first-number
      last-number
      limit="3"
      pills
    />
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
      perPage: 5,
      fields: [
        // { key: 'done', label: '', thStyle: { width: '10%'}, tdClass: 'text-center align-middle' },
        { key: 'taskTitle', label: '', tdClass: 'text-left align-middle' },
        // { key: 'action', label: '', thStyle: { width: '10%'}, tdClass: 'text-center align-middle' }
      ],
    }
  },
  computed: {
    rows() {
      return this.taskList.length;
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
.card-hover:hover {
  box-shadow: green;
}
.btn-status-task {
  background: transparent;
  border: none;
}

.undone-task {
  color: orange;
  font-size: 2em;
}

.done-task {
  color: green;
  font-size: 2em;
}

.remove-task {
  color: red;
  font-size: 1.5em;
}

.strikethrough {
  text-decoration: line-through;
  color: grey;
  font-style: italic;
}

.cursor-pointer {
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .card-min-width {
    min-width: 80%;
  }
}

</style>
