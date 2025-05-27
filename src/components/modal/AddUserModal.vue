<template>
  <div>
    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="$emit('event-close-modal')"
    >
      <template #title>
        <div class="d-flex flex-column align-items-center">
          <h5>Lisa uus kasutaja</h5>
        </div>
      </template>

      <template #body>
        <form>

          <div class="mb-3">
            <label class="form-label">Lisa kasutajanimi</label>
            <input
                v-model="newUser.username"
                type="text"
                class="form-control"
                required

            />
          </div>

          <div class="mb-3">
            <label class="form-label">Lisa parool</label>
            <input
                v-model="newUser.password"
                type="text"
                class="form-control"
                required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Vali roll</label>
            <RoleDropdown
                :roles="roles"
                :selected-role-id="newUser.role"
                @event-new-user-selected="newUser.role = $event"
            />


          </div>

          <div class="mb-3">

            <label class="form-label">Staatus</label>
            <input
                v-model="newUser.userStatus"
                type="text"
                class="form-control"
                required

            />

          </div>

        </form>
      </template>

      <template #footer>
        <button @click="addUser" class="btn-success btn-outline-success">Salvesta kasutaja</button>
      </template>
    </Modal>
  </div>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import HospitalsDropdown from "@/components/hospital/HospitalsDropdown.vue";
import RoleDropdown from "@/components/role/RoleDropdown.vue";

export default {
  name: "AddUserModal",
  components: {RoleDropdown, HospitalsDropdown, Modal},
  props: {
    modalIsOpen: Boolean
  },

  data() {
    return {
      newUser: {
        username: '',
        password: '',
        role: '',
        status: ''
      }
    }
  },

  methods: {
    addUser() {
      //emit new user data
      this.$emit('event-save-user', this.newUser)
      this.$emit('event-close-modal')
    }
  }
}
</script>


