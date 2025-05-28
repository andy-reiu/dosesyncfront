<template>
  <div class="home">
    <NewStudyModal :modal-is-open="newStudyModalIsOpen"
                   @event-close-modal="closeStudyModal"
                   @event-execute-new-study="newStudyModal"
    />
    <div class="container text-center">
      <div class="row">
        <div class="col mt-4">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
          <h2 class="text-center mb-3">Päevaplaan</h2>
        </div>
      </div>
      <div class="row">
        <div class="row">
          <div class="col-12">
            <h4 class="mt-4">🟠 Planeeritav uuring</h4>
            <StudyPlannedTable :pending-studies="pendingStudies"
                               :selected-study-id="selectedStudyId"
                               @event-study-updated="getAllStudies"

            />
          </div>
          <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
            <font-awesome-icon icon="plus" class="fa-2x text-success" role="button"
                               @click="openNewStudyModal()"
            />
          </div>
          <div class="col-12">
            <h4 class="mt-4">🟢 Lõpetatud uuringud</h4>
            <StudyTable :studies="completedStudies"
                        :selected-study-id="selectedStudyId" />
          </div>
        </div>

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

export default {
  name: 'HomeView',
  components: {StudyPlannedTable, NewStudyModal, AlertDanger, StudyTable},
  computed: {
    pendingStudies() {
      return this.studies.filter(study => study.studyStatus === 'P');
    },
    completedStudies() {
      return this.studies.filter(study => study.studyStatus === 'C');
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
          isotopeId:'',
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

    openNewStudyModal(){
      this.newStudyModalIsOpen = true;
    },

    closeStudyModal(){
      this.newStudyModalIsOpen = false;
    },

    newStudyModal(){
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
