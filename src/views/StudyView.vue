<template>
  <div class="home background-wrapper">
    <div class="overlay-box container p-4 shadow-sm rounded">

      <NewCalculationProfileModal
          :modal-is-open="newCalculationProfileIsOpen"
          @event-close-modal="closeCalculationProfileView"
          :study-id="studyId"
          @event-new-calculation-profile-made="getAllStudiesCalculationProfiles"
      />
      <NewPatientInjectionModal
          :modal-is-open="newPatientInjectionIsOpen"
          @event-close-modal="closePatientInjectionsView"
          :study-id="studyId"
          :patient-injection="patientInjection"
          :isotope-id="isotopeId"
          @event-new-patient-injection-made="getAllStudiesPatientInjections"
          @event-update-patient-id="setPatientInjectionPatientId"
          @event-update-patient-weight="setPatientInjectionInjectionWeight"
          @event-update-injection-mbq-kg="setPatientInjectionMbqKg"
          @event-update-injected-time="setPatientInjectionTime"
          @event-update-injected-activity="setPatientInjectionActivity"
      />

      <div class="container text-center">
        <!-- Header Section -->
        <div class="row">
          <h2>StudyId: {{ studyId }} </h2>
          <h2>Päevaplaan isotoobi {{ isotopeName }} kasutamiseks. </h2>
          <div class="col mt-4"></div>
        </div>

        <!-- Calculation Profile Section -->
        <div class="col">
          <h2 class="text-center mb-3">Kalkulatsiooni profiilid</h2>
          <CalculationProfile
              :calculationProfiles="calculationProfiles"
              :study-id="studyId"
              @event-update-calculation-profile="getAllStudiesCalculationProfiles"
          />
          <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
            <button class="btn btn-outline-success btn-sm" @click="addCalculationProfileView()"
                    title="Lisa arvutusprofiil"
            >
              <font-awesome-icon icon="plus"/>
            </button>
          </div>
        </div>

        <!-- Patients && Injection Section -->
        <div class="row">
          <div class="col">
            <h2 class="text-center mb-3">Patsiendi süstid</h2>
            <PatientInjection
                :patientInjections="patientInjections"
                :study-id="studyId"
                @event-update-patient-injections="getAllStudiesPatientInjections"
            />
            <div v-if="isAdmin" class="d-flex justify-content-end mt-2">
              <button class="btn btn-outline-success btn-sm" @click="addPatientInjectionsView()"
                      title="Lisa patsiendi süstid">
                <font-awesome-icon icon="plus"/>
              </button>
            </div>
          </div>
        </div>

        <div class="col">
          <h2 class="text-center mb-3">Viaali aktiivsus ja täitmised</h2>
          <MachineFill :machineFills="machineFills"/>
        </div>

        <AlertDanger :error-message="errorMessage"/>
        <AlertSuccess :success-message="successMessage"/>

        <div class="row mt-4 justify-content-center">
          <div class="col-md-4 text-center">
            <button class="btn btn-outline-primary btn-md px-4" @click="getCalculationMachineRinseVolume()">
              <font-awesome-icon icon="calculator" class="me-2"/>
              Arvuta Loputusmaht
            </button>
          </div>
          <div class="col-md-4 text-center">
            <button class="btn btn-outline-success btn-md px-4" @click="saveStudy">
              <font-awesome-icon icon="save" class="me-2"/>
              Salvesta kogu uuring
            </button>
          </div>
        </div>

        <!-- Rinse Result Cards -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card shadow-sm border-primary">
              <div class="card-body d-flex align-items-center">
                <font-awesome-icon icon="tint" class="fa-2x text-primary me-3"/>
                <div>
                  <h5 class="card-title">Loputusmaht</h5>
                  <p class="card-text fs-4">{{ studyResult.calculationMachineRinseVolume }} mL</p>
                  <div class="progress" style="height: 6px;">
                    <div
                        class="progress-bar bg-primary"
                        role="progressbar"
                        :style="{ width: (Math.min(studyResult.calculationMachineRinseVolume, 4) / 4 * 100) + '%' }"
                        :aria-valuenow="studyResult.calculationMachineRinseVolume"
                        aria-valuemin="0"
                        aria-valuemax="4">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow-sm border-success">
              <div class="card-body d-flex align-items-center flex-column">
                <font-awesome-icon icon="radiation" class="fa-2x text-success me-3"/>
                <div>
                  <h5 class="card-title">Jääk aktiivsus</h5>
                  <p class="card-text fs-4">{{ studyResult.calculationMachineRinseActivity }} MBq</p>
                  <div class="progress" style="height: 6px;">
                    <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="{ width: Math.min(studyResult.calculationMachineRinseActivity, 100) + '%' }"
                        :aria-valuenow="studyResult.calculationMachineRinseActivity"
                        aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                </div>
                <!-- Warning message -->
                <div v-if="isRinseActivityLow" class="alert alert-warning mt-3 w-100 text-center">
                  <strong>Hoiatus:</strong> Jääk aktiivsus on alla 100 MBq!
                </div>
              </div>
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
import StudyService from "@/services/StudyService";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "StudyView",
  components: {
    AlertSuccess,
    NewPatientInjectionModal,
    NewCalculationProfileModal,
    MachineFill,
    PatientInjection,
    AlertDanger,
    CalculationProfile,
    NewStudyModal
  },
  computed: {
    isRinseActivityLow() {
      return this.studyResult.calculationMachineRinseActivity !== null
          && this.studyResult.calculationMachineRinseActivity < 100;
    }
  },

  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      studyId: Number(useRoute().query.studyId),
      isotopeId: Number(useRoute().query.isotopeId),
      isotopeName: useRoute().query.isotopeName,
      errorMessage: '',
      successMessage: '',
      isAdmin: false,

      newCalculationProfileIsOpen: false,
      newPatientInjectionIsOpen: false,

      calculationMachineRinseVolume: 0,
      calculationMachineRinseActivity: 0,

      calculationProfiles: [
        {
          calculationProfileId: 0,
          calibratedActivity: 0,
          calibrationTime: '',
          fillVolume: 0
        }
      ],

      patientInjection: {
        studyId: 0,
        acc: '',
        patientNationalId: '',
        injectionWeight: 0,
        injectionMbqKg: 0,
        injectedTime: '',
        injectedActivity: 0
      },

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
      },

      studyResult: {
        calculationMachineRinseVolume: null,
        calculationMachineRinseActivity: null
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

    executeGetPatientInjectionTemplate() {
      PatientInjectionService.sendGetStudiesPatientInjectionTemplateRequest(this.studyId)
          .then(value => this.handleGetStudiesPatientInjectionTemplateSuccessResponse(value))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudiesPatientInjectionTemplateSuccessResponse(value) {
      this.patientInjection = value.data
      this.patientInjection.studyId = this.studyId
    },

    getCalculationMachineRinseVolume() {
      StudyService.sendGetCalculateStudiesMachineRinseVolumeRequest(this.studyId)
          .then(value => this.handleGetStudiesMachineRinseVolumeSuccessResponse(value))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudiesMachineRinseVolumeSuccessResponse(value) {
      this.studyResult.calculationMachineRinseVolume = value.data
      this.getCalculationLastMachineRinseActivity()
    },

    getCalculationLastMachineRinseActivity() {
      StudyService.sendGetStudiesLastMachineRinseActivityRequest(this.studyId)
          .then(value => this.handleGetStudiesMachineActivitySuccessResponse(value))
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudiesMachineActivitySuccessResponse(value) {
      this.studyResult.calculationMachineRinseActivity = value.data
      this.getAllStudiesMachineFills()
      this.successMessage = 'Loputusmaht arvutatud.'
      setTimeout(this.resetSuccessMessage, 4000)
    },

    saveStudy() {
      if (this.studyResult.calculationMachineRinseVolume != null && this.studyResult.calculationMachineRinseVolume > 0) {
        StudyService.sendPostSaveStudyRequest(this.studyId)
            .then(value => this.handleSendPostSaveStudyRequest())
            .catch(reason => Navigation.navigateToErrorView());
      } else {
        this.errorMessage = 'Pole kalkulatsiooni tehtud.';
        setTimeout(this.resetErrorMessage, 4000);
      }
    },

    sendGetStudyResult() {
      StudyService.sendGetStudyResultRequest(this.studyId)
          .then(value => this.studyResult = value.data)
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleSendPostSaveStudyRequest() {
      this.successMessage = 'Uuring edukalt salvestatud.'
      setTimeout(this.resetSuccessMessage, 4000)
      Navigation.navigateToHomeView()
    },

    setPatientInjectionPatientId(patientNationalId) {
      this.patientInjection.patientNationalId = patientNationalId
    },

    setPatientInjectionInjectionWeight(injectionWeight) {
      this.patientInjection.injectionWeight = injectionWeight
    },

    setPatientInjectionMbqKg(activityWeight) {
      this.patientInjection.injectionMbqKg = activityWeight
    },

    setPatientInjectionTime(injectedTime) {
      this.patientInjection.injectedTime = injectedTime
    },

    setPatientInjectionActivity(injectedActivity) {
      this.patientInjection.injectedActivity = injectedActivity;
    },

    addCalculationProfileView() {
      this.newCalculationProfileIsOpen = true
    },

    closeCalculationProfileView() {
      this.newCalculationProfileIsOpen = false
    },

    addPatientInjectionsView() {
      if (this.calculationProfiles.length === 0) {
        this.errorMessage = 'Pole lisatud kalkulatsiooniprofiil.'
        setTimeout(this.resetErrorMessage, 4000)
      } else {
        this.executeGetPatientInjectionTemplate()
        this.newPatientInjectionIsOpen = true
      }
    },

    closePatientInjectionsView() {
      this.newPatientInjectionIsOpen = false
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

    resetSuccessMessage() {
      this.successMessage = ''
    }
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
    this.getAllStudiesCalculationProfiles()
    this.getAllStudiesPatientInjections()
    this.getAllStudiesMachineFills()
    this.sendGetStudyResult()
  },
}
</script>

