<template>
  <div>
    <PatientInjectionEditModal
        :modal-is-open="viewModalIsOpen"
        :patient-injection="patientInjection"
        @event-close-modal="closePatientInjectionEditModal"
        :studyId="studyId"
    />
    <ConfirmDeleteModal
        :show="viewDeleteModalIsOpen"
        :item-name="patientInjectionToDelete?.acc || 'selle süsti'"
        @confirm="confirmDeletePatientInjection"
        @cancel="viewDeleteModalIsOpen = false"
    />

    <table class="table table-hover table-light table-striped-columns">
      <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Süstimise ACC</th>
        <th>Patsiendi ID</th>
        <th>Patsiendi kaal</th>
        <th>MBq/kg</th>
        <th>Süstimise aeg</th>
        <th>Süstimise aktiivsus</th>
        <th v-if="isAdmin"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(patientInjection, index) in patientInjections" :key="patientInjection.injectionId">
        <td>{{ index + 1 }}</td>
        <td>{{ patientInjection.acc }}</td>
        <td>{{ patientInjection.patientNationalId }}</td>
        <td>{{ patientInjection.injectionWeight }}</td>
        <td>{{ patientInjection.injectionMbqKg }}</td>
        <td>{{ patientInjection.injectedTime }}</td>
        <td>{{ patientInjection.injectedActivity }}</td>
        <td v-if="isAdmin">
          <div class="no-print">
            <font-awesome-icon icon="pen-to-square" class="text-warning me-2" role="button"
                               @click="viewPatientInjectionEditView(patientInjection.injectionId)"
            />
            <font-awesome-icon icon="trash" class="text-danger" role="button"
                               @click="deletePatientInjection(patientInjection.injectionId)"
            />
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
import CalculationProfileEditModal from "@/components/modal/CalculationProfileEditModal.vue";
import PatientInjectionService from "@/services/PatientInjectionService";
import PatientInjectionEditModal from "@/components/modal/PatientInjectionEditModal.vue";
import Navigation from "@/navigations/Navigation";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal.vue";

export default {
  name: "PatientInjection",
  components: {ConfirmDeleteModal, PatientInjectionEditModal, CalculationProfileEditModal, NewStudyModal},
  props: {
    studyId: Number,
    patientInjections: {
      type: Array
    },
  },
  data() {
    return {
      newCalculationProfileIsOpen: false,
      isAdmin: false,
      viewModalIsOpen: false,
      viewDeleteModalIsOpen: false,
      patientInjectionToDelete: null,
      patientInjection: [
        {
          studyId: this.studyId,
          injectionId: 0,
          acc: '',
          patientNationalId: '',
          injectionWeight: 0,
          injectionMbqKg: 0,
          injectedTime: '',
          injectedActivity: 0
        }
      ],
    }
  },

  methods: {

    viewPatientInjectionEditView(injectionId) {
      for (let i = 0; i < this.patientInjections.length; i++) {
        const injection = this.patientInjections[i];
        if (injection.injectionId === injectionId) {
          this.patientInjection = {...injection};
          this.viewModalIsOpen = true;
          break;
        }
      }
    },

    deletePatientInjection(injectionId) {
      for (let i = 0; i < this.patientInjections.length; i++) {
        const injection = this.patientInjections[i];
        if (injection.injectionId === injectionId) {
          this.patientInjectionToDelete = injection;
          this.viewDeleteModalIsOpen = true;
          break;
        }
      }
    },

    confirmDeletePatientInjection() {
      PatientInjectionService.sendDeletePatientInjectionRequest(this.patientInjectionToDelete.injectionId)
          .then(() => this.handleSendDeletePatientInjectionResponse())
          .catch(() => Navigation.navigateToErrorView());
    },

    handleSendDeletePatientInjectionResponse() {
      this.$emit('event-update-patient-injections');
      this.viewDeleteModalIsOpen = false;
      this.patientInjectionToDelete = null;
    },

    closePatientInjectionEditModal() {
      this.viewModalIsOpen = false;
      this.$emit('event-update-patient-injections');
    },
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>