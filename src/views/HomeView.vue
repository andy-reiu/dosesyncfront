<template>
  <div class="home background-wrapper">
    <div class="overlay-box container p-4 shadow-sm rounded">
      <NewStudyModal :modal-is-open="newStudyModalIsOpen"
                     @event-close-modal="closeStudyModal"
                     @event-execute-new-study="newStudyModal"
                     @event-update-study-table="getAllStudies"
      />
      <div class="text-center">
        <AlertDanger :error-message="errorMessage"></AlertDanger>
        <h2 class="mb-3">Planeerimine</h2>
      </div>
      <div>
        <StudyCalendar :studies="studies"/>
      </div>
      <div>
        <h4 class="mt-4">🟠 Järgmise kahe nädala uuringud</h4>
        <StudyPlannedTable :pending-studies="pendingStudies"
                           :selected-study-id="selectedStudyId"
                           @event-study-updated="getAllStudies"
        />
        <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
          <button class="btn btn-outline-success btn-sm" title="Lisa uus uuring"
                  @click="openNewStudyModal()">
            <font-awesome-icon icon="plus" />
          </button>
        </div>
        <h4 class="mt-4">🟡 Täna ja tegemata uuringud</h4>
        <StudyPlannedTable :pending-studies="todaysStudies"
                    :selected-study-id="selectedStudyId"
                    @event-study-updated="getAllStudies"
        />
        <h4 class="mt-4">🟢 Salvestatud uuringud (viimased 7 päeva)</h4>
        <StudyTable :studies="completedStudies"
                    :selected-study-id="selectedStudyId"
        />
      </div>
    </div>
  </div>
</template>
<script>

import StudyService from "@/services/StudyService";
import Navigation from "@/navigations/Navigation";
import StudyTable from "@/components/study/StudyTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import NewStudyModal from "@/components/modal/NewStudyModal.vue";
import RoleService from "@/services/RoleService";
import StudyPlannedTable from "@/components/study/StudyPlannedTable.vue";
import StudyCalendar from "@/components/study/StudyCalendar.vue";

export default {
  name: 'HomeView',
  components: {StudyPlannedTable, NewStudyModal, AlertDanger, StudyTable, StudyCalendar},
  computed: {
    today() {
      return new Date().toISOString().split('T')[0];
    },
    pendingStudies() {
      const today = new Date();
      const twoWeeksLater = new Date();
      twoWeeksLater.setDate(today.getDate() + 14);

      return this.studies.filter(study => {
        const studyDate = new Date(study.studyDate);
        return study.studyStatus === 'P' && studyDate > today && studyDate <= twoWeeksLater;
      });
    },
    todaysStudies() {
      const today = this.today;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return this.studies.filter(study => {
        const studyDate = new Date(study.studyDate);
        return (
            study.studyStatus === 'P' && (study.studyDate === today ||
                (studyDate >= sevenDaysAgo && studyDate < new Date(today)))
        );
      });
    },
    completedStudies() {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      return this.studies.filter(study => {
        const studyDate = new Date(study.studyDate);
        return study.studyStatus === 'C' && studyDate >= sevenDaysAgo && studyDate <= today;
      });
    }
  },

  data() {
    return {
      newStudyModalIsOpen: false,
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      selectedStudyId: 0,
      errorMessage: '',
      isAdmin: false,
      studies: [
        {
          studyId: 0,
          machineId: 0,
          machineName: '',
          studyDate: '',
          studyNrPatients: 0,
          studyStartTime: '',
          studyEndTime: '',
          studyTotalActivity: 0,
          studyComment: '',
          studyStatus: '',
          calculationMachineRinseVolume: null,
          calculationMachineRinseActivity: null,
          isotopeId: '',
          isotopeName: '',
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    openNewStudyModal() {
      this.newStudyModalIsOpen = true;
    },

    closeStudyModal() {
      this.newStudyModalIsOpen = false;
    },

    newStudyModal() {
      this.newStudyModalIsOpen = false;
      Navigation.navigateToStudyView();
    },

    getAllStudies() {
      StudyService.sendGetStudiesRequest()
          .then(response => this.handleGetStudiesSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView());
    },

    handleGetStudiesSuccessResponse(response) {
      this.studies = response.data;
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
    this.getAllStudies();
  }
}
</script>
