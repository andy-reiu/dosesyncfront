<template>
  <div>

    <!-- KASUTAJATE HALDUS  -->
    <div class="w-75 mx-auto mb-5">
      <h2 class="text-center mb-3">Kasutajad</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Kasutajanimi</th>
          <th scope="col">Staatus</th>
          <th scope="col">""""</th>

        </tr>
        </thead>
        <tbody>
        <!--        <tr>-->
        <!--          <th scope="row">1</th>-->
        <!--          <td>testkasutaja</td>-->
        <!--          <td>39104152516</td>-->
        <!--          <td>Otto</td>-->
        <!--          <td>Motto</td>-->
        <!--          <td>Planeerimine</td>-->
        <!--          <td>A</td>-->
        <!--          <td>-->

<!--                  <th scope="col">Isikukood</th>
          <th scope="col">Eesnimi</th>
          <th scope="col">Perekonnanimi</th>
          <th scope="col">Roll</th>-->



        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.status }}</td>

          <td>

            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"/>
            <!--@click="startEditUserAccount"-->
          </td>

        </tr>
        </tbody>
      </table>


      <!--    <div>-->
      <!--      <button type="button"-->
      <!--              class="btn btn-warning">Lisa kasutaja</button>-->


      <!-- + button -->
      <div class="d-flex justify-content-end mt-2">
        <font-awesome-icon
            icon="plus"
            class="fa-2x text-success"
            role="button"
            @click="startAddUser"/>
      </div>
      <!-- add user modal -->
      <AddUserModal
          :modal-is-open="showAddUser"
          @event-close-modal="closeAddUser"
          @event-save-isotope="createUser"
      />

    </div>
  </div>

</template>
<script>
import AddUserModal from "@/components/modal/AddUserModal.vue";
import UserService from "@/services/UserService";
import Navigation from "@/navigations/Navigation";

export default {
  name: 'UsersView',
  components: {AddUserModal},
  data() {
    return {
      showAddUser: false,

      userId: Number(sessionStorage.getItem(('userId'))),
      roleName: sessionStorage.getItem('roleName'),

      users: [
        {
          userId: 0,
          username: '',
          password: '',
          role: '',
          status: ''
        }
      ],

      profiles: [
        {
          profileId: 0,
          occupation: '',
          nationalId: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          createdAt: '',
          updatedAt: '',
          hospitalName: '',
        }
      ],

      errorResponse: {
        message: '',
        errorCode: ''
      }

    }
  },
  methods: {
    createUser(userData) {
      UserService.sendPostUserRequest(userData)
          //refresh list
          .then(() => this.getAllUsers())
          .catch(error => console.error(error))

    },


    startAddUser() {
      this.showAddUser = true
    },

    closeAddUser() {
      this.showAddUser = false
    },

    getAllUsers() {
      UserService.sendGetUserRequest()
          .then(response => this.users = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },
    //
    // getAllProfiles() {
    //   ProfileService.sindGetProfileRequest()
    //       .then(response => this.profiles =response.data())
    //       .catch(() => Navigation. navigateToErrorView())
    // }
  }

}

</script>