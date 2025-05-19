<template>
  <div>
    <select :value="selectedMachineId" @change="handleMachineDropdownChange" class="form-select">
      <option value=0>Kõik masinad</option>
      <option v-for="machine in machines" :key="machine.machineId" :value="machine.machineId">
        {{ machine.machineName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MachineDropdown",
  props: {
    machines: {
      type: Array,
    },
    selectedMachineId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleMachineDropdownChange(event) {
      this.$emit('event-new-machine-selected', Number(event.target.value))
    }
  }
}
</script>
