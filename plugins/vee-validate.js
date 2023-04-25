import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);
