<template>
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
        <!-- Kasutaja info -->
        <h6 class="mt-3">Kasutaja info</h6>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Lisa kasutajanimi</label>
            <input
                v-model="newUser.username"
                type="text"
                class="form-control"
                required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Lisa parool</label>
            <input
                v-model="newUser.password"
                type="password"
                class="form-control"
                required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Vali roll</label>
            <RoleDropdown
                :roles="roles"
                @event-new-role-selected="setUserRole"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Kinnita parool</label>
            <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                required
            />
            <div v-if="confirmPassword && !passwordsMatch" class="text-danger mt-1" style="font-size: 0.9em;">
              Paroolid ei ühti!
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Staatus</label>
            <input
                v-model="newUser.status"
                type="text"
                class="form-control"
                required
            />
          </div>
        </div>

        <hr class="my-4" />

        <!-- Profiili info -->
        <h6>Profiili info</h6>
        <div class="row">
          <!-- your existing profiili inputs in two columns -->
          <div class="col-md-6 mb-3">
            <label class="form-label">Eesnimi</label>
            <input type="text" class="form-control" v-model="newUser.firstName" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Perekonnanimi</label>
            <input type="text" class="form-control" v-model="newUser.lastName" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Isikukood</label>
            <input type="text" class="form-control" v-model="newUser.nationalId" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Amet</label>
            <input type="text" class="form-control" v-model="newUser.occupationName" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Haigla</label>
            <HospitalsDropdown
                :selected-hospital-id="newUser.hospitalId"
                :hospitals="hospitals"
                @event-selected-hospital="newUser.hospitalId = $event"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">E-post</label>
            <input type="email" class="form-control" v-model="newUser.email" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Telefoninumber</label>
            <input type="text" class="form-control" v-model="newUser.phoneNumber" />
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <button @click="addUser" class="btn btn-outline-success">
        Salvesta kasutaja
      </button>
    </template>
  </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import HospitalsDropdown from "@/components/hospital/HospitalsDropdown.vue";
import RoleDropdown from "@/components/role/RoleDropdown.vue";
import HospitalService from "@/services/HospitalService";
import Navigation from "@/navigations/Navigation";
import RoleService from "@/services/RoleService";

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
        status: '',
        firstName: '',
        lastName: '',
        nationalId: '',
        occupationName: '',
        hospitalId: null,
        email: '',
        phoneNumber: '',
      },
      confirmPassword: '',
      hospitals:[],
      roles: []
    }
  },
  computed: {
    passwordsMatch() {
      return this.newUser.password === this.confirmPassword;
    }
  },
  methods: {

    getAllHospitals() {
      HospitalService.sendGetHospitalRequest()
          .then(response => this.hospitals = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    getAllRoles() {
      RoleService.sendGetRolesRequest()
          .then(response => this.roles = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    addUser() {
      this.$emit('event-save-user', this.newUser)
      this.$emit('event-close-modal')
    }
  },

  beforeMount() {
    this.getAllHospitals()
    this.getAllRoles()
  }
}
</script>


