<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="$emit('event-close-modal')"
    >
      <template #title>
        <div class="d-flex flex-column align-items-center">
          <h5>Lisa uus masin</h5>
        </div>
      </template>
      <template #body>
        <form>
        <div class="mb-3">
          <div >

            <label class="form-label">Haigla</label>
            <HospitalsDropdown
                :hospitals="hospitals"
                :selected-hospital-id="newMachine.hospitalId"
                @event-new-hospital-selected="newMachine.hospitalId = $event"
            />


          </div>

          <div >
            <label class="form-label">Masina nimetus</label>
            <input v-model="newMachine.machineName"
                   type="text"
                   class="form-control "
                   required
            />
          </div>

          <div>
            <label class="form-label">Masina seerialnumber</label>
            <input v-model="newMachine.machineSerial"
                   type="text"
                   class="form-control"
                   required
            />
          </div>

          <div>
            <label class="form-label">Masina kirjeldus</label>
            <input v-model="newMachine.machineDescription"
                   type="text"
                   class="form-control"
                   required
            />
          </div>

          <div>
            <label class="form-label">Masina staatus</label>
            <select
                v-model="newMachine.machineStatus"
                class="form-control"
                required
            >
              <option disabled value="">Vali staatus</option>
              <option value="A">Active</option>
              <option value="D">Deactive</option>
            </select>
          </div>
        </div>
        </form>
      </template>
      <template #footer>
        <button @click="addNewMachine" type="button" class="btn-success btn-outline-success">
          Salvesta uus masin
        </button>
      </template>
    </Modal>
  </div>

</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import HospitalService from "@/services/HospitalService";
import Navigation from "@/navigations/Navigation";

import HospitalsDropdown from "@/components/hospital/HospitalsDropdown.vue";

export default {
  name: 'AddMachineModal',
  components: {AlertDanger, Modal, HospitalsDropdown},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      hospitals:[],
      newMachine: {
        hospitalId: 0,
        machineName: '',
        machineSerial: '',
        machineDescription: '',
        machineStatus: ''
      }
    }
  },
  methods: {
    addNewMachine() {
      this.$emit('event-save-machine', this.newMachine)
      this.$emit('event-close-modal')
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