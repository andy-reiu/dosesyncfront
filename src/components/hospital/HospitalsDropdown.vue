<template>
  <div>
    <select :value="selectedHospitalId" @change="handleHospitalDropdownChange" :class="$attrs.class" class="form-select w-100">
      <option disabled value="">Vali haigla</option>
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
    },
    inheritAttrs: false,
  },
  methods: {
    handleHospitalDropdownChange(event) {
      this.$emit('event-new-hospital-selected', Number(event.target.value))
    }
  }
}
</script>
