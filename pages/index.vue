<template>
  <b-container fluid="md">
    <section class="title my-5 text-center">
      <h4>TaskList Demo</h4>
    </section>

    <section class="user-input mb-3">
      <validation-observer ref="user-input-observer">
        <b-form inline @submit.prevent="addTask" class="d-flex justify-content-center">
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
            {{ errors[0] }}
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required"
            vid="task-dueDate"
          >
            <b-form-datepicker class="mb-3 mr-sm-3 mb-sm-0" v-model="task.dueDate"/>
            {{ errors[0] }}
          </validation-provider>

          <b-button
            type="submit"
            variant="primary"
            v-b-tooltip.hover title="Fill up required fields first"
          >
            <i class='bx bx-plus'/>
          </b-button>
        </b-form>
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
