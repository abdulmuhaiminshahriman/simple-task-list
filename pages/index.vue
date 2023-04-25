<template>
  <main class="app">
    <section class="title">
      <h4>TaskList Demo</h4>
    </section>

    <section class="user-input">
      <b-form @submit="onSubmit">
        <b-form-input
          v-model="task.taskTitle"
          placeholder="Task title"
        />

        <b-form-datepicker v-model="task.dueDate" />

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </section>

    <section class="task-list-card">
      <TaskListCard :task-list="taskList"/>
    </section>
  </main>
</template>

<script>
export default {
  name: 'TaskListPage',
  data() {
    return {
      task: {
        taskTitle: '',
        dueDate: '',
        createdAt: ''
      },
      taskList: [
        {
          taskTitle: 'Test',
          dueDate: '2022-02-02',
          createdAt: new Date()
        }
      ]
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>
