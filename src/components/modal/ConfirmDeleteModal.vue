<template>
  <Modal
      :modal-is-open="show"
      :hide-default-footer-action="true"
      @event-close-modal="$emit('cancel')"

  >

    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Kinnita kustutamine</h5>
      </div>
    </template>

    <template #body>
      <p>Oled sa kindel, et soovid kustutada <strong>{{ itemName }}</strong>?</p>
    </template>

    <template #footer>
      <button
          type="button"
          class="btn btn-success btn-secondary me-2"
          @click="$emit('cancel')"
      >
        Loobu
      </button>
      <button
          type="button"
          class="btn btn-danger"
          @click="$emit('confirm')"
      >
        Kustuta
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: 'ConfirmDeleteModal',
  components: { Modal },
  props: {

    show: {
      type: Boolean,
      required: true
    },

    itemName: {
      type: String,
      default: "see rida"
    }
  }
};
</script>