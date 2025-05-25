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
            <label class="form-label">Haigla</label>
            <select
                v-model.number="newMachine.hospitalId"
                class="form-control"
                required
            >
              <option disabled value="">Please select one</option>
              <option
                  v-for="h in hospitals"
                  :key="h.hospitalId"
                  :value="h.hospitalId"
              >
                {{ h.hospitalName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Masina nimetus</label>
            <input v-model="newMachine.machineName"
                   type="text"
                   class="form-control"
                   required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Masina seerialnumber</label>
            <input v-model="newMachine.machineSerial"
                   type="text"
                   class="form-control"
                   required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Masina kirjeldus</label>
            <input v-model="newMachine.machineDescription"
                   type="text"
                   class="form-control"
                   required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Masina staatus</label>
            <input v-model="newMachine.machineStatus"
                   type="text"
                   class="form-control"
                   required
            />
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

export default {
  name: 'AddMachineModal',
  components: {AlertDanger, Modal},
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