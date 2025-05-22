<template>
  <div>
    <CalculationProfileEditModal :modal-is-open="viewModalIsOpen"
                                 :calculation-profile="calculationProfile"
                                 @event-close-modal="closeCalculationProfileEditModal"
                                 :studyId="studyId"
    />
    <table class="table table-dark table table-striped-columns mt-4">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Kalibreerimise aeg (HH:mm)</th>
        <th scope="col">Kalibratsiooni aktiivsus (MBq)</th>
        <th scope="col">Viaali maht (mL)</th>
        <th v-if="isAdmin" scope="col"></th>
        <th v-if="isAdmin" scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(calculationProfile, index) in calculationProfiles" :key="calculationProfile.calculationProfileId">
        <td>{{ index + 1 }}</td>
        <td>{{ calculationProfile.calibrationTime }}</td>
        <td>{{ calculationProfile.calibratedActivity }}</td>
        <td>{{ calculationProfile.fillVolume }}</td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="viewCalculationProfileEditView(calculationProfile.calculationProfileId)">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen-to-square']"/>
          </div>
        </td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="executeDeleteCalculationProfile(calculationProfile.calculationProfileId)">
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
import CalculationProfileEditModal from "@/components/modal/CalculationProfileEditModal.vue";
import CalculationProfileService from "@/services/CalculationProfileService";
import Navigation from "@/navigations/Navigation";

export default {
  name: "CalculationProfile",
  components: {CalculationProfileEditModal, NewStudyModal},
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
                console.log(3232)
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

