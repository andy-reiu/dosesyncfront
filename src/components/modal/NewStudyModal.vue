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
                           @event-new-isotope-selected="setStudyIsotope"
          />
        </div>

        <div class="col col-6">
          <label class="form-label">Uuringu tegemise kuupäev</label>
          <input type="date" class="form-control" v-model="study.studyDate"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="executeAddNewStudy" type="button" class="btn btn-outline-success">Lisa plaan</button>
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
import PatientsNumber from "@/components/patientsnumber/PatientsNumber.vue";
import StudiesTotalActivity from "@/components/activity/StudiesTotalActivity.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import StudyService from "@/services/StudyService";

export default {
  name: "NewStudyModal",
  components: {
    AlertDanger,
    StudiesTotalActivity, PatientsNumber, MachineDropdown, IsotopeDropdown: IsotopeDropdown, Modal
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
      IsotopeService.sendGetIsotopesRequest()
          .then(response => this.handleGetIsotopesSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetIsotopesSuccessResponse(response) {
      this.isotopes = response.data
    },

    setStudyIsotope(isotopeId) {
      this.study.isotopeId = isotopeId;
    },

    setStudyMachineId(machineId) {
      this.study.machineId = machineId;
    },

    executeAddNewStudy() {
      if (this.allFieldsAreWithCorrectInput()) {
        StudyService.sendPostStudyRequest(this.study)
            .then(response => Navigation.navigateToStudyView(response.data, this.selectedIsotopeId))
            .catch(reason => Navigation.navigateToErrorView())

      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
      }
    },

    allFieldsAreWithCorrectInput() {
      // todo: kuupäeva kontroll
      return this.selectedMachineId !== 0
    },

    getAllMachines() {
      MachineService.sendGetMachineRequest()
          .then(response => this.handleGetMachineSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetMachineSuccessResponse(response) {
      this.machines = response.data
    },
  },

  resetErrorMessage() {
    this.errorMessage = ''
  },

  beforeMount() {
    this.getAllIsotopes()
    this.getAllMachines()
  }

}
</script>,

