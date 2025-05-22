<template>
  <div>
    <table class="table table-dark table table-striped-columns mt-4">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Süstimise ID</th>
        <th scope="col">Patsiendi ID</th>
        <th scope="col">Patsiendi kaal</th>
        <th scope="col">MBq/kg</th>
        <th scope="col">Süstimise aeg</th>
        <th scope="col">Süstimise aktiivsus</th>
        <th v-if="isAdmin" scope="col"></th>
        <th v-if="isAdmin" scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(patientInjection, index) in patientInjections" :key="patientInjection.injectionId">
        <td>{{ index + 1 }}</td>
        <td>{{ patientInjection.acc}}</td>
        <td>{{ patientInjection.patientNationalId }}</td>
        <td>{{ patientInjection.injectionWeight }}</td>
        <td>{{ patientInjection.injectionMbqKg }}</td>
        <td>{{ patientInjection.injectedTime }}</td>
        <td>{{ patientInjection.injectedActivity }}</td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="viewPatientInjectionEditView(patientInjection.injectionId)">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen-to-square']"/>
          </div>
        </td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="deletePatientInjection(patientInjection.injectionId)">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'trash']"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import NewStudyModal from "@/components/modal/NewStudyModal.vue";
import RoleService from "@/services/RoleService";

export default {
  name: "PatientInjection",
  components: {NewStudyModal},
  props: {
    patientInjections: {
      type: Array
    },
  },
  data() {
    return {
      newCalculationProfileIsOpen: false,
      isAdmin: false,
      patientInjection: [
        {
          injectionId: 0,
          acc:'',
          patientNationalId: '',
          injectionWeight: 0,
          injectionMbqKg: 0,
          injectedTime: '',
          injectedActivity: 0
        }
      ],
    }
  },

  methods: {},

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>