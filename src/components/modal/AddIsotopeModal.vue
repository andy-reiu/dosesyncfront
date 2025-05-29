<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="handleCloseModal"
    >
      <template #title>
        <div class="d-flex flex-column align-items-center">
          <h5>Lisa uus isotoop</h5>
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
              <label class="form-label">Isotoobi nimetus</label>
              <input
                  v-model="newIsotope.isotopeName"
                  type="text"
                  class="form-control w-50 mx-auto bg-light"
                  required
              />
            </div>
            <div>
              <label class="form-label">Half-life(hr)</label>
              <input
                  v-model="newIsotope.halfLifeHr"
                  type="number"
                  class="form-control w-50 mx-auto bg-light"
                  required
              />
            </div>
            <div>
              <label class="form-label">Unit</label>
              <input
                  v-model="newIsotope.unit"
                  type="text"
                  class="form-control w-50 mx-auto bg-light"
                  required
              />
            </div>
            <div>
              <label class="form-label">Staatus</label>
              <select
                  v-model="newIsotope.isotopeStatus"
                  class="form-select w-50 mx-auto bg-light text-center"
                  required
              >
                <option disabled value="" class="text-secondary">Vali staatus</option>
                <option value="A">Aktiivne</option>
                <option value="D">Mitteaktiivne</option>
              </select>
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <button @click="addNewIsotope" class="btn btn-success">Salvesta</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertAllFields from "@/components/alert/AlertAllFields.vue";

export default {
  name: 'AddIsotopeModal',
  components: {AlertAllFields, Modal},
  props: {
    modalIsOpen: Boolean
  },
  data() {
    return {
      newIsotope: {
        isotopeName: '',
        halfLifeHr: null,
        unit: '',
        isotopeStatus: ''
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
      this.newIsotope = {
        isotopeName: null,
        halfLifeHr: null,
        unit: null,
        isotopeStatus: null
      }
      this.errorMessage = ''
    },

    addNewIsotope() {
      if (this.allFieldsWithCorrectInput()) {
        this.$emit('event-save-isotope', this.newIsotope)
        this.resetModalDataFields()
        this.$emit('event-close-modal')
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(() => this.errorMessage = '', 4000)
      }

    },

    allFieldsWithCorrectInput() {
      const iso = this.newIsotope
      return (
          iso.isotopeName !== '' &&
          iso.halfLifeHr !== null &&
          iso.unit !== '' &&
          iso.isotopeStatus !== ''
      )
    }
  }
}
</script>