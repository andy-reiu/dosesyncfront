<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Muuda patsiendi süstimist</h5>
      </div>
    </template>
    <template #body>
      <form>
        <div class="mb-3">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
          <label class="form-label">Süstimise ACC</label>
          <input type="text" class="form-control" v-model="patientInjection.acc" />

          <label class="form-label mt-3">Patsiendi ID</label>
          <input type="text" class="form-control" v-model="patientInjection.patientNationalId" />

          <label class="form-label mt-3">Patsiendi kaal (kg)</label>
          <input type="number" class="form-control" v-model="patientInjection.injectionWeight" />

          <label class="form-label mt-3">MBq/kg</label>
          <input type="number" class="form-control" v-model="patientInjection.injectionMbqKg" />

          <label class="form-label mt-3">Süstimise aeg</label>
          <input type="time" class="form-control" v-model="patientInjection.injectedTime" />

          <label class="form-label mt-3">Süstimise aktiivsus (MBq)</label>
          <input type="number" class="form-control" v-model="patientInjection.injectedActivity" />
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="executeUpdatePatientInjection" type="button" class="btn btn-outline-success">
        Salvesta muudatus
      </button>
    </template>
  </Modal>
</template>
<script>

import Navigation from "@/navigations/Navigation";
import PatientInjectionService from "@/services/PatientInjectionService";
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "PatientInjectionEditModal",
  components: { Modal, AlertDanger },
  props: {
    modalIsOpen: Boolean,
    studyId: Number,
    patientInjection: Object,
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  methods: {
    executeUpdatePatientInjection() {
      PatientInjectionService.sendPutPatientInjectionRequest(this.studyId, this.patientInjection)
          .then(() => {
            this.$emit('event-close-modal');
          })
          .catch(() => Navigation.navigateToErrorView());
    }
  }
};
</script>