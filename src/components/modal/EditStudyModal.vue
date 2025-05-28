<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Muuda uuringut</h5>
      </div>
    </template>

    <template #body>
      <form>
        <div class="mb-3">
          <AlertDanger :error-message="errorMessage"/>
          <label class="form-label">Seade</label>
          <MachineDropdown :machines="machines"
                           :selected-machine-id="study.machineId"
                           @event-new-machine-selected="$emit('event-new-machine-selected', $event)"/>
        </div>
        <div class="mb-3">
          <label class="form-label">Isotoop</label>
          <IsotopeDropdown :isotopes="isotopes"
                           :selected-isotope-id="study.isotopeId"
                           @event-new-isotope-selected="$emit('event-new-isotope-selected', $event)"/>
        </div>
        <div class="col col-6">
          <label class="form-label">Kuupäev</label>
          <input type="date" class="form-control"
                 :value="study.studyDate"
                 @change="$emit('event-update-date', $event.target.value)"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <button @click="executeEditStudy" class="btn btn-outline-primary">
        Salvesta muudatused
      </button>
    </template>
  </Modal>
</template>
<script>
import IsotopeDropdown from "@/components/isotope/IsotopeDropdown.vue";
import MachineDropdown from "@/components/machine/MachineDropdown.vue";
import Modal from "@/components/modal/Modal.vue";
import IsotopeService from "@/services/IsotopeService";
import MachineService from "@/services/MachineService";
import Navigation from "@/navigations/Navigation";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "EditStudyModal",
  components: {
    AlertDanger,
    Modal, IsotopeDropdown, MachineDropdown,
  },
  props: {
    modalIsOpen: Boolean,
    study: Object,
  },
  data() {
    return {
      errorMessage: '',
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
    };
  },

  methods: {

    getAllIsotopes() {
      IsotopeService.sendGetActiveIsotopesRequest()
          .then(response => this.isotopes = response.data)
          .catch(() => Navigation.navigateToErrorView());
    },

    getAllMachines() {
      MachineService.sendGetActiveMachineRequest()
          .then(response => this.machines = response.data)
          .catch(() => Navigation.navigateToErrorView());
    },

    executeEditStudy() {
      this.$emit('event-study-updated');
      this.$emit('event-close-modal');
    }
  },

  mounted() {
    this.getAllIsotopes();
    this.getAllMachines();
  }
};
</script>


