<template>
  <small class="d-block form-error-message text-danger">{{ error }}</small>
</template>
<script>
export default {
  name: 'FormErrorMessage',
  props: {
    error: {
      type: String,
      default: ''
    },
  },
};
</script>
