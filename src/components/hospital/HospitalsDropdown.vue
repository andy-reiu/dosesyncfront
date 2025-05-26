<template>
  <div>
    <select :value="selectedHospitalId" @change="handleHospitalDropdownChange" class="form-select">
      <option selected value="0">Please select one</option>
      <option
          v-for="hospital in hospitals"
          :key="hospital.hospitalId"
          :value="hospital.hospitalId"
      >
        {{ hospital.hospitalName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'HospitalsDropdown',
  props: {
    hospitals: {
      type: Array,
    },
    selectedHospitalId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleHospitalDropdownChange(event) {
      this.$emit('event-new-hospital-selected', Number(event.target.value))
    }
  }
}
</script>
