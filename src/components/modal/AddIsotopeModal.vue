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
            <label class="form-label">Isotoobi nimetus</label>
            <input
                v-model="newIsotope.isotopeName"
                type="text"
                class="form-control"
                required

            />
          </div>

          <div class="mb-3">
            <label class="form-label">Half-life(hr)</label>
            <input
                v-model="newIsotope.halfLifeHr"
                type="number"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Unit</label>
            <input
                v-model="newIsotope.unit"
                type="text"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">

            <label class="form-label">Staatus</label>
            <input
                v-model="newIsotope.isotopeStatus"
                type="text"
                class="form-control"
                required

            />

          </div>

        </form>
      </template>

      <template #footer>
        <button @click="addIsotope" class="btn-success btn-outline-success">Salvesta isotoop</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AddIsotopeModal',
  components: {AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      newIsotope: {
        isotopeName: '',
        halfLifeHr: 0,
        unit: '',
        isotopeStatus: ''
      }
    }
  },
  methods: {
    addIsotope() {
      // emit new isotope data
      this.$emit('event-save-isotope', this.newIsotope)
      this.$emit('event-close-modal')
    }
  }

}
</script>