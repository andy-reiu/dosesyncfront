<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Lisa uus kalkulatsioon</h5>
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
      <button @click="executeUpdateCalculationProfile" type="button" class="btn btn-outline-success">Salvesta muudatus
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Navigation from "@/navigations/Navigation";
import CalculationProfileService from "@/services/CalculationProfileService";

export default {
  name: "CalculationProfileEditModal",
  components: {AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean,
    studyId: Number,
    calculationProfile: Object
  },
  data(){
    return{
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },

  methods:{
    executeUpdateCalculationProfile(){
      CalculationProfileService.sendPutCalculationProfileRequest(this.studyId, this.calculationProfile)
          .then(value => {
            this.$emit('event-close-modal');
          })
          .catch(() => Navigation.navigateToErrorView())
    },

  }
}
</script>