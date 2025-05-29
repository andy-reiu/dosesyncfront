<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="text-center">
        <h5 class="modal-title">Logi välja?</h5>
      </div>
    </template>

    <template #body>
      <div class="logout-card-content text-center">
        <img
            class="img-fluid mb-3 logout-image"
            src="https://cdn.pixabay.com/photo/2017/05/29/23/02/logging-out-2355227_1280.png"
            alt="Log out illustration"
        />
        <p>Kas oled kindel, et soovid välja logida?</p>
      </div>
    </template>

    <template #footer>
      <div class="d-flex justify-content-center">
        <button @click="$emit('event-logout-confirmed')" class="btn btn-success me-2">Jah</button>
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'LogOutModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  }
}
</script>