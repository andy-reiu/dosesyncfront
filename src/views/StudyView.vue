<template>
  <div class="home">
    <div class="container text-center">
      <!-- Header Section -->
      <div class="row">
        <h1>study id: {{studyId}} </h1>
        <h1>isotopeId: {{isotopeId}} </h1>
        <div class="col mt-4">
          <AlertDanger :error-message="errorMessage"/>
        </div>
      </div>

      <div class="col">
        <!-- Calculation Profile Section -->
        <h4>Kalkulatsiooni profiili koostamine</h4>
        <CalculationProfile :calculationProfiles="calculationProfiles"/>
        <div class="text-end">
          <button type="submit" @click="addCalculationProfileView()" class="btn btn-primary">Lisa uus profiil</button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <!-- Patients && Injection Section -->
          <h4>Patsiendid ja süstimine</h4>
          <PatientInjection :patientInjections="patientInjections"/>
          <div class="text-end">
            <button type="submit" @click="addPatientInjectionsView()" class="btn btn-primary">Lisa uus patsient</button>
          </div>
        </div>

        <div class="col">
          <!-- Machine fill Section -->
          <h4>Kalkuleeritud kogused</h4>
          <MachineFill :machineFills="machineFills"/>
        </div>
      </div>

      <div class="row mt-4 justify-content-center">
        <div class="col-md-4 text-center">
          <!-- Rinse Calculation Button -->
          <button class="btn btn-warning w-100" @click="calculateRinseValues">
            Arvuta Loputusmaht
          </button>
        </div>
        <div class="col-md-4 text-center">
          <!-- Save study -->
          <button class="btn btn-success w-100" @click="saveStudy">
            Salvesta kõik
          </button>
        </div>
      </div>

      <!-- Rinse Result Cards -->
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <h5 class="card-title">Loputusmahl</h5>
              <p class="card-text">
                {{ calculationMachineRinseVolume}} mL
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card text-white bg-success">
            <div class="card-body">
              <h5 class="card-title">Jääk aktiivsus</h5>
              <p class="card-text">
                {{ calculationMachineRinseActivity}} MBq
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NewStudyModal from "@/components/modal/NewStudyModal.vue";
import CalculationProfile from "@/components/calculationprofile/CalculationProfile.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import PatientInjection from "@/components/patientinjection/PatientInjection.vue";
import RoleService from "@/services/RoleService";
import MachineFill from "@/components/machinefill/MachineFill.vue";
import {useRoute} from "vue-router";

export default {
  name: "StudyView",
  components: {MachineFill, PatientInjection, AlertDanger, CalculationProfile, NewStudyModal},

  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      studyId: Number(useRoute().query.studyId),
      errorMessage: '',
      successMessage: '',
      isAdmin: false,

      newCalculationProfileIsOpen: false,
      newPatientInjectionIsOpen: false,

      calculationMachineRinseVolume: 2,
      calculationMachineRinseActivity: 548,
      calculationProfiles: [
        {
          calculationProfileId: 1,
          studyId: 1,
          isotopeId: 1,
          calibratedActivity: 4500.00,
          calibrationTime: "09:30:00",
          administrationTime: "11:45:00",
          activityBeforeFirst: 1919,
          fillVolume: 6
        },
        {
          calculationProfileId: 2,
          studyId: 1,
          isotopeId: 2,
          calibratedActivity: 6600.00,
          calibrationTime: "09:30:00",
          administrationTime: "17:45:00",
          activityBeforeFirst: 5000,
          fillVolume: 23
        },
        {
          calculationProfileId: 3,
          studyId: 1,
          isotopeId: 2,
          calibratedActivity: 6600.00,
          calibrationTime: "09:30:00",
          administrationTime: "13:45:00",
          activityBeforeFirst: 1000,
          fillVolume: 21
        }
      ],
      patientInjections: [
        {
          injectionId: 1,
          patientNationalId: '12345678901',
          injectionWeight: 70.5,
          injectionMbqKg: 3.452,
          injectedTime: '09:15:00',
          injectedActivity: 120.50
        },
        {
          injectionId: 2,
          patientNationalId: '10987654321',
          injectionWeight: 65.0,
          injectionMbqKg: 2.870,
          injectedTime: '10:30:00',
          injectedActivity: 105.75
        },
        {
          injectionId: 3,
          patientNationalId: '56789012345',
          injectionWeight: 80.0,
          injectionMbqKg: 3.150,
          injectedTime: '11:45:00',
          injectedActivity: 135.00
        }
      ],
      machineFills: [
        {
          machineFillId: 1,
          vialActivityBeforeInjection: 1919.00,
          vialActivityAfterInjection: 1744.00,
          injectedVolume: 1.00,
          remainingVolume: 10.00
        },
        {
          machineFillId: 2,
          vialActivityBeforeInjection: 1443.00,
          vialActivityAfterInjection: 1268.00,
          injectedVolume: 1.21,
          remainingVolume: 8.78
        },
        {
          machineFillId: 3,
          vialActivityBeforeInjection: 1049.00,
          vialActivityAfterInjection: 874.00,
          injectedVolume: 1.47,
          remainingVolume: 7.32
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    addCalculationProfileView() {
      this.newCalculationProfileIsOpen = true;
    },
    closeCalculationProfileView() {
      this.newCalculationProfileIsOpen = false;
    },

    addPatientInjectionsView(){
      this.newPatientInjectionIsOpen = true;
    },

    closePatientInjectionsView(){
      this.newPatientInjectionIsOpen = false;
    }
  },
  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

