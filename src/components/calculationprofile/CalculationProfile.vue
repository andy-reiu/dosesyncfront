<template>
  <div>
    <CalculationProfileEditModal :modal-is-open="viewModalIsOpen"
                                 :calculation-profile="calculationProfile"
                                 @event-close-modal="closeCalculationProfileEditModal"
                                 :studyId="studyId"
    />
    <div>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Kalibreerimise aeg (HH:mm)</th>
          <th>Kalibratsiooni aktiivsus (MBq)</th>
          <th>Viaali maht (mL)</th>
          <th v-if="isAdmin"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(calculationProfile, index) in calculationProfiles" :key="calculationProfile.calculationProfileId">
          <td>{{ index + 1 }}</td>
          <td>{{ calculationProfile.calibrationTime }}</td>
          <td>{{ calculationProfile.calibratedActivity }}</td>
          <td>{{ calculationProfile.fillVolume }}</td>
          <td v-if="isAdmin">
            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"
                @click="viewCalculationProfileEditView(calculationProfile.calculationProfileId)"
            />
            <font-awesome-icon
                icon="trash"
                class="text-danger"
                role="button"
                @click="executeDeleteCalculationProfile(calculationProfile.calculationProfileId)"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import NewStudyModal from "@/components/modal/NewStudyModal.vue";
import RoleService from "@/services/RoleService";
import CalculationProfileEditModal from "@/components/modal/CalculationProfileEditModal.vue";
import CalculationProfileService from "@/services/CalculationProfileService";
import Navigation from "@/navigations/Navigation";
import AddIsotopeModal from "@/components/modal/AddIsotopeModal.vue";

export default {
  name: "CalculationProfile",
  components: {AddIsotopeModal, CalculationProfileEditModal, NewStudyModal},
  props: {
    calculationProfiles: {
      type: Array
    },
    studyId: Number,
  },
  data() {
    return {
      isAdmin: false,
      viewModalIsOpen: false,
      calculationProfileId: 0,

      calculationProfile: [
        {
          calculationProfileId: 0,
          calibratedActivity: 0,
          calibrationTime: '',
          fillVolume: 0
        }
      ],
    }
  },

  methods: {
    viewCalculationProfileEditView(calculationProfileId) {
      for (let i = 0; i < this.calculationProfiles.length; i++) {
        const calculationProfile = this.calculationProfiles[i];
        if (calculationProfile.calculationProfileId === calculationProfileId) {
          this.calculationProfile = {...calculationProfile};
          this.openCalculationProfileEditModal();
          break;
        }
      }
    },


    executeDeleteCalculationProfile(calculationProfileId) {
      CalculationProfileService.sendDeleteCalculationProfileRequest(calculationProfileId)
          .then(value => {
                this.$emit('event-update-calculation-profile')
              }
          )
          .catch(reason => Navigation.navigateToErrorView())
    },


    openCalculationProfileEditModal() {
      this.viewModalIsOpen = true;
    },

    closeCalculationProfileEditModal() {
      this.viewModalIsOpen = false;
      this.$emit('event-update-calculation-profile');
    },
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

