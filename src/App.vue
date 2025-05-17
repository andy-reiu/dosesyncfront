<template>
  <LogOutModal
      :modal-is-open="modalIsOpen"
      @event-close-modal="closeModal"
      @event-logout-confirmed="executeLogOut"
  />

  <div class="d-flex">
    <div class="sidebar bg-light p-3 vh-100 border-end">
      <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
        <router-link class="nav-link d-flex align-items-center gap-2" to="/" exact-active-class="active">
          <font-awesome-icon icon="house"/>
          Kodu
        </router-link>

        <router-link class="nav-link d-flex align-items-center gap-2" to="/" exact-active-class="active">
          <font-awesome-icon icon="building-columns"/>
          Kalkulatsioon
        </router-link>

        <router-link class="nav-link d-flex align-items-center gap-2" to="/" exact-active-class="active">
          <font-awesome-icon icon="chart-line"/>
          Statistika
        </router-link>

        <router-link class="nav-link d-flex align-items-center gap-2" to="/settings" exact-active-class="active">
          <font-awesome-icon icon="gear"/>
          Technical
        </router-link>

        <template v-if="!isAdmin">
          <router-link class="nav-link d-flex align-items-center gap-2" to="/login" exact-active-class="active">
            <font-awesome-icon icon="right-to-bracket"/>
            Login
          </router-link>
        </template>

        <template v-else>
          <template v-if="isAdmin">
            <router-link class="nav-link d-flex align-items-center gap-2" to="/" exact-active-class="active">
              <font-awesome-icon icon="map-marker-alt"/>
              Kontod
            </router-link>
          </template>

          <button class="nav-link d-flex align-items-center gap-2 text-start">
            <font-awesome-icon icon="right-from-bracket"/>
            Sätted
          </button>
        </template>
      </div>

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
      Navigation.navigateToHomeView()
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
