<template>
  <b-container fluid="md">
    <section class="title my-5 text-center">
      <h4>TaskList Demo</h4>
    </section>

    <section class="user-input mb-3">
      <validation-observer slim ref="user-input-observer">
        <b-form-row inline @submit.prevent="addTask" class="d-flex justify-content-center">
          <b-col md="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              vid="task-title"
            >
              <b-form-input
                class="mb-3 mr-sm-3 mb-sm-0"
                :state="errors.length > 0 ? false : null"
                v-model="task.title"
                placeholder="Task title"
              />
              <FormErrorMessage v-if="errors[0]" :error="errors[0]"/>
            </validation-provider>
          </b-col>

          <b-col md="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              vid="task-dueDate"
            >
              <b-form-datepicker
                class="mb-3 mr-sm-3 mb-sm-0"
                v-model="task.dueDate"
                :state="errors.length > 0 ? false : null"
              />
              <FormErrorMessage v-if="errors[0]" :error="errors[0]"/>
            </validation-provider>
          </b-col>

          <b-col md="auto" class="text-right">
            <b-button
              type="submit"
              variant="primary"
            >
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
        localStorage.setItem('taskList', JSON.stringify(newVal));
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

      this.task.title = '';
      this.task.dueDate = '';
    },
    deleteTask(task) {
      this.taskList = this.taskList.filter(t => t.createdAt !== task.createdAt);
    }
  }
}
</script>

<style>

:root {
  --light: #EEE;
  --dark: #313154;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  --business-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
  --personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}

* {
  font-family: 'montserrat', sans-serif;
}

body {
  background: var(--light);
  color: var(--dark);
}

input {
  box-shadow: var(--shadow);
}
</style>
