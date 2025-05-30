<template>
  <ViewStudyDetails
      v-if="viewStudyModalIsOpen"
      :modalIsOpen="viewStudyModalIsOpen"
      :studyId="selectedStudyId"
      @event-close-modal="viewStudyModalIsOpen = false"
  />
  <div class="">
    <table class="table table-hover table-light table-striped-columns">
      <thead class="table-dark">
      <tr>
        <th>Kuupäev</th>
        <th>Isotoop</th>
        <th>Seade</th>
        <th>Patsientide arv</th>
        <th>Esimene süstimine</th>
        <th>Viimane süstimine</th>
        <th>Kalibratsiooni aktiivsus (MBq)</th>
        <th>Loputusmahl (mL)</th>
        <th>Jääk aktiivsus (MBq)</th>
        <th></th>
        <th v-if="isAdmin"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="study in studies" :key="study.studyId">
        <td>{{ study.studyDate }}</td>
        <td>{{ study.isotopeName }}</td>
        <td>{{ study.machineName }}</td>
        <td>{{ study.studyNrPatients }}</td>
        <td>{{ study.studyStartTime }}</td>
        <td>{{ study.studyEndTime }}</td>
        <td>{{ study.studyTotalActivity }}</td>
        <td>{{ study.calculationMachineRinseVolume }}</td>
        <td>{{ study.calculationMachineRinseActivity }}</td>
        <td>
          <div class="d-flex justify-content-center">
            <button class="btn btn-outline-primary btn-sm" title="Vaata uuringut"
                    @click="viewStudyDetails(study.studyId)">
              <font-awesome-icon :icon="['fas', 'expand']" />
            </button>
          </div>
        </td>
        <td v-if="isAdmin">
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-outline-warning btn-sm" title="Muuda uuringut"
                    @click="editSelectedStudy(study.studyId, study.isotopeId, study.isotopeName)">
              <font-awesome-icon icon="pen-to-square" />
            </button>
            <button class="btn btn-outline-danger btn-sm" title="Kustuta uuring"
                    @click="editSelectedStudy(study.studyId, study.isotopeId, study.isotopeName)">
              <font-awesome-icon icon="trash" />
            </button>
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
import ViewStudyDetails from "@/components/modal/ViewStudyDetailsModal.vue";

export default {
  name: "StudyTable",
  components: {ViewStudyDetails, NewStudyModal},
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
      selectedStudyId: 0,
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
          isotopeId: 0,
          isotopeName: '',
        }
      ],
    }
  },

  methods: {
    editSelectedStudy(studyId, isotopeId, isotopeName) {
      Navigation.navigateToStudyView(studyId, isotopeId, isotopeName)
    },

    viewStudyDetails(studyId){
      this.selectedStudyId = studyId;
      this.viewStudyModalIsOpen = true;
    }
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

