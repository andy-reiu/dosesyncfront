<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="text-center">
        <h5>Alusta uue plaaniga</h5>
      </div>
    </template>
    <template #body>
      <form>
        <div class="mb-3">
          <label class="form-label">Vali seade</label>
          <MachineDropdown :machines="machines"
                           :selected-machine-id="selectedMachine"
                           @event-new-machine-selected="updateSelectedMachineTable"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Vali isotoop</label>
          <IsotopeDropdown :isotopes="isotopes"
                           :selected-isotope-id="selectedIsotope"
                           @event-new-isotope-selected="updateSelectedIsotopeTable"
          />
        </div>
        <div class="mb-3">
          <PatientsNumber :numberOfPatiens="selectedNumberOfPatients"
                          @event-update-patients-number="updatePatientsNumber"
          />
        </div>
        <div class="mb-3">
          <StudiesTotalActivity :studiesTotalActivity="selectedTotalActivity"
                                @event-update-studies-total-activity="updateSelectedTotalActivity"
          />
        </div>
        <div class="row">
          <div class="col col-6">
            <label class="form-label">Uuringu kuupäev</label>
            <input type="date" class="form-control" v-model="selectedDate"
            />
          </div>
          <div class="col col-6">
            <label class="form-label">Uuringu kellaaeg</label>
            <input type="time" class="form-control" v-model="selectedTime" step="60"
            />
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="executeNewStudy" type="button" class="btn btn-outline-success">Alusta uue uuringuga</button>
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

export default {
  name: "NewStudyModal",
  components: {StudiesTotalActivity, PatientsNumber, MachineDropdown, IsotopeDropdown: IsotopeDropdown, Modal},
  props: {
    modalIsOpen: Boolean,
    study: Object
  },
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      selectedIsotope: 0,
      selectedMachine: 0,
      selectedNumberOfPatients: 0,
      selectedTotalActivity: 0,
      isotopes: [
        {
          isotopeId: 0,
          isotopeName: ''
        }
      ]
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

    updateSelectedIsotopeTable(selectedIsotope) {
      this.selectedIsotope = selectedIsotope;
    },

    updateSelectedMachineTable(selectedMachine) {
      this.selectedMachine = selectedMachine;
    },

    executeNewStudy() {
      this.$emit('event-execute-new-study')
    },

    getAllMachines() {
      MachineService.sendGetMachineRequest()
          .then(response => this.handleGetMachineSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetMachineSuccessResponse(response) {
      this.machines = response.data
    },

    updatePatientsNumber(selectedNumberOfPatients) {
      this.selectedNumberOfPatients = selectedNumberOfPatients;
    },

    updateSelectedTotalActivity(selectedTotalActivity) {
      this.selectedTotalActivity = selectedTotalActivity;
    }
  },

  beforeMount() {
    this.getAllIsotopes()
    this.getAllMachines()
  }

}
</script>,

