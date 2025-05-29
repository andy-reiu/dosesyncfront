<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Alusta uue plaaniga</h5>
      </div>
    </template>
    <template #body>
      <form>
        <div class="mb-3">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
          <label class="form-label">Vali seade</label>
          <MachineDropdown :machines="machines"
                           :selected-machine-id="study.machineId"
                           @event-new-machine-selected="setStudyMachineId"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Vali isotoop</label>
          <IsotopeDropdown :isotopes="isotopes"
                           :selected-isotope-id="study.isotopeId"
                           @event-new-isotope-selected="setStudyIsotopeId"
          />
        </div>
        <div class="col col-6">
          <label class="form-label">Uuringu tegemise kuupäev</label>
          <input type="date" class="form-control" v-model="study.studyDate"/>
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="submitStudy(false)" type="button" class="btn btn-info me-2">
        Lisa plaan
      </button>
      <button @click="submitStudy(true)" type="button" class="btn btn-success">
        Lisa plaan ja alusta plaaniga
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import IsotopeDropdown from "@/components/isotope/IsotopeDropdown.vue";
import IsotopeService from "@/services/IsotopeService";
import Navigation from "@/navigations/Navigation";
import MachineDropdown from "@/components/machine/MachineDropdown.vue";
import MachineService from "@/services/MachineService";
import StudiesTotalActivity from "@/components/activity/StudiesTotalActivity.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import StudyService from "@/services/StudyService";

export default {
  name: "NewStudyModal",
  components: {
    AlertDanger,
    StudiesTotalActivity, MachineDropdown, IsotopeDropdown: IsotopeDropdown, Modal
  },
  props: {
    modalIsOpen: Boolean,
  },
  data() {
    return {
      studyId: 0,
      selectedIsotopeId: 0,
      errorMessage: '',
      study: {
        userId: Number(sessionStorage.getItem('userId')),
        machineId: 0,
        isotopeId: 0,
        isotopeName: '',
        studyDate: ''
      },

      machines: [
        {
          machineId: 0,
          machineName: ''
        }
      ],

      isotopes: [
        {
          isotopeId: 0,
          isotopeName: ''
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },

  methods: {

    getAllIsotopes() {
      IsotopeService.sendGetActiveIsotopesRequest()
          .then(response => this.handleGetIsotopesSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetIsotopesSuccessResponse(response) {
      this.isotopes = response.data
    },

    setStudyIsotopeId(isotopeId) {
      this.study.isotopeId = isotopeId;
      const found = this.isotopes.find(i => i.isotopeId === isotopeId);
      this.study.isotopeName = found ? found.isotopeName : '';
    },

    setStudyMachineId(machineId) {
      this.study.machineId = machineId;
    },

    submitStudy(goToStudyView) {
      if (!this.allFieldsAreWithCorrectInput()) {
        this.errorMessage = 'Täida kõik väljad';
        setTimeout(() => (this.errorMessage = ''), 4000);
        return;
      }
      StudyService.sendPostStudyRequest(this.study)
          .then(response => this.handleNewStudyView(goToStudyView, response))
          .catch(() => Navigation.navigateToErrorView());
    },

    handleNewStudyView(goToStudyView, response) {
      if (goToStudyView) {
        Navigation.navigateToStudyView(response.data,
            this.study.isotopeId,
            this.study.isotopeName
        );
      } else {
        this.$emit('event-close-modal');
        this.$emit('event-update-study-table');
      }
    },


    allFieldsAreWithCorrectInput() {
      return (
          this.study.machineId !== 0 &&
          this.study.isotopeId !== 0 &&
          this.study.studyDate !== ''
      );
    },

    getAllMachines() {
      MachineService.sendGetActiveMachineRequest()
          .then(response => this.handleGetMachineSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetMachineSuccessResponse(response) {
      this.machines = response.data
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
  },

  beforeMount() {
    this.getAllIsotopes()
    this.getAllMachines()
  }
}
</script>,

