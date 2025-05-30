<template>
  <div>

    <div class="w-75 mx-auto mb-5">
      <h2 class="text-center mb-3">Kasutajad</h2>
      <table class="table table-hover table-light table-striped-columns">
        <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Kasutajanimi</th>
          <th scope="col">Roll</th>
          <th scope="col">Eesnimi</th>
          <th scope="col">Perekonnanimi</th>
          <th scope="col">Isikukood</th>
          <th scope="col">Staatus</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in sortedUsers" :key="user.userId" :class="{ 'table-danger': user.userStatus === 'D' }">
          <td>{{ user.userId }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.roleName }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.nationalId }}</td>
          <td>
            <select
                v-model="user.userStatus"
                @change="updateUserStatus(user)"
                class="form-select form-select-sm"
            >
              <option value="A">Active</option>
              <option value="D">Deactive</option>
            </select>
          </td>
          <td>
            <font-awesome-icon
                icon="pen-to-square"
                class="text-warning me-2"
                role="button"
                @click="navigateToUserAccountView(user.userId)"
            />
            <!--@click="startEditUserAccount"-->
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

      users: [{
        userId: null,
        username: '',
        userStatus: '',
        roleId: null,
        roleName: '',
        profileId: null,
        firstName: '',
        lastName: '',
        nationalId: '',
      }],
      errorResponse: {
        message: '',
        errorCode:
            ''
      }
    }
  },
  methods: {


    updateUserStatus(user) {
      UserService.sendUpdateUserStatusRequest(user.userId, user.userStatus)
          .then(() => this.getAllUsers())
          .catch(error => console.error(error))
    },

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

    navigateToUserAccountView(userId) {
      Navigation.navigateToUserAccountView(userId)
    },

  },

  computed: {

    sortedUsers() {
      return [...this.users].sort((a, b) => {
        if (a.userStatus !== b.userStatus) {
          return a.userStatus === 'A' ? -1 : 1
        }
        return a.userId - b.userId
      })
    },
  },

  beforeMount() {
    this.getAllUsers()
  }

}

</script>