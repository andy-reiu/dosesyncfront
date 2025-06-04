<template>
  <div class="w-75 mx-auto mb-5">
    <div>
      <h2 class="text-center mb-3">Isotoobid</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Isotoobi nimetus</th>
          <th>Poolestus aeg (hr)</th>
          <th>Ühik</th>
          <th>Staatus</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="isotope in sortedIsotopes"
            :key="isotope.isotopeId"
            :class="{ 'table-danger': isotope.isotopeStatus === 'D' }"
        >
          <td>{{ isotope.isotopeId }}</td>

          <td>
            <template v-if="editingIsotopeId === isotope.isotopeId">
              <input
                  v-model="isotope.isotopeName"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ isotope.isotopeName }}
            </template>
          </td>

          <td>
            <template v-if="editingIsotopeId === isotope.isotopeId">
              <input
                  type="number"
                  v-model.number="isotope.halfLifeHr"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ isotope.halfLifeHr }}
            </template>
          </td>

          <td>
            <template v-if="editingIsotopeId === isotope.isotopeId">
              <input
                  v-model="isotope.unit"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ isotope.unit }}
            </template>
          </td>

          <td>
            <template v-if="editingIsotopeId === isotope.isotopeId">
              <select
                  v-model="isotope.isotopeStatus"
                  class="form-select form-select-sm"
              >
                <option value="A">Active</option>
                <option value="D">Deactive</option>
              </select>
            </template>
            <template v-else>
              <select
                  v-model="isotope.isotopeStatus"
                  @change="updateIsotopeStatus(isotope)"
                  class="form-select form-select-sm"
              >
                <option value="A">Active</option>
                <option value="D">Deactive</option>
              </select>
            </template>
          </td>

          <td>
            <template v-if="editingIsotopeId === isotope.isotopeId">
              <span
                  role="button"
                  class="text-success me-2"
                  style="cursor: pointer"
                  @click="saveIsotope(isotope)"
              >
            <font-awesome-icon icon="check"/>
          </span>
              <span
                  role="button"
                  class="text-secondary"
                  style="cursor: pointer"
                  @click="cancelEditIsotope()"
              >
            <font-awesome-icon icon="times"/>
          </span>
            </template>
            <template v-else>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-warning btn-sm" title="Muuda isotoopi"
                        @click="startEditIsotope(isotope)">
                  <font-awesome-icon icon="pen-to-square"/>
                </button>
                <button
                    class="btn btn-outline-danger btn-sm" title="Kustuta isotoobi"
                    @click="openDeleteConfirmation('isotope', isotope.isotopeId, isotope.isotopeName)">
                  <font-awesome-icon icon="trash"/>
                </button>
              </div>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-outline-success btn-sm" title="Lisa isotoop"
                @click="startAddIsotope">
          <font-awesome-icon icon="plus"/>
        </button>
      </div>
      <AddIsotopeModal
          :modal-is-open="showAddIsotope"
          @event-close-modal="closeAddIsotope"
          @event-save-isotope="createIsotope"
      />
    </div>

    <div>
      <h2 class="text-center mb-3">Kalkulatsiooni sätted</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Miinimum aktiivsus (mBq)</th>
          <th>Maksimaalne aktiivsus (mBq)</th>
          <th>Miinimum süstekogus (mL)</th>
          <th>Süstimise aja interval (min)</th>
          <th>Patsiendi kaal (kg)</th>
          <th>Aktiivsus süstlas (kg*MBq)</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="cs in sortedCalculationSettings"
            :key="cs.settingId"
        >
          <td>{{ cs.settingId }}</td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <input
                  type="number"
                  v-model.number="cs.settingMinActivity"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ cs.settingMinActivity }}
            </template>
          </td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <input
                  type="number"
                  v-model.number="cs.settingMaxActivity"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ cs.settingMaxActivity }}
            </template>
          </td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <input
                  type="number"
                  v-model.number="cs.settingMinVolume"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ cs.settingMinVolume }}
            </template>
          </td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <div class="input-group input-group-sm " style="max-width: 160px;">
                <input
                    type="number"
                    v-model.number="cs.injectionInterval"
                    class="form-control"
                    min="1"
                    max="60"
                    step="1"
                    placeholder="Minutes"
                />
                <span class="input-group-text">min</span>
              </div>
            </template>
            <template v-else>
              {{ cs.injectionInterval }} min
            </template>
          </td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <input
                  type="number"
                  v-model.number="cs.defaultPatientWeight"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ cs.defaultPatientWeight }}
            </template>
          </td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <input
                  type="number"
                  v-model.number="cs.activityPerKg"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ cs.activityPerKg }}
            </template>
          </td>
          <td>
            <template v-if="editingCalculationSettingId === cs.settingId">
              <!-- Save -->
              <span
                  role="button"
                  class="text-success me-2"
                  style="cursor: pointer"
                  @click="saveCalculationSetting(cs)"
              >
              <font-awesome-icon icon="check"/>
            </span>
              <span
                  role="button"
                  class="text-secondary"
                  style="cursor: pointer"
                  @click="cancelEditCalculationSetting()"
              >
              <font-awesome-icon icon="times"/>
            </span>
            </template>
            <template v-else>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-warning btn-sm" title="Muuda kalkulatsiooni sätet"
                        @click="startEditCalculationSetting(cs)">
                  <font-awesome-icon icon="pen-to-square"/>
                </button>
                <button class="btn btn-outline-danger btn-sm" title="Kustuta kalkulatsiooni säte"
                        @click="openDeleteConfirmation('calculationsetting', cs.settingId, 'kalkulatsiooni säte')">
                  <font-awesome-icon icon="trash"/>
                </button>
              </div>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-outline-success btn-sm" title="Lisa kalkulatsiooni säte"
                @click="startAddCalculationSetting">
          <font-awesome-icon icon="plus"/>
        </button>
        <AddCalculationSettingModal
            :modal-is-open="showAddCalculationSetting"
            @event-close-modal="closeAddCalculationSetting"
            @event-save-calculation-setting="createCalculationSetting"
        />
      </div>

    </div>

    <div>
      <h2 class="text-center mb-3">Masinad</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Masina nimetus</th>
          <th>Seeria nr</th>
          <th>Haigla</th>
          <th>Masina kirjeldus</th>
          <th>Staatus</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="machine in sortedMachines"
            :key="machine.machineId"
            :class="{ 'table-danger': machine.machineStatus === 'D' }">
          <td>{{ machine.machineId }}</td>
          <td>
            <template v-if="editingMachineId === machine.machineId">
              <input
                  v-model="machine.machineName"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ machine.machineName }}
            </template>
          </td>
          <td>
            <template v-if="editingMachineId === machine.machineId">
              <input
                  v-model="machine.machineSerial"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ machine.machineSerial }}
            </template>
          </td>
          <td>
            <div v-if="editingMachineId === machine.machineId">
              <HospitalsDropdown
                  :hospitals="hospitals"
                  :selected-hospital-id="machine.hospitalId"
                  @event-new-hospital-selected="val => machine.hospitalId = val"
              />
            </div>
            <div v-else>
              {{ getHospitalName(machine.hospitalId) }}
            </div>
          </td>
          <td>
            <template v-if="editingMachineId === machine.machineId">
              <input
                  v-model="machine.machineDescription"
                  class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ machine.machineDescription }}
            </template>
          </td>
          <td>
            <template v-if="editingMachineId !== machine.machineId">
              <select
                  v-model="machine.machineStatus"
                  @change="updateMachineStatus(machine)"
                  class="form-select form-select-sm"
              >
                <option value="A">Active</option>
                <option value="D">Deactive</option>
              </select>
            </template>
            <template v-else>
              <select
                  v-model="machine.machineStatus"
                  class="form-select form-select-sm"
              >
                <option value="A">Active</option>
                <option value="D">Deactive</option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="editingMachineId === machine.machineId">
              <span
                  role="button"
                  class="text-success me-2"
                  style="cursor: pointer"
                  @click="saveMachine(machine)">
                <font-awesome-icon icon="check"/>
              </span>
              <span
                  role="button"
                  class="text-secondary me-2"
                  style="cursor: pointer"
                  @click="cancelEditMachine()">
                <font-awesome-icon icon="times"/>
              </span>
            </template>
            <template v-else>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-warning btn-sm" title="Muuda seadet"
                        @click="startEditMachine(machine)">
                  <font-awesome-icon icon="pen-to-square"/>
                </button>
                <button class="btn btn-outline-danger btn-sm" title="Kustuta seade"
                        @click="openDeleteConfirmation('machine', machine.machineId, machine.machineName)">
                  <font-awesome-icon icon="trash"/>
                </button>
              </div>
            </template>
          </td>
        </tr>

        </tbody>
      </table>

      <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-outline-success btn-sm" title="Lisa seade"
                @click="startAddMachine">
          <font-awesome-icon icon="plus"/>
        </button>
        <AddMachineModal
            :modal-is-open="showAddMachine"
            @event-close-modal="closeAddMachine"
            @event-save-machine="createMachine"
        />

      </div>
    </div>

    <div>
      <h2 class="text-center mb-3">Haiglad</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Haigla nimi</th>
          <th>Aadress</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hospital in sortedHospitals" :key="hospital.hospitalId">
          <td>{{ hospital.hospitalId }}</td>
          <td>
            <template v-if="editingHospitalId === hospital.hospitalId">
              <input v-model="hospital.hospitalName" class="form-control form-control-sm"/>
            </template>
            <template v-else>{{ hospital.hospitalName }}</template>
          </td>
          <td>
            <template v-if="editingHospitalId === hospital.hospitalId">
              <input v-model.number="hospital.hospitalAddress" class="form-control form-control-sm"/>
            </template>
            <template v-else>{{ hospital.hospitalAddress }}</template>
          </td>
          <td>
            <template v-if="editingHospitalId === hospital.hospitalId">
              <span
                  role="button"
                  class="text-success me-2"
                  style="cursor: pointer"
                  @click="saveHospital(hospital)"
              >
            <font-awesome-icon icon="check"/>
          </span>
              <span
                  role="button"
                  class="text-secondary"
                  style="cursor: pointer"
                  @click="cancelEditHospital()"
              >
            <font-awesome-icon icon="times"/>
          </span>
            </template>
            <template v-else>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-warning btn-sm" title="Muuda haiglat"
                        @click="startEditHospital(hospital)">
                  <font-awesome-icon icon="pen-to-square"/>
                </button>
                <button class="btn btn-outline-danger btn-sm" title="Kustuta haigla"
                        @click="openDeleteConfirmation('hospital', hospital.hospitalId, hospital.hospitalId)">
                  <font-awesome-icon icon="trash"/>
                </button>
              </div>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end mt-2">
        <div>
          <button class="btn btn-outline-success btn-sm" title="Lisa haigla"
                  @click="startAddHospital">
            <font-awesome-icon icon="plus"/>
          </button>
        </div>
      </div>
      <AddHospitalModal
          :modal-is-open="showAddHospital"
          @event-close-modal="closeAddHospital"
          @event-save-isotope="createHospital"
      />
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
import HospitalsDropdown from "@/components/hospital/HospitalsDropdown.vue";
import HospitalService from "@/services/HospitalService";
import AddHospitalModal from "@/components/modal/AddHospitalModal.vue";

export default {
  name: 'TechnicConfigurationView',
  components: {
    HospitalsDropdown,
    AddHospitalModal,
    AddIsotopeModal,
    AddCalculationSettingModal,
    AddMachineModal,
    ConfirmDeleteModal
  },
  data() {
    return {
      showAddIsotope: false,
      showAddCalculationSetting: false,
      showAddMachine: false,
      showAddHospital: false,
      showDeleteModal: false,
      editingMachineId: null,
      _machineBackup: null,
      editingIsotopeId: null,
      _isotopeBackup: null,
      editingCalculationSettingId: null,
      _calculationSettingBackup: null,
      editingHospitalId: null,
      _hospitalBackup: null,

      userId: Number(sessionStorage.getItem(('userId'))),
      roleName: sessionStorage.getItem('roleName'),

      deleteTarget: {
        id: null,
        type: null,
        label: ''
      },

      hospitals: [],

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
          injectionInterval: 0,
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

  computed: {

    sortedHospitals() {
      return [...this.hospitals]
          .sort((a, b) => a.hospitalId - b.hospitalId)
    },

    sortedCalculationSettings() {
      return [...this.calculationSettings]
          .sort((a, b) => a.settingId - b.settingId)
    },
    sortedMachines() {
      return [...this.machines].sort((a, b) => {
        if (a.machineStatus !== b.machineStatus) {
          return a.machineStatus === 'A' ? -1 : 1
        }
        return a.machineId - b.machineId
      })
    },

    sortedIsotopes() {
      return [...this.isotopes].sort((a, b) => {
        if (a.isotopeStatus !== b.isotopeStatus) {
          return a.isotopeStatus === 'A' ? -1 : 1
        }
        return a.isotopeId - b.isotopeId
      })
    },
  },

  methods: {

    getHospitalName(hospitalId) {
      const h = this.hospitals.find(h => h.hospitalId === hospitalId);
      return h ? h.hospitalName : "-"
    },

    getAllHospitals() {
      HospitalService.sendGetHospitalRequest()
          .then(response => {
            this.hospitals = response.data;
          })
          .catch(() => Navigation.navigateToErrorView());
    },

    startEditHospital(hospital) {
      this.editingHospitalId = hospital.hospitalId
      this._hospitalBackup = {...hospital}
    },

    startEditCalculationSetting(cs) {
      this.editingCalculationSettingId = cs.settingId
      this._calculationSettingBackup = {...cs}
    },

    startEditMachine(machine) {
      this.editingMachineId = machine.machineId
      // clone
      this._machineBackup = {...machine}
    },

    startEditIsotope(isotope) {
      this.editingIsotopeId = isotope.isotopeId
      this._isotopeBackup = {...isotope}
    },

    cancelEditHospital() {
      Object.assign(
          this.hospitals.find(hospital => hospital.hospitalId === this._hospitalBackup.hospitalId),
          this._hospitalBackup
      )
      this.editingHospitalId = null
    },

    cancelEditCalculationSetting() {
      Object.assign(
          this.calculationSettings.find(cs => cs.settingId === this._calculationSettingBackup.settingId),
          this._calculationSettingBackup
      )
      this.editingCalculationSettingId = null
    },

    cancelEditIsotope() {
      Object.assign(
          this.isotopes.find(isotope => isotope.isotopeId === this._isotopeBackup.isotopeId),
          this._isotopeBackup
      )
      this.editingIsotopeId = null
    },

    cancelEditMachine() {
      // if you backed up, restore it:
      Object.assign(
          this.machines.find(machine => machine.machineId === this._machineBackup.machineId),
          this._machineBackup
      );
      this.editingMachineId = null
    },

    saveCalculationSetting(cs) {
      const payload = {
        settingId: cs.settingId,
        settingMinActivity: cs.settingMinActivity,
        settingMaxActivity: cs.settingMaxActivity,
        settingMinVolume: cs.settingMinVolume,
        settingMachineVolumeMax: cs.settingMachineVolumeMax,
        settingMachineVolumeMin: cs.settingMachineVolumeMin,
        injectionInterval: cs.injectionInterval,
        defaultPatientWeight: cs.defaultPatientWeight,
        activityPerKg: cs.activityPerKg,
      };

      CalculationSettingService
          .sendUpdateCalculationSettingRequest(cs.settingId, payload)
          .then(() => {
            this.editingCalculationSettingId = null;
            this.getAllCalculationSettings();
          })
          .catch(error => console.error(error))
    },

    saveHospital(hospital) {
      HospitalService.sendUpdateHospitalRequest(hospital.hospitalId, {
        hospitalName: hospital.hospitalName,
        hospitalAddress: hospital.hospitalAddress,
      })
          .then(() => {
            this.editingHospitalId = null
            this.getAllHospitals()
          })
          .catch(error => console.error(error))
    },

    saveMachine(machine) {
      MachineService.sendUpdateMachineRequest(machine.machineId, {
        machineName: machine.machineName,
        machineSerial: machine.machineSerial,
        machineDescription: machine.machineDescription,
        hospitalId: machine.hospitalId,
      })
          .then(() => {
            this.editingMachineId = null
            this.getAllMachines()
          })
          .catch(error => console.error(error))
    },

    saveIsotope(isotope) {
      IsotopeService.sendUpdateIsotopeRequest(isotope.isotopeId, {
        isotopeName: isotope.isotopeName,
        halfLifeHr: isotope.halfLifeHr,
        unit: isotope.unit,
      })
          .then(() => {
            this.editingIsotopeId = null
            this.getAllIsotopes()
          })
          .catch(error => console.error(error))
    },

    openDeleteConfirmation(type, id, name) {
      this.deleteTarget = {
        id, type, label: name
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
      if (type === "machine") {
        call = MachineService.sendDeleteMachineRequest(id)
      } else if (type === "isotope") {
        call = IsotopeService.sendDeleteIsotopeRequest(id)
      } else if (type === "calculationsetting") {
        call = CalculationSettingService.sendDeleteCalculationSettingRequest(id)
      }
      call
          .then(() => {
            if (type === "machine") {
              this.machines = this.machines
                  .filter(machine => machine.machineId !== id)
            } else if (type === "isotope") {
              this.isotopes = this.isotopes
                  .filter(isotope => isotope.isotopeId !== id)
            } else {
              this.calculationSettings = this.calculationSettings
                  .filter(cs => cs.settingId !== id)
            }
          })
          .catch(error => console.error(error))
          .finally(this.cancelDelete)
    },

    updateMachineStatus(machine) {
      MachineService.sendUpdateMachineStatusRequest(machine.machineId, machine.machineStatus)
          .then(() => this.getAllMachines())
          .catch(error => console.error(error))
    },

    updateIsotopeStatus(isotope) {
      IsotopeService.sendUpdateIsotopeStatusRequest(isotope.isotopeId, isotope.isotopeStatus)
          .then(() => this.getAllIsotopes())
          .catch(error => console.error(error))
    },

    createHospital(hospitalData) {
      HospitalService.sendPostHospitalRequest(hospitalData)
          .then(() => this.getAllHospitals())
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

    startAddCalculationSetting() {
      this.showAddCalculationSetting = true
    },

    startAddHospital() {
      this.showAddHospital = true
    },

    startAddMachine() {
      this.showAddMachine = true
    },

    closeAddHospital() {
      this.showAddHospital = false
    },

    closeAddCalculationSetting() {
      this.showAddCalculationSetting = false
    },
    closeAddIsotope() {
      this.showAddIsotope = false
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
          .then(response =>
              this.calculationSettings = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    getAllMachines() {
      MachineService.sendGetMachineRequest()
          .then(response => this.machines = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },
  },
  beforeMount() {
    this.getAllHospitals()
    this.getAllIsotopes()
    this.getAllMachines()
    this.getAllCalculationSettings()
  }
}
</script>