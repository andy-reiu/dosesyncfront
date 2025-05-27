
<template>
  <div>
    <select :value="selectedRoleId" @change="handleRoleDropdownChange" class="form-select">
      <option selected value="0">Please select one</option>
      <option
          v-for="role in roles"
          :key="role.roleId"
          :value="role.roleId"
      >
        {{ role.roleName }}
      </option>
    </select>
  </div>
</template>


<script>
export default {
  name: "RoleDropdown",
  props: {
    roles:{
      type: Array,
          },
    selectedRoleId: {
      type: Number,
      default: 0
    }
  },

  methods: {
    handleRoleDropdownChange(event) {
      this.$emit('event-new-role-selected',Number(event.target.value))
    }
  }

}
</script>

