<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="$emit('event-close-modal')"
    >
      <template #title>
        <div class="text-center mb-4">
          <h5>Lisa uus kalkulatsioon</h5>
        </div>
      </template>
      <template #body>
        <AlertAllFields
            v-if="errorMessage"
            :errorMessage="errorMessage"
        />
        <form>
          <div class="mb-3">
            <label class="form-label">Min Activity</label>
            <input
                v-model="newCalculationSetting.settingMinActivity"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Max Activity</label>
            <input
                v-model="newCalculationSetting.settingMaxActivity"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Min Volume</label>
            <input
                v-model="newCalculationSetting.settingMinVolume"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Machine Volume Min</label>
            <input
                v-model="newCalculationSetting.settingMachineVolumeMin"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Machine Volume Max</label>
            <input
                v-model="newCalculationSetting.settingMachineVolumeMax"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label"> Injection interval</label>
            <input
                type="number"
                v-model.number="newCalculationSetting.injectionInterval"
                class="form-control w-50 mx-auto bg-light"
                min="1"
                max="60"
                step="1"
                placeholder="Minutes"
                required
            />
          </div>



          <div class="mb-3">
            <label class="form-label">Patsiendi Kaal(kg)</label>
            <input
                v-model="newCalculationSetting.defaultPatientWeight"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Aktiivsus süstlas</label>
            <input
                v-model="newCalculationSetting.activityPerKg"
                type="number"
                class="form-control w-50 mx-auto bg-light"
                required
            />
          </div>

        </form>
      </template>
      <template #footer>
        <button @click="addNewCalculationSetting" type="button" class="btn btn-success ">Salvesta</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertAllFields from "@/components/alert/AlertAllFields.vue";

export default {
  name: 'AddCalculationSettingModal',
  components: {AlertAllFields, Modal},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      newCalculationSetting: {
        settingMinActivity: null,
        settingMaxActivity: null,
        settingMinVolume: null,
        settingMachineVolumeMax: null,
        settingMachineVolumeMin: null,
        injectionInterval: null,
        defaultPatientWeight: null,
        activityPerKg: null,
      },
      errorMessage: ''
    }
  },
  methods: {

    addNewCalculationSetting() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.$emit('event-save-calculation-setting', this.newCalculationSetting);
        this.$emit('event-close-modal');
      } else {
        this.errorMessage = 'Täida kõik väljad';
        setTimeout(() => this.errorMessage = '', 4000);
      }
    },
    allFieldsAreWithCorrectInput() {
      const s = this.newCalculationSetting;
      return (
          s.settingMinActivity !== null &&
          s.settingMaxActivity !== null &&
          s.settingMinVolume !== null &&
          s.settingMachineVolumeMin !== null &&
          s.settingMachineVolumeMax !== null &&
          s.injectionInterval !== null &&
          s.defaultPatientWeight !== null &&
          s.activityPerKg !== null
      )},

  }
}
</script>