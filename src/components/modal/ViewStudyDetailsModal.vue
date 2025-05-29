<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog"
       style="background-color: rgba(0,0,0,0.5); z-index: 1055;">
    <div class="modal-dialog modal-fullscreen" role="document">
      <div class="modal-content">
        <!-- Header -->
        <div class="row mb-4" v-if="study.studyId">
          <div class="col">
            <h2 class="fw-bold">
              Uuringu kuupäev: {{ study.studyDate }}
            </h2>
            <h3 class="fw-bold" style="border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Uuringu ID: {{ study.studyId }}, Isotoop: {{ study.isotopeName }}
            </h3>
            <button
                type="button" class="btn-close position-absolute top-0 end-0 mt-2 me-4"
                @click="$emit('event-close-modal')" aria-label="Close"
            />
          </div>
        </div>
        <!-- Body -->
        <div class="modal-body overflow-auto">
          <div class="container text-center">
            <!-- Study Info -->
            <div class="row mb-4">
              <h2>Kalkulatsiooni profiilid</h2>
              <CalculationProfile :calculationProfiles="calculationProfiles" :study-id="studyId"
              />
            </div>

            <div class="row mb-4">
              <h2>Patsiendi süstid</h2>
              <PatientInjection :patientInjections="patientInjections" :study-id="studyId"
              />
            </div>

            <div class="row mb-4">
              <h2>Viaali aktiivsus ja täitmised</h2>
              <MachineFill :machineFills="machineFills"/>
            </div>

            <div class="row mt-4">
              <div class="col-md-6 mb-2">
                <div class="card text-white bg-primary">
                  <div class="card-body">
                    <h5 class="card-title">Loputusmaht</h5>
                    <p class="card-text">{{ calculationMachineRinseVolume }} mL</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div class="card text-white bg-success">
                  <div class="card-body">
                    <h5 class="card-title">Jääk aktiivsus</h5>
                    <p class="card-text">{{ calculationMachineRinseActivity }} MBq</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div class="modal-footer d-flex justify-content-between align-items-center">
          <div class="flex-grow-1 text-center">
            <h5 class="fw-bold mb-0" style="border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              {{ profileInfo.hospitalName }}. Koostas: {{ profileInfo.firstName }} {{ profileInfo.lastName }}
            </h5>
          </div>
          <button type="button" class="btn btn-secondary ms-3"
                  @click="$emit('event-close-modal')">Sulge
          </button>
          <button type="button" class="btn btn-primary ms-3"
                  @click="printStudyDetails">
            Salvesta PDF-na
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import StudyService from '@/services/StudyService'
import Navigation from "@/navigations/Navigation";
import CalculationProfile from "@/components/calculationprofile/CalculationProfile.vue";
import PatientInjection from "@/components/patientinjection/PatientInjection.vue";
import MachineFill from "@/components/machinefill/MachineFill.vue";
import CalculationProfileService from "@/services/CalculationProfileService"
import PatientInjectionService from "@/services/PatientInjectionService"
import MachineFillService from "@/services/MachineFillService"
import ProfileService from "@/services/ProfileService";
import html2pdf from 'html2pdf.js';
import RoleService from "@/services/RoleService";

export default {
  name: 'ViewStudyDetails',
  components: {MachineFill, PatientInjection, CalculationProfile},
  props: {
    modalIsOpen: {
      type: Boolean,
      required: true
    },
    studyId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      userId: 0,
      isStudyModalOpen: true,
      study: [],
      calculationProfiles: [],
      patientInjections: [],
      machineFills: [],
      profileInfo: [],
      calculationMachineRinseVolume: 0,
      calculationMachineRinseActivity: 0,
      originalRole: null,
    }
  },

  methods: {

    getAllStudiesCalculationProfiles() {
      CalculationProfileService.sendGetStudiesCalculationProfilesRequest(this.studyId)
          .then(response => {
            this.calculationProfiles = response.data
            this.getAllStudiesMachineFills()
          })
          .catch(reason => Navigation.navigateToErrorView())
    },

    getAllStudiesPatientInjections() {
      PatientInjectionService.sendGetStudiesPatientInjectionRequest(this.studyId)
          .then(response => {
            this.patientInjections = response.data
            this.getAllStudiesMachineFills()
          })
          .catch(reason => Navigation.navigateToErrorView())
    },

    getAllStudiesMachineFills() {
      MachineFillService.sendGetMachineFillRequest(this.studyId)
          .then(response => this.machineFills = response.data)
          .catch(reason => Navigation.navigateToErrorView())
    },

    getCalculationMachineRinseVolume() {
      StudyService.sendGetCalculateStudiesMachineRinseVolumeRequest(this.studyId)
          .then(response => {
            this.calculationMachineRinseVolume = response.data
            this.getCalculationLastMachineRinseActivity()
          })
          .catch(reason => Navigation.navigateToErrorView())
    },

    getCalculationLastMachineRinseActivity() {
      StudyService.sendGetStudiesLastMachineRinseActivityRequest(this.studyId)
          .then(response => this.calculationMachineRinseActivity = response.data)
          .catch(reason => Navigation.navigateToErrorView())
    },

    loadSelectedStudy() {
      StudyService.sendGetStudyRequest(this.studyId)
          .then(response => this.handleGetStudyResponse(response))
          .catch(reason => Navigation.navigateToErrorView(reason))
    },

    getStudyProfile() {
      ProfileService.sendGetProfileRequest(this.studyId)
          .then(response => this.profileInfo = response.data)
          .catch(reason => Navigation.navigateToErrorView())
    },

    handleGetStudyResponse(response) {
      return this.study = response.data;
    },

    closeStudyModal() {
      this.isStudyModalOpen = false;
    },

    printStudyDetails() {
      const modalContent = this.$el.querySelector('.modal-content');

      // Hide all buttons before print
      const buttons = modalContent.querySelectorAll('button');
      buttons.forEach(btn => btn.style.display = 'none');

      const opt = {
        margin: 0.5,
        filename: `${this.study.studyDate}.${this.study.isotopeName} study-${this.studyId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
      };

      html2pdf()
          .set(opt)
          .from(modalContent)
          .save()
          .then(() => {
            buttons.forEach(btn => btn.style.display = '');
          })
          .catch(err => {
            console.error('Failed to generate PDF:', err);
            buttons.forEach(btn => btn.style.display = '');
          });
    }
  },

  beforeMount() {
    this.loadSelectedStudy()
    this.getAllStudiesCalculationProfiles()
    this.getAllStudiesPatientInjections()
    this.getAllStudiesMachineFills()
    this.getCalculationMachineRinseVolume()
    this.getStudyProfile()
  }
}
</script>
