<template>
  <small class="d-block form-error-message">{{ error }}</small>
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
