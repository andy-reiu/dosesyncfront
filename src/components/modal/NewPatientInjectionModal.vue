<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Lisa uus patsiendi süstimine</h5>
      </div>
    </template>
    <template #body>
      <form>
        <div class="mb-3">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
          <label class="form-label">Süstimise ID</label>
          <input type="text" class="form-control" :value="patientInjections.acc" readonly/>
        </div>
        <div class="mb-3">
          <label class="form-label"> Patsiendi ID</label>
          <input type="number" class="form-control" v-model="patientInjections.injectionWeight">
        </div>
        <div class="mb-3">
          <label class="form-label"> Patsiendi kaal</label>
          <input type="number" class="form-control" v-model="patientInjections.injectionWeight">
        </div>
        <div class="mb-3">
          <label class="form-label"> MBq/kg</label>
          <input type="number" class="form-control"
                 v-model="patientInjections.injectionMbqKg"
          >
        </div>
        <div class="mb-3">
          <label class="form-label"> Süstimise aeg</label>
          <input type="time" class="form-control" v-model="patientInjections.injectedTime"/>
        </div>
        <div class="mb-3">
          <label class="form-label"> Süsimise aktiivsus (MBq)</label>
          <input type="number" class="form-control" v-model="patientInjections.injectedActivity">
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="" type="button" class="btn btn-outline-success">Lisa uus patsiendi süstimine
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "NewPatientInjectionModal",
  components: {AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean,
    studyId: Number,
    isotopeId: Number,
  },
  data() {
    return {
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
      patientInjections: {
        injectionId: 0,
        acc:'BGSFJKES',
        patientNationalId: '',
        injectionWeight: 0,
        injectionMbqKg: 0,
        injectedTime: '',
        injectedActivity: 0
      },
    }
  },
}
</script>