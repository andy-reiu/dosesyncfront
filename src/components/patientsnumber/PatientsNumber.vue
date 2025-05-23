<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Patsientide arv</span>
    <input type="number" class="form-control"
           :value="numberOfPatiens"
           @input="$emit('event-update-patients-number', Number($event.target.value))"
    >
  </div>
</template>
<script>
export default {
  name: "PatientsNumber",
  props: {
    numberOfPatiens: Number
  }
}
</script>


