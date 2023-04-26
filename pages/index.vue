<template>
  <b-container fluid="md">
    <section class="title my-5 text-center">
      <h4>TaskList Demo</h4>
    </section>

    <section class="user-input mb-5">
      <validation-observer slim ref="user-input-observer">
        <b-form-row inline class="d-flex justify-content-center">
          <b-col md="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              vid="task-title"
            >
              <b-form-input
                class="mr-sm-3 mb-sm-0"
                :class="[ errors[0] ? 'mb-0' : 'mb-3' ]"
                :state="errors.length > 0 ? false : null"
                v-model="task.title"
                placeholder="Task title"
              />
              <FormErrorMessage class="mb-2" v-if="errors[0]" :error="errors[0]"/>
            </validation-provider>
          </b-col>

          <b-col md="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              vid="task-dueDate"
            >
              <b-form-datepicker
                class="mr-sm-3 mb-sm-0"
                :class="[ errors[0] ? 'mb-0' : 'mb-3' ]"
                v-model="task.dueDate"
                :state="errors.length > 0 ? false : null"
              />
              <FormErrorMessage class="mb-2" v-if="errors[0]" :error="errors[0]"/>
            </validation-provider>
          </b-col>

          <b-col md="auto" class="text-right">
            <b-button @click="addTask" variant="primary">
              <i class='bx bx-plus'/>
            </b-button>
          </b-col>
        </b-form-row>
      </validation-observer>
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
import { required } from '../utils/validators';

export default {
  name: 'TaskListPage',
  data() {
    return {
      required,
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
        const sorted = this.sort(newVal);
        localStorage.setItem('taskList', JSON.stringify(sorted));
      }
    }
  },
  mounted() {
    this.taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    this.showList = true;
  },
  methods: {
    async addTask() {
      const isValid = await this.$refs['user-input-observer'].validate();
      if (!isValid) return;

      this.taskList.push({
        ...this.task,
        createdAt: new Date().getTime()
      })

      this.taskList = this.sort(this.taskList);

      this.task.title = '';
      this.task.dueDate = '';

      // reset form validation
      this.$refs['user-input-observer'].reset();
    },
    deleteTask(task) {
      this.taskList = this.taskList.filter(t => t.createdAt !== task.createdAt);
    },
    sort(taskList) {
      return [...taskList].sort((a, b) => b.createdAt - a.createdAt);
    },
  }
}
</script>

<style>

:root {
  --light: #EEE;
  --dark: #313154;
}

body {
  background: var(--light);
  color: var(--dark);
}

</style>
