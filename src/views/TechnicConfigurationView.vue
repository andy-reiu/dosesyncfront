<template>
  <div>

    <!-- ISOTOOPID  -->
    <div class="w-75 mx-auto mb-5">
      <h2 class="text-center mb-3">Isotoobid</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Isotoobi nimetus</th>
          <th>Half-Life (hr)</th>
          <th>Unit</th>
          <th>Staatus</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="iso in isotopes" :key="iso.isotopeId">
          <td>{{ iso.isotopeId }}</td>
          <td>{{ iso.isotopeName }}</td>
          <td>{{ iso.halfLifeHr }}</td>
          <td>{{ iso.unit }}</td>
          <td>{{ iso.isotopeStatus }}</td>
          <td>
            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"/>
            <!--
                            @click="startEditIsotope"
            -->

            <font-awesome-icon
                icon="trash"
                class="text-danger"
                role="button"
                @click="openDeleteConfirmation('isotope', iso.isotopeId, iso.isotopeName)"/>

          </td>

        </tr>
        </tbody>
      </table>

      <!-- + button -->
      <div class="d-flex justify-content-end mt-2">
        <font-awesome-icon
            icon="plus"
            class="fa-2x text-success"
            role="button"
            @click="startAddIsotope"/>
      </div>
      <!-- isotope modal -->
      <AddIsotopeModal
          :modal-is-open="showAddIsotope"
          @event-close-modal="closeAddIsotope"
          @event-save-isotope="createIsotope"
      />
      <ConfirmDeleteModal
          :show="showDeleteModal"
          :item-name="openDeleteConfirmation.label"
          @confirm="runDelete"
          @cancel="cancelDelete"
      />
    </div>


    <!-- KALKULATSIOONI SÄTTED  -->
    <div class="w-75 mx-auto mb-5">
      <h2 class="text-center mb-3">Kalkulatsiooni sätted</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Min Activity</th>
          <th>Max Activity</th>
          <th>Min Volume</th>
          <th>Injection Interval</th>
          <th>Patsiendi kaal</th>
          <th>Aktiivsus süstlas</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cs in calculationSettings" :key="cs.settingId">
          <td>{{ cs.settingId }}</td>
          <td>{{ cs.settingMinActivity }}</td>
          <td>{{ cs.settingMaxActivity }}</td>
          <td>{{ cs.settingMinVolume }}</td>
          <td>{{ cs.injectionInterval }}</td>
          <td>{{ cs.defaultPatientWeight }}</td>
          <td>{{ cs.activityPerKg }}</td>
          <td>
            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"/>
            <!--
                            @click="startEditCalculationSetting"
            -->

            <font-awesome-icon
                icon="trash"
                class="text-danger"
                role="button"/>
            <!--
                            @click="deleteCalculationSetting"
            -->

          </td>
        </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-end mt-2">
        <font-awesome-icon
            icon="plus"
            class="fa-2x text-success"
            role="button"
            @click="startAddCalculationSetting"
        />
        <AddCalculationSettingModal
            :modal-is-open="showAddCalculationSetting"
            @event-close-modal="closeAddCalculationSetting"
            @event-save-calculation-setting="createCalculationSetting"

        />
      </div>
    </div>


    <!-- MASINAD -->
    <div class="w-75 mx-auto mb-5">
      <h2 class="text-center mb-3">Masinad</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Masina nimetus</th>
          <th>Serial</th>
          <th>Masina kirjeldus</th>
          <th>Staatus</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="machine in machines"
                :key="machine.machineId"
                :class="{ 'table-danger': machine.machineStatus === 'D' }">
          <td>{{ machine.machineId }}</td>
          <td>{{ machine.machineName }}</td>
          <td>{{ machine.machineSerial }}</td>
          <td>{{ machine.machineDescription }}</td>
          <td><select
              v-model="machine.machineStatus"
              @change="updateMachineStatus(machine)"
              class="form-select form-select-sm"
          >
            <option value="A">Active</option>
            <option value="D">Deactive</option>
          </select></td>
          <td>
            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"/>
            <!--                @click="startEditMachine"-->

            <font-awesome-icon
                icon="trash"
                class="text-danger"
                role="button"/>
            <!--
                            @click="deleteMachine"
            -->

          </td>
        </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-end mt-2">
        <font-awesome-icon
            icon="plus"
            class="fa-2x text-success"
            role="button"
            @click="startAddMachine"
        />
        <AddMachineModal
            :modal-is-open="showAddMachine"
            @event-close-modal="closeAddMachine"
            @event-save-machine="createMachine"
        />
      </div>
    </div>

  </div>
</template>


<script>
import IsotopeService from "@/services/IsotopeService";
import Navigation from "@/navigations/Navigation";
import MachineService from "@/services/MachineService";
import CalculationSettingService from "@/services/CalculationSettingService";
import AddIsotopeModal from "@/components/modal/AddIsotopeModal.vue";
import AddCalculationSettingModal from "@/components/modal/AddCalculationSettingModal.vue";
import AddMachineModal from "@/components/modal/AddMachineModal.vue";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal.vue";

export default {
  name: 'TechnicConfigurationView',
  components: {AddIsotopeModal, AddCalculationSettingModal, AddMachineModal, ConfirmDeleteModal},
  data() {
    return {
      showAddIsotope: false,
      showAddCalculationSetting: false,
      showAddMachine: false,
      showDeleteModal: false,

      userId: Number(sessionStorage.getItem(('userId'))),
      roleName: sessionStorage.getItem('roleName'),

      deleteTarget: {
        id: null,
        type: null,
        label: ""
      },

      isotopes: [
        {
          isotopeId: 0,
          isotopeName: '',
          halfLifeHr: 0,
          unit: '',
          isotopeStatus: ''
        },
      ],

      calculationSettings: [
        {
          settingId: 0,
          settingMinActivity: 0,
          settingMaxActivity: 0,
          settingMinVolume: 0,
          settingMachineVolumeMax: 0,
          settingMachineVolumeMin: 0,
          injectionInterval: '',
          defaultPatientWeight: 0,
          activityPerKg: 0,
        },
      ],

      machines: [
        {
          machineId: 0,
          hospitalId: 0,
          machineName: '',
          machineSerial: '',
          machineDescription: '',
          machineStatus: ''
        },
      ],

      errorResponse: {
        message: '',
        errorCode: ''
      }

    }
  },
  methods: {

    openDeleteConfirmation(type, id, name) {
      this.deleteTarget = {
        id, type, label:name
      }
      this.showDeleteModal = true
    },

    cancelDelete() {
      this.showDeleteModal = false
      this.deleteTarget = {
        id: null, type: null, label: ""
      }
    },

    runDelete() {
      const {id, type} = this.deleteTarget
      let call
      if(type === "machine") {
        call = MachineService.send
      }
    },

    updateMachineStatus(machine) {
      MachineService.sendUpdateMachineStatusRequest(machine.machineId, machine.machineStatus)
          .then(() => this.getAllMachines())
          .catch(error => console.error(error))
    },

    createMachine(machineData) {
      MachineService.sendPostMachineRequest(machineData)
          .then(() => this.getAllMachines())
          .catch(error => console.error(error))
    },

    createCalculationSetting(calculationSettingData) {
      CalculationSettingService.sendPostCalculationSettingRequest(calculationSettingData)
          .then(() => this.getAllCalculationSettings())
          .catch(error => console.error(error))
    },

    createIsotope(isotopeData) {
      IsotopeService.sendPostIsotopeRequest(isotopeData)
          //refresh list
          .then(() => this.getAllIsotopes())
          .catch(error => console.error(error))
    },

    startAddIsotope() {
      this.showAddIsotope = true
    },
    closeAddIsotope() {
      this.showAddIsotope = false
    },
    startAddCalculationSetting() {
      this.showAddCalculationSetting = true
    },

    closeAddCalculationSetting() {
      this.showAddCalculationSetting = false
    },

    startAddMachine() {
      this.showAddMachine = true
    },

    closeAddMachine() {
      this.showAddMachine = false
    },

    getAllIsotopes() {
      IsotopeService.sendGetIsotopeRequest()
          .then(response => this.isotopes = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    getAllCalculationSettings() {
      CalculationSettingService.sendGetCalculationSettingRequest()
          .then(response => this.calculationSettings = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    getAllMachines() {
      MachineService.sendGetMachineRequest()
          .then(response => this.machines = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },


  },
  beforeMount() {
    this.getAllIsotopes()
    this.getAllMachines()
    this.getAllCalculationSettings()

  }

}
</script>