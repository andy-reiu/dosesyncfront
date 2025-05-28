<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="$emit('event-close-modal')"
    >
      <template #title>
        <div class="d-flex flex-column align-items-center">
          <h5>Lisa uus haigla</h5>
        </div>
      </template>
      <template #body>
        <form>
          <div class="mb-3">
            <div>
              <label class="form-label">Haigla nimi</label>
              <input
                  v-model="newHospital.hospitalName"
                  type="text"
                  class="form-control"
                  required
              />
            </div>
            <div>
              <label class="form-label">Aadress</label>
              <input
                  v-model="newHospital.hospitalAddress"
                  type="text"
                  class="form-control"
                  required
              />
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <button @click="addHospital" class="btn-success btn-outline-success">Salvesta uus haigla</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AddHospitalModal',
  components: {AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      newHospital: {
        hospitalName: '',
        hospitalAddress: '',
      }
    }
  },
  methods: {
    addHospital() {
      this.$emit('event-save-isotope', this.newHospital)
      this.$emit('event-close-modal')
    }
  }

}
</script>