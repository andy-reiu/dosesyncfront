<template>
  <div v-if="errorMessage.length > 0" class="alert alert-danger mb-3" role="alert">
    {{ errorMessage }}
  </div>
</template>
<script>
export default {
  name: "AlertDanger",
  // props on read only, siin ei saa enam muuta, kui tahad midagi üleval muuta, siis $emit
  props: {
    errorMessage: String
  }
}
</script>

