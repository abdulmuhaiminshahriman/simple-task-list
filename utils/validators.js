import { extend } from 'vee-validate'
import { required as ruleRequired } from 'vee-validate/dist/rules.umd.js'


export const required = extend('required', {
  ...ruleRequired,
  message: 'This field is required'
})
