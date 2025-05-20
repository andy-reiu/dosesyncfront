<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Uuringu kogu aktiivsus (MBq)</span>
    <input type="number" class="form-control"
           :value="studiesTotalActivity"
           @input="$emit('event-update-studies-total-activity', Number($event.target.value))"
    >
  </div>
</template>
<script>
export default {
  name: "StudiesTotalActivity",
  props: {
    studiesTotalActivity: Number
  }
}
</script>

