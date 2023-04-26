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
          <div class="d-flex flex-row justify-content-between w-100">
            <div class="d-flex align-items-center cursor-pointer btn-status-task mr-4" @click="() => { rowData.item.done = !rowData.item.done }">
                <span v-if="rowData.item.done">
                  <i class='bx bx-check-circle done-task hover-bigger'/>
                </span>
                <span v-else>
                  <i class='bx bx-circle undone-task hover-bigger'/>
                </span>
              </div>

            <div class="d-flex flex-column flex-wrap mr-auto">
              <span class="m-0 p-0 font-weight-bold" :class="{ 'strikethrough': rowData.item.done }">
                {{ rowData.item.title }}
              </span>
              <small>{{ rowData.item.dueDate }}</small>
            </div>

            <div class="d-flex align-items-center cursor-pointer ml-4" @click="deleteTask(rowData.item)">
              <i class='bx bx-trash remove-task hover-bigger'/>
            </div>
          </div>
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
      fields: [{ key: 'taskTitle', label: '', tdClass: 'text-left align-middle text-wrap' }],
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
  transform: scale(1.2);
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
