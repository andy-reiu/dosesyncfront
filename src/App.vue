<template>
  <LogOutModal
      :modal-is-open="modalIsOpen"
      @event-close-modal="closeModal"
      @event-logout-confirmed="executeLogOut"
  />
  <div class="d-flex">
    <div class="sidebar p-3 vh-100 border-end d-flex flex-column">
      <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
        <!-- Show if logged in -->
        <template v-if="isLoggedIn">
          <router-link class="nav-link d-flex align-items-center gap-2" to="/profile-current" exact-active-class="active">
            <font-awesome-icon icon="user"/>
            Profiil
          </router-link>
        </template>
      </div>
        <template v-if="isLoggedIn">
          <router-link class="nav-link d-flex align-items-center gap-2" to="/home" exact-active-class="active">
            <font-awesome-icon icon="house"/>
            Kodu
          </router-link>
          <router-link class="nav-link d-flex align-items-center gap-2" to="/dose-calculation"
                       exact-active-class="active">
            <font-awesome-icon icon="calculator"/>
            Doosi kalkulaator
          </router-link>

          <router-link class="nav-link d-flex align-items-center gap-2" to="/all-studies" exact-active-class="active">
            <font-awesome-icon icon="file-alt"/>
            Kõik uuringud
          </router-link>
        </template>

        <!-- Show only if admin and logged in -->
        <template v-if="isAdmin && isLoggedIn">
          <router-link class="nav-link d-flex align-items-center gap-2"
                       to="/technic"
                       exact-active-class="active">
            <font-awesome-icon icon="cog"/>
            Tehniku vaade
          </router-link>


          <router-link class="nav-link d-flex align-items-center gap-2"
                       to="/users"
                       exact-active-class="active">
            <font-awesome-icon icon="users"/>
            Kasutajad
          </router-link>
        </template>

      <!-- Bottom logout -->
      <div v-if="isLoggedIn" class="mt-auto pt-3 border-top">
        <button class="nav-link d-flex align-items-center gap-2 text-start w-100" @click="startLogOutProcess">
          <font-awesome-icon icon="right-from-bracket"/>
          Logi välja
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4">
      <router-view @event-update-nav-menu="updateNavMenu"/>
    </div>
  </div>
</template>


<script>
import Navigation from "@/navigations/Navigation";
import RoleService from "@/services/RoleService";
import Modal from "@/components/modal/Modal.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";

export default {
  components: {LogOutModal, Modal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      modalIsOpen: false
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = RoleService.isLoggedIn()
      this.isAdmin = RoleService.isAdmin()
    },

    executeLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      this.closeModal()
      Navigation.navigateToLoginView()
    },

    startLogOutProcess() {
      this.modalIsOpen = true;
    },

    closeModal() {
      this.modalIsOpen = false;
    }
  },
  beforeMount() {
    this.updateNavMenu()
  }

}
</script>
