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
          <input type="number" class="form-control" :value="patientInjection.patientNationalId"
                 @input="$emit('event-update-patient-id', Number($event.target.value))"
          >
        </div>
        <div class="mb-3">
          <label class="form-label"> Patsiendi kaal</label>
          <input type="number" class="form-control" :value="patientInjection.injectionWeight"
                 @input="$emit('event-update-patient-weight', Number($event.target.value))"
          >
        </div>
        <div class="mb-3">
          <label class="form-label"> MBq/kg</label>
          <input type="number" class="form-control" :value="patientInjection.injectionMbqKg"
                 @input="$emit('event-update-injection-mbq-kg', Number($event.target.value))"          >
        </div>
        <div class="mb-3">
          <label class="form-label"> Süstimise aeg</label>
          <input type="time" class="form-control" :value="patientInjection.injectedTime"
                 @input="$emit('event-update-injected-time', $event.target.value)"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"> Süsimise aktiivsus (MBq)</label>
          <input type="number" class="form-control" :value="patientInjection.injectedActivity" readonly
                 @input="$emit('event-update-injected-activity', $event.target.value)"
          >
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="executeAddNewPatientInjection" type="button" class="btn btn-outline-success">Lisa uus patsiendi
        süstimine
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Navigation from "@/navigations/Navigation";
import PatientInjectionService from "@/services/PatientInjectionService";

export default {
  name: "NewPatientInjectionModal",
  components: {AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean,
    studyId: Number,
    isotopeId: Number,
    patientInjection: Object
  },
  data() {
    return {
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },

  watch: {
    'patientInjection.injectionWeight': 'updateInjectedActivity',
    'patientInjection.injectionMbqKg': 'updateInjectedActivity',
  },

  methods: {
    executeAddNewPatientInjection() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.patientInjection.studyId = this.studyId;
        PatientInjectionService.sendPostPatientInjectionRequest(this.isotopeId, this.patientInjection)
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
          this.patientInjection.injectedTime !== ''
    },

    handleAddNewCalculationProfile() {
      this.$emit('event-new-patient-injection-made')
    },

    updateInjectedActivity() {
      const weight = parseFloat(this.patientInjection.injectionWeight);
      const mbqKg = parseFloat(this.patientInjection.injectionMbqKg);

      if (!isNaN(weight) && !isNaN(mbqKg)) {
        this.patientInjection.injectedActivity = +(weight * mbqKg).toFixed(2);
      } else {
        this.patientInjection.injectedActivity = 0;
      }
    },

    resetErrorMessage() {
      this.errorMessage = ''
    }
  },

}
</script>