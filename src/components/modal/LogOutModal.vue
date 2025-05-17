<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
    <template #title>
      <span>Logi välja?</span>
    </template>
    <template #body>
      <img class="img-thumbnail" width="200"
           src="https://e7.pngegg.com/pngimages/985/942/png-clipart-computer-icons-encapsulated-postscript-logout-symbol-angle-text-thumbnail.png"
           alt="gif nooleke välja">
    </template>
    <template #footer>
      <button @click="$emit('event-logout-confirmed')" class="btn btn-success">Jah</button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "LogOutModal",
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  }
}
</script>