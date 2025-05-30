<template>
  <div>
    <EditStudyModal
        :modal-is-open="editStudyModalIsOpen"
        @event-close-modal="editStudyModalIsOpen = false"
        :study="study"
        @event-study-updated="handleUpdateStudyRequest"
        @event-new-machine-selected="setMachineId"
        @event-new-isotope-selected="setIsotopeId"
        @event-update-date="setDate"
    />
    <ConfirmDeleteModal
        :show="viewDeleteModalIsOpen"
        :item-name="studyPendingToDelete?.studyDate || 'selle uuringu'"
        @confirm="confirmDeleteStudy"
        @cancel="viewDeleteModalIsOpen = false"
    />
    <div class="">
      <AlertSuccess :success-message="successMessage"/>
      <AlertDanger :error-message="errorMessage"/>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>Kuupäev</th>
          <th>Seade</th>
          <th>Isotoop</th>
          <th v-if="isAdmin"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="study in pendingStudies" :key="study.studyId">
          <td>{{ study.studyDate }}</td>
          <td>{{ study.machineName }}</td>
          <td>{{ study.isotopeName }}</td>
          <td v-if="isAdmin">
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-outline-primary btn-sm" @click="navigateToStudyView(study)" title="Ava uuring">
                <font-awesome-icon icon="chevron-right" />
              </button>
              <button class="btn btn-outline-warning btn-sm" @click="editSelectedStudy(study)" title="Muuda uuringut">
                <font-awesome-icon icon="pen-to-square" />
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="prepareDeleteStudy(study)" title="Kustuta uuring">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navigation from "@/navigations/Navigation";
import RoleService from "@/services/RoleService";
import StudyService from "@/services/StudyService";
import EditStudyModal from "@/components/modal/EditStudyModal.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal.vue";

export default {
  name: "StudyPlannedTable",
  components: {ConfirmDeleteModal, AlertDanger, AlertSuccess, EditStudyModal},
  props: {
    pendingStudies: {
      type: Array
    },
  },
  data() {
    return {
      viewStudyModalIsOpen: false,
      editStudyModalIsOpen: false,
      isAdmin: false,
      successMessage: '',
      errorMessage: '',
      study: {},
      viewDeleteModalIsOpen: false,
      studyPendingToDelete: null,
      editStudy: {
        userId: Number(sessionStorage.getItem('userId')),
        machineId: 0,
        isotopeId: 0,
        studyDate: ''
      },
    }
  },
  methods: {

    handleUpdateStudyRequest() {
      StudyService.sendPutStudyPendingRequest(this.studyId, this.editStudy)
          .then(value => this.handleUpdateStudyPendingResponse(value))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleUpdateStudyPendingResponse(value) {
      this.setTimedOutSuccessMessage("Planeeritav uuring on uuendatud.")
      this.$emit('event-study-updated');
    },

    prepareDeleteStudy(study) {
      this.studyPendingToDelete = study;
      this.viewDeleteModalIsOpen = true;
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

    setMachineId(machineId) {
      this.editStudy.machineId = machineId;
    },

    setIsotopeId(isotopeId) {
      this.editStudy.isotopeId = isotopeId;
    },

    setDate(date) {
      this.editStudy.studyDate = date;
    },

    editSelectedStudy(study) {
      this.study = study;
      this.studyId = study.studyId;
      this.editStudy.machineId = study.machineId;
      this.editStudy.isotopeId = study.isotopeId;
      this.editStudy.studyDate = study.studyDate;
      this.editStudyModalIsOpen = true;
    },

    setTimedOutSuccessMessage(message) {
      this.successMessage = message
      setTimeout(this.resetMessages, 4000)
    },

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

    navigateToStudyView(study){
      Navigation.navigateToStudyView(study.studyId, study.isotopeId, study.isotopeName)
    }
  },
  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>


