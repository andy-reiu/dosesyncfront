<template>
  <div>
    <table class="table table-dark table table-striped-columns mt-4">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Kalibreerimise aeg (HH:mm)</th>
        <th scope="col">Kalibratsiooni aktiivsus (MBq)</th>
        <th scope="col">Viaali maht (mL)</th>
        <th v-if="isAdmin" scope="col">Muuda</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(calculationProfile, index) in calculationProfiles" :key="calculationProfile.calculationProfileId">
        <td>{{ index + 1 }}</td>
        <td>{{ calculationProfile.calibrationTime }}</td>
        <td>{{ calculationProfile.activityBeforeFirst }}</td>
        <td>{{ calculationProfile.fillVolume }}</td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="viewCalculationProfileEditView(calculationProfile.calculationProfileId)">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen-to-square']"/>
          </div>
          <div class="icon-cell" @click="deleteCalculationProfile(calculationProfile.calculationProfileId)">
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
  name: "CalculationProfile",
  components: {NewStudyModal},
  props: {
    calculationProfiles: {
      type: Array
    },
  },
  data() {
    return {
      isAdmin: false,
      calculationProfile: [
        {
          calculationProfileId: 0,
          isotopeId: 0,
          calibratedActivity: 0,
          calibrationTime: '',
          administrationTime: '',
          activityBeforeFirst: '',
          fillVolume: 0
        }
      ],
    }
  },

  methods: {

  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

