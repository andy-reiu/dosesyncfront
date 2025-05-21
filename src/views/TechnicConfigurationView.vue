<template>
  <div>

    <!-- ISOTOPES TABLE -->
    <h2>Isotoobid</h2>
    <table class="table w-75 table-hover table-light table-striped-columns mb-5">
      <thead class="table-dark">
      <tr>
        <th>ID</th><th>Isotoobi nimetus</th><th>Half-Life (hr)</th><th>Unit</th><th>Staatus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="isotope in isotopes" :key="isotope.isotopeId">
        <td>{{ isotope.isotopeId }}</td>
        <td>{{ isotope.isotopeName }}</td>
        <td>{{ isotope.halfLifeHr }}</td>
        <td>{{ isotope.unit }}</td>
        <td>{{ isotope.isotopeStatus }}</td>
      </tr>
      </tbody>
    </table>

    <!-- CALCULATION SETTINGS TABLE -->
    <h2>Kalkulatsiooni sätted</h2>
    <table class="table w-75 table-hover table-light table-striped-columns">
      <thead class = "table-dark">
      <tr>
        <th>ID</th><th>Min Activity</th><th>Max Activity</th><th>Min Volume</th><!-- etc. -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="calculationSetting in calculationSettings" :key="calculationSetting.settingId">
        <td>{{ calculationSetting.settingId }}</td>
        <td>{{ calculationSetting.settingMinActivity }}</td>
        <td>{{ calculationSetting.settingMaxActivity }}</td>
        <td>{{ calculationSetting.settingMinVolume }}</td>

      </tr>
      </tbody>
    </table>

    <!-- MACHINES TABLE -->
    <h2>Masinad</h2>
    <table class="table w-75 table-hover table-light table-striped-columns">
      <thead class = "table-dark">
      <tr>
        <th>ID</th><th>Masina nimetus</th><th>Serial</th><th>Tutvustus</th><th>Staatus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="machine in machines" :key="machine.machineId">
        <td>{{ machine.machineId }}</td>
        <td>{{ machine.machineName }}</td>
        <td>{{ machine.machineSerial }}</td>
        <td>{{ machine.machineDescription }}</td>
        <td>{{ machine.machineStatus }}</td>
      </tr>
      </tbody>
    </table>

    <!-- ERROR MESSAGE -->
    <div v-if="errorResponse.message" class="alert alert-danger">
      {{ errorResponse.errorCode }} — {{ errorResponse.message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import IsotopeService from "@/services/IsotopeService";
import Navigation from "@/navigations/Navigation";
import MachineService from "@/services/MachineService";
import CalculationSettingService from "@/services/CalculationSettingService";

export default {
  name: 'TechnicConfigurationView',
  data(){
    return {

      userId: Number(sessionStorage.getItem(('userId'))),
      roleName: sessionStorage.getItem('roleName'),

      isotopes: [
        {
          isotopeId: 0,
          isotopeName: '',
          halfLifeHr: '',
          unit: '',
          isotopeStatus:''
        },
      ],

      calculationSettings: [
        {
          settingId: 0,
          settingMinActivity: 0,
          settingMaxActivity: 0,
          settingMinVolume: 0,
          settingMachineVolumeMax: 0,
          settingMachineVolumeMin: 0
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

    getAllIsotopes() {
      IsotopeService.sendGetIsotopesRequest()
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