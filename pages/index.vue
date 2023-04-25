<template>
  <b-container fluid="md">
    <section class="title my-5 text-center">
      <h4>TaskList Demo</h4>
    </section>

    <section class="user-input mb-5">
      <b-form inline @submit.prevent="addTask" class="d-flex justify-content-center">
        <b-form-input
          class="mb-3 mr-sm-3 mb-sm-0"
          v-model="task.title"
          placeholder="Task title"
        />

        <b-form-datepicker class="mb-3 mr-sm-3 mb-sm-0" v-model="task.dueDate" />

        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </section>

    <section class="task-list-card d-flex justify-content-center">
      <TaskListCard
        v-if="showList"
        :task-list="taskList"
        @deleteTask="deleteTask($event)"
      />
    </section>
  </b-container>
</template>

<script>
export default {
  name: 'TaskListPage',
  data() {
    return {
      showList: false,
      task: {
        title: '',
        dueDate: '',
        done: false,
        createdAt: ''
      },
      taskList: []
    }
  },
  watch: {
    taskList: {
      deep: true,
      handler(newVal) {
        localStorage.setItem('taskList', JSON.stringify(newVal));
      }
    }
  },
  mounted() {
    this.taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    this.showList = true;
  },
  methods: {
    addTask() {
      if (this.task.title.trim() === '' || this.task.dueDate === '') {
        // TODO: show toast message
        return
      }

      this.taskList.push({
        ...this.task,
        createdAt: new Date().getTime()
      })

      this.task.title = '';
      this.task.dueDate = '';
    },
    deleteTask(task) {
      this.taskList = this.taskList.filter(t => t.createdAt !== task.createdAt);
    }
  }
}
</script>
