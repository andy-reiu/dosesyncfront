<template>
  <div>
    <AlertSuccess :success-message="successMessage"/>
    <AlertDanger :error-message="errorMessage"/>
    <ViewStudyDetails
        v-if="viewStudyModalIsOpen"
        :modalIsOpen="viewStudyModalIsOpen"
        :studyId="selectedStudyId"
        @event-close-modal="viewStudyModalIsOpen = false"
    />
    <ConfirmDeleteModal
        :show="viewDeleteModalIsOpen"
        :item-name="studyPendingToDelete?.studyDate || 'selle uuringu'"
        @confirm="confirmDeleteStudy"
        @cancel="viewDeleteModalIsOpen = false"
    />
    <table class="table table-hover table-light table-striped-columns spaced-table">
      <thead class="table-dark">
      <tr>
        <th>Kuupäev</th>
        <th>Isotoop</th>
        <th>Patsientide arv</th>
        <th>Esimene süstimine</th>
        <th>Viimane süstimine</th>
        <th>Kalibratsiooni aktiivsus (MBq)</th>
        <th>Loputusmahl (mL)</th>
        <th>Jääk aktiivsus (MBq)</th>
        <th>Staatus</th>
        <th></th>
        <th v-if="isAdmin"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="study in sortedStudies" :key="study.studyId">
        <td>{{ study.studyDate }}</td>
        <td>{{ study.isotopeName }}</td>
        <td>{{ study.studyNrPatients }}</td>
        <td>{{ study.studyStartTime }}</td>
        <td>{{ study.studyEndTime }}</td>
        <td>{{ study.studyTotalActivity }}</td>
        <td>{{ study.calculationMachineRinseVolume }}</td>
        <td>{{ study.calculationMachineRinseActivity }}</td>
        <td>{{ study.studyStatus }}</td>
        <td>
          <button class="btn btn-outline-primary btn-sm" title="Vaata uuringut"
                  @click="viewStudyDetails(study.studyId)">
            <font-awesome-icon :icon="['fas', 'expand']"/>
          </button>
        </td>
        <td v-if="isAdmin">
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-warning btn-sm" title="Muuda uuringut"
                    @click="editSelectedStudy(study.studyId, study.isotopeId, study.isotopeName)">
              <font-awesome-icon icon="pen-to-square"/>
            </button>
            <button class="btn btn-outline-danger btn-sm" title="Kustuta uuring"
                    @click="prepareDeleteStudy(study)">
              <font-awesome-icon icon="trash"/>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import StudyService from "@/services/StudyService";
import Navigation from "@/navigations/Navigation";
import ViewStudyDetails from "@/components/modal/ViewStudyDetailsModal.vue";
import RoleService from "@/services/RoleService";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
export default {
  name: "AllStudiesView",
  components: {AlertSuccess, AlertDanger, ConfirmDeleteModal, ViewStudyDetails},
  data() {
    return {
      viewStudyModalIsOpen: false,
      isAdmin: false,
      selectedStudyId: 0,
      studies: [
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
      viewDeleteModalIsOpen: false,
      studyPendingToDelete: null,
      successMessage: '',
      errorMessage: '',
    };
  },
  computed: {
    sortedStudies() {
      return this.studies.slice().sort((a, b) => {
        return new Date(b.studyDate) - new Date(a.studyDate); // Descending by date
      });
    },
  },

  methods: {
    viewStudyDetails(studyId) {
      this.selectedStudyId = studyId;
      this.viewStudyModalIsOpen = true;
    },

    editSelectedStudy(studyId, isotopeId, isotopeName) {
      Navigation.navigateToStudyView(studyId, isotopeId, isotopeName);
    },

    confirmDeleteStudy() {
      StudyService.sendDeleteStudyPendingRequest(this.studyPendingToDelete.studyId)
          .then(() => this.handleDeleteStudyResponse())
          .catch(() => Navigation.navigateToErrorView());
    },

    handleDeleteStudyResponse() {
      this.$emit('event-study-updated');
      this.studyPendingToDelete = null;
      this.viewDeleteModalIsOpen = false;
      this.setTimedOutSuccessMessage("Uuring on edukalt kustutatud.");
    },

    prepareDeleteStudy(study) {
      this.studyPendingToDelete = study;
      this.viewDeleteModalIsOpen = true;
    },

    getAllStudies() {
      StudyService.sendGetStudiesRequest()
          .then(response => this.studies = response.data)
          .catch(() => Navigation.navigateToErrorView());
    },

    setTimedOutSuccessMessage(message) {
      this.successMessage = message
      setTimeout(this.resetMessages, 4000)
    },
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
    this.getAllStudies();
  }
};
</script>