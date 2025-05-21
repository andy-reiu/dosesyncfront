<template>
  <div>
    <div>

    </div>
    <table class="table table-dark table table-striped-columns mt-4">
      <thead>
      <tr>
        <th scope="col">Kuupäev</th>
        <th scope="col">Isotoop</th>
        <th scope="col">Patsientide arv</th>
        <th scope="col">Uuringute alguse aeg</th>
        <th scope="col">Uuringute lõpu aeg</th>
        <th scope="col">Kalibratsiooni aktiivsus (MBq)</th>
        <th scope="col">Loputusmahl (mL)</th>
        <th scope="col">Jääk aktiivsus (MBq)</th>
        <th scope="col">Uuringu kommentaar</th>
        <th scope="col">Vaata</th>
        <th v-if="isAdmin" scope="col"> Muuda</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="study in studies" :key="study.studyId">
        <td>{{ study.studyDate }}</td>
        <td>{{ study.isotopeName }}</td>
        <td>{{ study.studyNrPatients }}</td>
        <td>{{ study.studyStartTime }}</td>
        <td>{{ study.studyEndTime }}</td>
        <td>{{ study.studyTotalActivity }}</td>
        <td>{{ study.calculationMachineRinseVolume }}</td>
        <td>{{ study.calculationMachineRinseActivity }}</td>
        <td>{{ study.studyComment }}</td>
        <td>
          <div class="icon-cell" @click="">
            <font-awesome-icon class="cursor-pointer"
                               :icon="['fas', 'expand']"/>
          </div>
        </td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen-to-square']"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
import RoleService from "@/services/RoleService";
import NewStudyModal from "@/components/modal/NewStudyModal.vue";
import Navigation from "@/navigations/Navigation";

export default {
  name: "StudyTable",
  components: {NewStudyModal},
  props: {
    studies: {
      type: Array
    }
  },
  data() {
    return {
      viewStudyModalIsOpen: false,
      editStudyModalIsOpen: false,
      isAdmin: false,
      study: [
        {
          studyId: 0,
          studyDate: '',
          studyNrPatients: 0,
          studyStartTime: '',
          studyEndTime: '',
          studyTotalActivity: 0,
          studyComment: '',
          studyStatus: '',
          calculationMachineRinseVolume: null,
          calculationMachineRinseActivity: null,
          isotopeName: '',
        }
      ],
    }
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

