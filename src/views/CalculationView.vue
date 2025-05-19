<template>
  <div>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <AlertDanger :error-message="errorMessage"></AlertDanger>
        </div>
      </div>
      <div class="row">
        <div class="col col-2 form-select-lg">
          <IsotopeDropdown :isotopes="isotopes"
                           :selected-isotope-id="selectedIsotope"
                           @event-new-isotope-selected="updateSelectedIsotopeTable"

          />
        </div>
        <div class="col col-2 form-select-lg">
          <MachineDropdown :machines="machines"
                           :selected-machine-id="selectedMachine"
                           @event-new-machine-selected="updateSelectedMachineTable"
          />
        </div>
        <div class="row justify-content-center">

          <div class="col col-6 form-select-lg">
              <div class="container mt-4">
                <table class="table table-bordered table-hover text-center align-middle">
                  <thead class="table-light">
                  <tr>
                    <th>#</th>
                    <th>Aktiivsus (MBq)</th>
                    <th>Kalibreerimise kellaaeg</th>
                    <th>Aktiivsus esimese süsti ajal (MBq)</th>
                    <th>Viaali maht (ml)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(vial, index) in vials" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ vial.activity }}</td>
                    <td>{{ vial.calibrationTime }}</td>
                    <td>{{ vial.firstDoseActivity }}</td>
                    <td>{{ vial.volume }}</td>
                  </tr>
                  </tbody>
                </table>

                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary" @click="addVial">
                    Lisa viaal
                  </button>
                </div>
              </div>
          </div>
          <div class="col col-6 form-select-lg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import IsotopeDropdown from "@/components/isotrope/IsotropeDropdown.vue";
import Navigation from "@/navigations/Navigation";
import IsotopeService from "@/services/IsotopeService";
import MachineService from "@/services/MachineService";
import MachineDropdown from "@/components/machine/MachineDropdown.vue";

export default {
  name: 'CalculationView',
  components: {MachineDropdown, IsotopeDropdown, AlertDanger},
  data() {
    return {
      // Session storages on väljad stringi kujul seega vaja muuta numbriks, tahame hiljem võrrelda
      // Võtta välja, kes on vaataja.
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      selectedIsotope: 0,
      selectedMachine: 0,
      errorMessage: '',
      isotopes: [
        {
          isotopeId: 0,
          isotopeName: ''
        }
      ],
      machines: [
        {
          machineId: 0,
          machineName: ''
        }
      ],
      vials: [
        {
          name: "Viaal 1",
          activity: 2466.2,
          calibrationTime: "10:30",
          firstDoseActivity: 2466,
          volume: 9,
        },
        {
          name: "Viaal 2",
          activity: 718.2,
          calibrationTime: "13:00",
          firstDoseActivity: 1852,
          volume: 7,
        },
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

    getAllMachines() {
      MachineService.sendGetMachineRequest()
          .then(response => this.handleGetMachineSuccessResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetIsotopesSuccessResponse(response) {
      this.isotopes = response.data
    },

    handleGetMachineSuccessResponse(response) {
      this.machines = response.data
    },

    updateSelectedIsotopeTable(selectedIsotope) {
      this.selectedIsotope = selectedIsotope;
    },

    updateSelectedMachineTable(selectedMachine) {
      this.selectedMachine = selectedMachine;
    },

    addVial() {
      const newIndex = this.vials.length + 1;
      this.vials.push({
        name: `Viaal ${newIndex}`,
        activity: 0,
        calibrationTime: '',
        firstDoseActivity: 0,
        volume: 0,
      });
    },

    resetErrorMessage() {
      this.errorMessage = ''
    }
  },

  beforeMount() {
    this.getAllIsotopes()
    this.getAllMachines()
  },
}


</script>