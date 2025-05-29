<template>
  <div>

    <!-- KASUTAJATE HALDUS  -->
    <div class="w-75 mx-auto mb-5">
      <h2 class="text-center mb-3">Kasutaja kontod</h2>


      <!--NB! muuda esilehele kuvatava tabeli sisu nii, et see võtaks userist ja profiilist
      kokku valitud väljad : kasutajanimi, isikukood, ees ja perenimi, roll, staatus-->
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Kasutajanimi</th>
          <th scope="col">Parool</th>
          <th scope="col">Roll</th>
          <th scope="col">Staatus</th>
          <th scope="col">""""</th>

        </tr>
        </thead>
        <tbody>

        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.status }}</td>

          <td>

            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"
            />
            <!--                @click="navigateToUserAccountView(user.userId)"-->
          </td>

        </tr>
        </tbody>
      </table>


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


      <!-- PROFIILID  -->
      <div class="w-75 mx-auto mb-5">
        <h2 class="text-center mb-3">Profiilid</h2>
        <table class="table table-hover table-light table-striped-columns">
          <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amet</th>
            <th scope="col">Isikukood</th>
            <th scope="col">Eesnimi</th>
            <th scope="col">Perekonnanimi</th>
            <th scope="col">Email</th>
            <th scope="col">Telefon</th>
            <th scope="col">Loodud</th>
            <th scope="col">Muudetud</th>


          </tr>
          </thead>
          <tbody>

          <tr v-for="profile in profiles" :key="profile.profileId">
            <td>{{ profile.profileId }}</td>
            <td>{{ profile.occupation }}</td>
            <td>{{ profile.nationalId }}</td>
            <td>{{ profile.firstName }}</td>
            <td>{{ profile.lastName }}</td>
            <td>{{ profile.email }}</td>
            <td>{{ profile.phoneNumber }}</td>
            <td>{{ profile.createdAt }}</td>
            <td>{{ profile.updatedAt }}</td>



          </tr>
          </tbody>
        </table>


      </div>
    </div>
  </div>

</template>
<script>
import AddUserModal from "@/components/modal/AddUserModal.vue";
import UserService from "@/services/UserService";
import Navigation from "@/navigations/Navigation";
import UserProfileService from "@/services/UserProfileService";

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
      UserService.sendGetUsersRequest()
          .then(response => this.users = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    getAllProfiles() {
      UserProfileService.sendGetUsersProfilesRequest()
          .then(response => this.profiles = response.data)
          .catch(() => Navigation.navigateToErrorView())
    },

    // navigateToUserAccountView(userId) {
    //   Navigation.navigateToUserAccountView(userId)
    // },


    // //
    // getAllProfiles() {
    //   ProfileService.sindGetProfileRequest()
    //       .then(response => this.profiles =response.data())
    //       .catch(() => Navigation. navigateToErrorView())
    // }
  },

  beforeMount() {
    this.getAllUsers()
    this.getAllProfiles()
  }

}

</script>