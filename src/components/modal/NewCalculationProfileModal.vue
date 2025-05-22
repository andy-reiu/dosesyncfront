<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Lisa uus kalkulatsiooni profiil</h5>
      </div>
    </template>
    <template #body>
      <form>
        <div class="mb-3">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
          <label class="form-label"> Kalibreerimise aeg</label>
          <input type="time" class="form-control" v-model="calculationProfile.calibrationTime"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"> Kalibratsiooni aktiivsus (MBq)</label>
          <input type="number" class="form-control"
                 v-model="calculationProfile.calibratedActivity"
          >
        </div>
        <div class="mb-3">
          <label class="form-label"> Viaali maht (mL)</label>
          <input type="number" class="form-control"
                 v-model="calculationProfile.fillVolume"
          >
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="executeAddNewCalculationProfile" type="button" class="btn btn-outline-success">Lisa uus profiil
      </button>
    </template>
  </Modal>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Modal from "@/components/modal/Modal.vue";
import IsotopeDropdown from "@/components/isotope/IsotopeDropdown.vue";
import MachineDropdown from "@/components/machine/MachineDropdown.vue";
import CalculationProfileService from "@/services/CalculationProfileService";
import Navigation from "@/navigations/Navigation";
import calculationProfile from "@/components/calculationprofile/CalculationProfile.vue";

export default {
  name: "NewCalculationProfileModal",
  components: {MachineDropdown, IsotopeDropdown, Modal, AlertDanger},
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
      calculationProfile: {
        calculationProfileId: 0,
        calibratedActivity: 0,
        calibrationTime: '',
        fillVolume: 0
      }
    }
  },

  methods: {

    executeAddNewCalculationProfile() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.calculationProfile.studyId = this.studyId
        this.calculationProfile.isotopeId = this.isotopeId
        CalculationProfileService.sendPostCalculationProfileRequest(this.calculationProfile)
            .then(value => this.handleAddNewCalculationProfile(value))
            .catch(reason => Navigation.navigateToErrorView())
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
      }
    },

    allFieldsAreWithCorrectInput() {
      return this.calculationProfile.calibrationTime !== 0 &&
          this.calculationProfile.calibratedActivity !== 0 &&
          this.calculationProfile.fillVolume !== 0
    },

    handleAddNewCalculationProfile(value) {
      this.$emit('event-new-calculation-profile-made')
      return value;
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
  }
}
</script>

