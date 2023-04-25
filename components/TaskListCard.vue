<template>
  <b-card no-body class="mb-2 p-0 border-0 card-min-width text-center bg-transparent">
    <b-table
      :current-page="currentPage"
      :sort-by="'taskTitle'"
      :fields="fields"
      :items="taskList"
      :per-page="perPage"
      :total-rows="rows"
      borderless
      class="mb-0"
      empty-text="Please enter at least one task"
      thead-class="d-none"
      responsive
      small
      show-empty
    >
      <template #cell(taskTitle)="rowData">
        <b-card class="card-hover">
          <b-row align-v="center">
            <b-col cols="auto">
              <span class="cursor-pointer btn-status-task" @click="() => { rowData.item.done = !rowData.item.done }">
                <span v-if="rowData.item.done">
                  <i class='bx bx-check-circle done-task hover-bigger'/>
                </span>
                <span v-else>
                  <i class='bx bx-circle undone-task hover-bigger'/>
                </span>
              </span>
            </b-col>

            <b-col>
              <p class="mb-0 pb-0">
                <b :class="{ 'strikethrough': rowData.item.done }">{{ rowData.item.title }}</b>
              </p>
              <small>{{ rowData.item.dueDate }}</small>
            </b-col>

            <b-col cols="auto">
              <span class="cursor-pointer" @click="deleteTask(rowData.item)">
                <i class='bx bx-trash remove-task hover-bigger'/>
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
        { key: 'taskTitle', label: '', tdClass: 'text-left align-middle text-nowrap' },
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
  transition: transform 1s ease-out;
}

.done-task {
  color: #28a745;
  font-size: 2em;
  transition: transform 1s ease-out;
}

.hover-bigger:hover {
  transform: scale(1.1);
}

.remove-task {
  color: red;
  font-size: 1.5em;
  transition: transform 1s ease-out;
}

.strikethrough {
  text-decoration: line-through;
  color: grey;
  font-style: italic;
}

.cursor-pointer {
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .card-min-width {
    min-width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .card-min-width {
    min-width: 80%;
  }
}

</style>
