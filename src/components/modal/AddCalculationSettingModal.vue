<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="$emit('event-close-modal')"
    >
      <template #title>
        <div class="d-flex flex-column align-items-center">
          <h5>Lisa uus kalkulatsioon</h5>
        </div>
      </template>
      <template #body>
        <form>
          <div class="mb-3">

            <label class="form-label">Min Activity</label>
            <input
                v-model="newCalculationSetting.settingMinActivity"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Max Activity</label>
            <input
                v-model="newCalculationSetting.settingMaxActivity"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Min Volume</label>
            <input
                v-model="newCalculationSetting.settingMinVolume"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Machine Volume Min</label>
            <input
                v-model="newCalculationSetting.settingMachineVolumeMin"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Machine Volume Max</label>
            <input
                v-model="newCalculationSetting.settingMachineVolumeMax"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label"> Injection interval</label>
            <input
                v-model="newCalculationSetting.injectionInterval"
                type="time"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Patsiendi Kaal(kg)</label>
            <input
                v-model="newCalculationSetting.defaultPatientWeight"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Aktiivsus süstlas</label>
            <input
                v-model="newCalculationSetting.activityPerKg"
                type="number"
                class="form-control"
                required
            />
          </div>


        </form>
      </template>
      <template #footer>
        <button @click="addNewCalculationSetting"
                type="button"
                class="btn-success btn-outline-success">
          Salvesta uus kalkulatsioon
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AddCalculationSettingModal',
  components: {AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      newCalculationSetting: {
        settingMinActivity: 0,
        settingMaxActivity: 0,
        settingMinVolume: 0,
        settingMachineVolumeMax: 0,
        settingMachineVolumeMin: 0,
        injectionInterval: '',
        defaultPatientWeight: 0,
        activityPerKg: 0,
      }
    }
  },
  methods: {
    addNewCalculationSetting() {
      this.$emit('event-save-calculation-setting', this.newCalculationSetting)
      this.$emit('event-close-modal')
    }
  }
}
</script>