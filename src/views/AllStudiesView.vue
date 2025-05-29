<template>
  <div class="container text-center">
    <div class="row">
      <div class="col mt-4">
        <h4 class="mt-4"> Kõik uuringud</h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="row">
      <div class="col-12">
        <StudyTable :studies="studies"/>
      </div>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import StudyPlannedTable from "@/components/study/StudyPlannedTable.vue";
import StudyTable from "@/components/study/StudyTable.vue";
import StudyService from "@/services/StudyService";
import Navigation from "@/navigations/Navigation";

export default {
  name: "AllStudiesView",
  components: {StudyTable, StudyPlannedTable, AlertDanger},
  data() {
    return {
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
    getAllStudies() {
      StudyService.sendGetStudiesRequest()
          .then(response => this.handleGetStudiesSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView());
    },

    handleGetStudiesSuccessResponse(response) {
      this.studies = response.data;
    },
  },

  beforeMount() {
    this.getAllStudies();
  }
}
</script>
