<template>
  <div class="home">
    <div class="container text-center">
      <div class="row">
        <div class="col mt-4">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
          <h1>Päevaplaan</h1>
        </div>
      </div>
      <div class="row">
        <StudyTable :studies="studies"
                    :selected-study-id="selectedStudyId"
        />
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

export default {
  name: 'HomeView',
  components: {StudyTable},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      selectedStudyId: 0,
      errorMessage: '',
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
    this.getAllStudies();
  }
}
</script>
