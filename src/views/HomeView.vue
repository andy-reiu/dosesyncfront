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
        <StudyTable :studies="studies"
                    :selected-study-id="selectedStudyId"
        />
        <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
          <font-awesome-icon icon="plus" class="fa-2x text-success" role="button"
                             @click="openNewStudyModal()"
          />
        </div>
        <div class="col col-6 form-select-lg">
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

export default {
  name: 'HomeView',
  components: {NewStudyModal, AlertDanger, StudyTable},
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
