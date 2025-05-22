<template>
  <div class="home">
    <NewCalculationProfileModal :modal-is-open="newCalculationProfileIsOpen"
                                @event-close-modal="closeCalculationProfileView"
                                :isotope-id="isotopeId"
                                :study-id="studyId"
                                @event-new-calculation-profile-made="getAllStudiesCalculationProfiles"
    />
    <NewPatientInjectionModal :modal-is-open="newPatientInjectionIsOpen"
                              @event-close-modal="closePatientInjectionsView"
                              :study-id="studyId"
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

      <div class="col">
        <!-- Calculation Profile Section -->
        <h4>Kalkulatsiooni profiili koostamine</h4>
        <CalculationProfile :calculationProfiles="calculationProfiles"
                            :study-id="studyId"
                            @event-update-calculation-profile="getAllStudiesCalculationProfiles"
        />
        <div class="text-end">
          <button type="submit" @click="addCalculationProfileView()" class="btn btn-primary">Lisa uus profiil</button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <!-- Patients && Injection Section -->
          <h4>Patsiendid ja süstimine</h4>
          <PatientInjection :patientInjections="patientInjections"
                            :study-id="studyId"
                            @event-update-patient-injection="getAllStudiesPatientInjections"
          />
          <div class="text-end">
            <button type="submit" @click="addPatientInjectionsView()" class="btn btn-primary">Lisa uus patsiendi
              süstimine
            </button>
          </div>
        </div>

      </div>
      <div class="col">
        <!-- Machine fill Section -->
        <h4>Kalkuleeritud kogused</h4>
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
    getAllStudiesCalculationProfiles() {
      CalculationProfileService.sendGetStudiesCalculationProfilesRequest(this.studyId)
          .then(response => this.handleGetCalculationProfilesSuccessResponse(response))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetCalculationProfilesSuccessResponse(response) {
      this.calculationProfiles = response.data
      this.closeCalculationProfileView()
    },

    getAllStudiesPatientInjections() {
      PatientInjectionService.sendGetStudiesPatientInjectionRequest(this.studyId)
          .then(response => this.handleGetStudiesPatientInjectionSuccessResponse(response))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudiesPatientInjectionSuccessResponse(response) {
      this.patientInjections = response.data
      this.closePatientInjectionsView()
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
  },
}
</script>

