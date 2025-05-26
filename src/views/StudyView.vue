<template>
  <div class="home">
    <NewCalculationProfileModal :modal-is-open="newCalculationProfileIsOpen"
                                @event-close-modal="closeCalculationProfileView"
                                :study-id="studyId"
                                @event-new-calculation-profile-made="getAllStudiesCalculationProfiles"
    />
    <NewPatientInjectionModal :modal-is-open="newPatientInjectionIsOpen"
                              @event-close-modal="closePatientInjectionsView"
                              :study-id="studyId"
                              :isotope-id="isotopeId"
                              @event-new-patient-injection-made="getAllStudiesPatientInjections"
    />
    <div class="container text-center">

      <!-- Header Section -->
      <div class="row">
        <h1>study id: {{ studyId }} </h1>
        <div class="col mt-4">
          <AlertDanger :error-message="errorMessage"/>
        </div>
      </div>

      <!-- Calculation Profile Section -->
      <div class="col">
        <h2 class="text-center mb-3">Kalkulatsiooni profiilid</h2>
          <CalculationProfile :calculationProfiles="calculationProfiles"
                              :study-id="studyId"
                              @event-update-calculation-profile="getAllStudiesCalculationProfiles"
          />
          <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
            <font-awesome-icon icon="plus" class="fa-2x text-success" role="button"
                               @click="addCalculationProfileView()"
            />
          </div>
      </div>

      <!-- Patients && Injection Section -->
      <div class="row">
        <div class="col">
          <h2 class="text-center mb-3">Patsiendi süstid</h2>
          <PatientInjection :patientInjections="patientInjections"
                            :study-id="studyId"
                            @event-update-patient-injections="getAllStudiesPatientInjections"
          />
          <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
            <font-awesome-icon icon="plus" class="fa-2x text-success" role="button"
                               @click="addPatientInjectionsView()"
            />
          </div>
        </div>

      </div>
      <div class="col">
        <!-- Machine fill Section -->
        <h2 class="text-center mb-3">Viaali aktiivsus ja täitmised</h2>
        <MachineFill :machineFills="machineFills"/>
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
                {{ calculationMachineRinseVolume }} mL
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card text-white bg-success">
            <div class="card-body">
              <h5 class="card-title">Jääk aktiivsus</h5>
              <p class="card-text">
                {{ calculationMachineRinseActivity }} MBq
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
import NewCalculationProfileModal from "@/components/modal/NewCalculationProfileModal.vue";
import CalculationProfileService from "@/services/CalculationProfileService";
import Navigation from "@/navigations/Navigation";
import NewPatientInjectionModal from "@/components/modal/NewPatientInjectionModal.vue";
import PatientInjectionService from "@/services/PatientInjectionService";
import MachineFillService from "@/services/MachineFillService";

export default {
  name: "StudyView",
  components: {
    NewPatientInjectionModal,
    NewCalculationProfileModal,
    MachineFill,
    PatientInjection,
    AlertDanger,
    CalculationProfile,
    NewStudyModal
  },

  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      studyId: Number(useRoute().query.studyId),
      isotopeId: Number(useRoute().query.isotopeId),
      errorMessage: '',
      successMessage: '',
      isAdmin: false,

      newCalculationProfileIsOpen: false,
      newPatientInjectionIsOpen: false,

      calculationMachineRinseVolume: 2,
      calculationMachineRinseActivity: 548,

      calculationProfiles: [
        {
          calculationProfileId: 0,
          calibratedActivity: 0,
          calibrationTime: '',
          fillVolume: 0
        }
      ],

      patientInjections: [
        {
          injectionId: 0,
          acc: '',
          patientNationalId: '',
          injectionWeight: 0,
          injectionMbqKg: 0,
          injectedTime: '',
          injectedActivity: 0
        }
      ],
      machineFills: [
        {
          machineFillId: 0,
          vialActivityBeforeInjection: 0,
          vialActivityAfterInjection: 0,
          injectedVolume: 0,
          remainingVolume: 0
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    getAllStudiesCalculationProfiles() {
      CalculationProfileService.sendGetStudiesCalculationProfilesRequest(this.studyId)
          .then(response => this.handleGetCalculationProfilesSuccessResponse(response))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetCalculationProfilesSuccessResponse(response) {
      this.calculationProfiles = response.data
      this.closeCalculationProfileView()
      this.getAllStudiesMachineFills()
    },

    getAllStudiesPatientInjections() {
      PatientInjectionService.sendGetStudiesPatientInjectionRequest(this.studyId)
          .then(response => this.handleGetStudiesPatientInjectionSuccessResponse(response))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudiesPatientInjectionSuccessResponse(response) {
      this.patientInjections = response.data
      this.closePatientInjectionsView()
      this.getAllStudiesMachineFills()
    },

    getAllStudiesMachineFills() {
      MachineFillService.sendGetMachineFillRequest(this.studyId)
          .then(value => this.handleGetStudiesMachineFillSuccessResponse(value))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudiesMachineFillSuccessResponse(response) {
      this.machineFills = response.data
    },

    addCalculationProfileView() {
      this.newCalculationProfileIsOpen = true;
    },
    closeCalculationProfileView() {
      this.newCalculationProfileIsOpen = false;
    },

    addPatientInjectionsView() {
      this.newPatientInjectionIsOpen = true;
    },

    closePatientInjectionsView() {
      this.newPatientInjectionIsOpen = false;
    },
  },
  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
    this.getAllStudiesCalculationProfiles()
    this.getAllStudiesPatientInjections()
    this.getAllStudiesMachineFills()
  },
}
</script>

