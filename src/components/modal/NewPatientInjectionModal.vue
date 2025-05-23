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
          <label class="form-label">Süstimise ACC</label>
          <input type="text" class="form-control" :value="patientInjection.acc" readonly/>
        </div>
        <div class="mb-3">
          <label class="form-label"> Patsiendi ID</label>
          <input type="number" class="form-control" v-model="patientInjection.patientNationalId">
        </div>
        <div class="mb-3">
          <label class="form-label"> Patsiendi kaal</label>
          <input type="number" class="form-control" v-model="patientInjection.injectionWeight">
        </div>
        <div class="mb-3">
          <label class="form-label"> MBq/kg</label>
          <input type="number" class="form-control" v-model="patientInjection.injectionMbqKg"
          >
        </div>
        <div class="mb-3">
          <label class="form-label"> Süstimise aeg</label>
          <input type="time" class="form-control" v-model="patientInjection.injectedTime"/>
        </div>
        <div class="mb-3">
          <label class="form-label"> Süsimise aktiivsus (MBq)</label>
          <input type="number" class="form-control" v-model="patientInjection.injectedActivity">
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="executeAddNewPatientInjection" type="button" class="btn btn-outline-success">Lisa uus patsiendi süstimine
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import CalculationProfileService from "@/services/CalculationProfileService";
import Navigation from "@/navigations/Navigation";
import PatientInjectionService from "@/services/PatientInjectionService";

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
      patientInjection: {
        studyId: 0,
        acc:'Patsient 1',
        patientNationalId: '33399966631',
        injectionWeight: 70,
        injectionMbqKg: 2.5,
        injectedTime: '10:30',
        injectedActivity: 175
      },
    }
  },
  methods: {
    executeAddNewPatientInjection() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.patientInjection.studyId = this.studyId;
        PatientInjectionService.sendPostPatientInjectionRequest(this.patientInjection)
            .then(value => this.handleAddNewCalculationProfile())
            .catch(reason => Navigation.navigateToErrorView())
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
      }
    },

    allFieldsAreWithCorrectInput() {
      return this.patientInjection.injectionWeight !== 0 &&
          this.patientInjection.injectionMbqKg !== 0 &&
          this.patientInjection.injectedTime !== '' &&
          this.patientInjection.injectedActivity !== 0
    },

    handleAddNewCalculationProfile() {
      this.$emit('event-new-patient-injection-made')
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
  }
}
</script>