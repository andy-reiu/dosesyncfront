<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="handleCloseModal"
    >
      <template #title>
        <div class="mb-4">
          <h5>Lisa uus haigla</h5>
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
              <label class="form-label">Haigla</label>
              <input
                  v-model="newHospital.hospitalName"
                  type="text"
                  class="form-control w-50 mx-auto bg-light"
                  required
              />
            </div>
            <div>
              <label class="form-label">Aadress</label>
              <input
                  v-model="newHospital.hospitalAddress"
                  type="text"
                  class="form-control w-50 mx-auto bg-light"
                  required
              />
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <button @click="addNewHospital" type="button" class="btn btn-success">Salvesta</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertAllFields from "@/components/alert/AlertAllFields.vue";

export default {
  name: 'AddHospitalModal',
  components: {AlertAllFields, Modal},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      newHospital: {
        hospitalName: '',
        hospitalAddress: '',
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
      this.newHospital = {
        hospitalName: '',
        hospitalAddress: ''
      }
    },

    addNewHospital() {
      if (this.allFieldsWithCorrectInput()) {
        this.$emit('event-save-isotope', this.newHospital)
        this.resetModalDataFields();
        this.$emit('event-close-modal')
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(() => this.errorMessage = '', 4000)
      }

    },

    allFieldsWithCorrectInput() {
      const hosp = this.newHospital
      return (
          hosp.hospitalName !== '' &&
          hosp.hospitalAddress
      )
    },



  }


}
</script>