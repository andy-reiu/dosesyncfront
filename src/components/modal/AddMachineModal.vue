<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="handleCloseModal"
    >
      <template #title>
        <div class="d-flex flex-column align-items-center">
          <h5>Lisa uus masin</h5>
        </div>
      </template>
      <template #body>
        <AlertAllFields
            v-if="errorMessage"
            :errorMessage="errorMessage"
        />
        <form>
          <div class="mb-3">
            <div>
              <label class="form-label">Masina nimetus</label>
              <input v-model="newMachine.machineName"
                     type="text"
                     class="form-control w-50 mx-auto bg-light"
                     required/>
            </div>
            <div>
              <label class="form-label">Haigla</label>
              <HospitalsDropdown
                  :hospitals="hospitals"
                  :selected-hospital-id="newMachine.hospitalId"
                  @event-new-hospital-selected="newMachine.hospitalId = $event"
                  class="w-50 mx-auto bg-light text-center"
                  required
              />
            </div>
            <div>
              <label class="form-label">Masina seerialnumber</label>
              <input v-model="newMachine.machineSerial"
                     type="text"
                     class="form-control w-50 mx-auto bg-light"
                     required/>
            </div>
            <div>
              <label class="form-label">Masina kirjeldus</label>
              <input v-model="newMachine.machineDescription"
                     type="text"
                     class="form-control w-75 mx-auto bg-light"
                     required/>
            </div>
            <div>
              <label class="form-label">Masina staatus</label>
              <select v-model="newMachine.machineStatus"
                      class="form-select w-50 mx-auto bg-light text-center"
                      required>
                <option disabled value="" class="text-secondary">Vali staatus</option>
                <option value="A">Active</option>
                <option value="D">Deactive</option>
              </select>
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <button @click="addNewMachine" type="button" class="btn btn-success">Salvesta</button>
      </template>
    </Modal>
  </div>

</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import HospitalService from "@/services/HospitalService";
import Navigation from "@/navigations/Navigation";

import HospitalsDropdown from "@/components/hospital/HospitalsDropdown.vue";
import AlertAllFields from "@/components/alert/AlertAllFields.vue";

export default {
  name: 'AddMachineModal',
  components: {AlertAllFields, Modal, HospitalsDropdown},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {

      hospitals: [],
      newMachine: {
        hospitalId: null,
        machineName: '',
        machineSerial: '',
        machineDescription: '',
        machineStatus: '',
      },
      errorMessage: ''
    }
  },
  methods: {

    handleCloseModal() {
      this.resetModalDataFields()
      this.$emit('event-close-modal')
    },

    resetModalDataFields() {
      this.newMachine = {
        hospitalId: null,
        machineName: '',
        machineSerial: '',
        machineDescription: '',
        machineStatus: '',
      }
      this.errorMessage = ''
    },

    addNewMachine() {
      if (this.allFieldsWithCorrectInput()) {
        this.$emit('event-save-machine', this.newMachine);
        this.resetModalDataFields();
        this.$emit('event-close-modal');
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(() => this.errorMessage = '', 4000)
      }
    },

    allFieldsWithCorrectInput() {
      const mach = this.newMachine
      return (
          mach.hospitalId !== null &&
          mach.machineName !== null &&
          mach.machineSerial !== null &&
          mach.machineDescription !== null &&
          mach.machineStatus !== null
      )
    },

    getAllHospitals() {
      HospitalService.sendGetHospitalRequest()
          .then(response => this.hospitals = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },
  },
  beforeMount() {
    this.getAllHospitals()

  }
}
</script>