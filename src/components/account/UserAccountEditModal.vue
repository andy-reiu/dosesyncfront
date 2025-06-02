<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div class="d-flex flex-column align-items-center">
        <h5>Muuda kasutaja ja profiili infot</h5>
      </div>
    </template>

    <template #body>
      <form>
        <!-- Kasutaja Info -->
        <h6 class="mt-3">Kasutaja info</h6>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Kasutajanimi</label>
            <input type="text" class="form-control" v-model="userInfo.username"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Parool</label>
            <input type="password" class="form-control" v-model="userInfo.password"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Roll</label>
            <RoleDropdown
                :roles="roles"
                :selected-role-id="profileInfo.roleId"
                @event-new-role-selected="setUserRole"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Kinnita parool</label>
            <input
                type="password"
                class="form-control"
                v-model="confirmPassword"
            />
            <div v-if="confirmPassword && !passwordsMatch" class="text-danger mt-1" style="font-size: 0.9em;">
              Paroolid ei ühti!
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Staatus</label>
            <input type="text" class="form-control" v-model="userInfo.status"/>
          </div>
        </div>

        <!-- Separator -->
        <hr class="my-4"/>

        <!-- Profiili Info -->
        <h6>Profiili info</h6>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Eesnimi</label>
            <input type="text" class="form-control" v-model="profileInfo.firstName"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Perekonnanimi</label>
            <input type="text" class="form-control" v-model="profileInfo.lastName"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Isikukood</label>
            <input type="text" class="form-control" v-model="profileInfo.nationalId"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Amet</label>
            <input type="text" class="form-control" v-model="profileInfo.occupationName"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Haigla</label>
            <HospitalsDropdown
                :hospitals="hospitals"
                :selected-hospital-id="profileInfo.hospitalId"
                @event-new-hospital-selected="setHospitalName"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">E-post</label>
            <input type="email" class="form-control" v-model="profileInfo.email"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Telefoninumber</label>
            <input type="text" class="form-control" v-model="profileInfo.phoneNumber"/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Kasutaja loodud</label>
            <input type="text" class="form-control" v-model="profileInfo.createdAt" disabled/>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Kasutaja muudetud</label>
            <input type="text" class="form-control" v-model="profileInfo.updatedAt" disabled/>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <div class="d-flex justify-content-center">
        <button type="button" @click="executeUpdateUserEdit" class="btn btn-outline-success">
          Salvesta profiili info muudatused
        </button>
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Navigation from "@/navigations/Navigation";
import HospitalService from "@/services/HospitalService";
import HospitalsDropdown from "@/components/hospital/HospitalsDropdown.vue";
import RoleService from "@/services/RoleService";
import RoleDropdown from "@/components/role/RoleDropdown.vue";
import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";

export default {
  name: "UserAccountEditModal",
  components: {RoleDropdown, HospitalsDropdown, AlertDanger, Modal},
  props: {
    modalIsOpen: Boolean,
    selectedUserId: Number,
    userInfo: Object,
    profileInfo: Object
  },
  data() {
    return {
      hospitals: [],
      roles: [],
      confirmPassword: '',
    }
  },
  computed: {
    passwordsMatch() {
      return this.userInfo.password === this.confirmPassword;
    },
  },
  methods: {

    executeUpdateUserEdit() {
      const updateUser = UserService.sendPutUpdateUserRequest(this.selectedUserId, this.userInfo);
      const updateProfile = ProfileService.sendPutUpdateProfileRequest(this.selectedUserId, this.profileInfo);

      Promise.all([updateUser, updateProfile])
          .then(() => {
            this.$emit('event-update-users');
            this.$emit('event-close-modal');
          })
          .catch(() => {
            Navigation.navigateToErrorView();
          });
    },

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

    setHospitalName(hospitalId) {
      const hospital = this.hospitals.find(h => h.hospitalId === hospitalId);
      if (hospital) {
        this.profileInfo.hospitalName = hospital.hospitalName;
      }
    },

    setUserRole(roleId) {
      this.profileInfo.roleId = roleId
    },
  },

  beforeMount() {
    this.getAllHospitals()
    this.getAllRoles()
  }
}
</script>
