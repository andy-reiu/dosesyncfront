<template>
  <div>
    <select :value="selectedIsotopeId" @change="handleIsotopeDropdownChange" class="form-select">
      <option value=0>Kõik isotoobid</option>
      <option v-for="isotope in isotopes" :key="isotope.isotopeId" :value="isotope.isotopeId">
        {{ isotope.isotopeName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "IsotopeDropdown",
  props: {
    isotopes: {
      type: Array,
    },
    selectedIsotopeId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleIsotopeDropdownChange(event) {
      this.$emit('event-new-isotope-selected', Number(event.target.value))
    }
  }
}
</script>