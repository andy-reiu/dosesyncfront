<template>
  <div class="home background-wrapper">
    <div class="overlay-box container p-4 shadow-sm rounded mt-5">
      <!-- Outer card wrapper to create the box -->
      <div class="card p-4 shadow-sm">
        <h2 class="text-center mb-4">Doosi kalkulaator</h2>

        <AlertDanger :error-message="errorMessage"/>
        <AlertSuccess :success-message="successMessage"/>

        <!-- Isotope Selection -->
        <div class="row justify-content-center mb-3">
          <div class="col-lg-6">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Vali isotoop</h5>
                <select id="isotope" v-model="selectedIsotopeId" @change="handleIsotopeChange" class="form-select mt-2">
                  <option disabled value="0">-- Vali isotoop --</option>
                  <option v-for="isotope in isotopes" :key="isotope.isotopeId" :value="isotope.isotopeId">
                    {{ isotope.isotopeName }}
                  </option>
                </select>
                <div v-if="selectedIsotope" class="mt-2">
                  <small class="text-muted">Poolestusaeg: <strong>{{ selectedIsotope.halfLifeHr }}</strong> tundi</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Fields -->
        <div class="row justify-content-center">
          <div class="col-md-4 mb-3">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Kellaaeg algsuses</h5>
                <input type="time" v-model="calibrationTime" class="form-control mt-2" />
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Kellaaeg lõpus</h5>
                <input type="time" v-model="injectionTime" class="form-control mt-2" />
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Aktiivsus alguses (MBq)</h5>
                <input type="number" v-model.number="initialActivity" class="form-control mt-2" />
              </div>
            </div>
          </div>++

          +

        </div>

        <!-- Calculate Button -->
        <div class="row justify-content-center">
          <div class="col-auto">
            <button @click="calculateDecay" class="btn btn-outline-success btn-lg px-4">
              <font-awesome-icon :icon="['fas', 'calculator']" />
              Arvuta
            </button>
          </div>
        </div>

        <!-- Result -->
        <div class="row justify-content-center mt-4" v-if="decayedActivity !== null">
          <div class="col-md-6">
            <div class="card text-white bg-success shadow">
              <div class="card-body">
                <h5 class="card-title">Aktiivsus lõpus</h5>
                <p class="card-text fs-5">{{ decayedActivity.toFixed(3) }} MBq</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IsotopeService from "@/services/IsotopeService";
import Navigation from "@/navigations/Navigation";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "DoseCalculatorView",
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      isotopes: [],
      selectedIsotopeId: 0,
      calibrationTime: '',
      injectionTime: '',
      initialActivity: null,
      decayedActivity: null,
      errorMessage: '',
      successMessage: '',
    };
  },
  computed: {
    selectedIsotope() {
      return this.isotopes.find(isotope => isotope.isotopeId === this.selectedIsotopeId) || null;
    }
  },
  methods: {
    getAllIsotopes() {
      IsotopeService.sendGetIsotopeRequest()
          .then(response => this.isotopes = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    handleIsotopeChange() {
      this.decayedActivity = null;
    },

    calculateDecay() {
      if (!this.calibrationTime || !this.injectionTime || !this.initialActivity || !this.selectedIsotope) {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
        return;
      }

      const halfLifeHr = this.selectedIsotope.halfLifeHr;
      const halfLifeDays = halfLifeHr / 24.0;

      const [calH, calM] = this.calibrationTime.split(":").map(Number);
      const [injH, injM] = this.injectionTime.split(":").map(Number);

      const calMinutes = calH * 60 + calM;
      let injMinutes = injH * 60 + injM;

      let deltaMinutes = injMinutes - calMinutes;
      if (deltaMinutes < 0) {
        deltaMinutes += 24 * 60; // Assume next day injection
      }

      const deltaTDays = deltaMinutes / 1440.0; // minutes per day = 1440
      const decayFactor = Math.pow(2, -deltaTDays / halfLifeDays);
      this.decayedActivity = this.initialActivity * decayFactor;
      this.errorMessage = '';
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

    resetSuccessMessage() {
      this.successMessage = ''
    }
  },

  beforeMount() {
    this.getAllIsotopes()
  }
}
</script>

