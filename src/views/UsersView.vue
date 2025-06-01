<template>
  <div class="background-wrapper">
    <div class="overlay-box">
      <div>
        <AddUserModal
            :modal-is-open="showAddUser"
            @event-close-modal="closeAddUser"
            @event-save-isotope="createUser"
        />
        <UserAccountEditModal
            v-if="viewEditModalIsOpen && userInfo && profileInfo"
            :modal-is-open="viewEditModalIsOpen"
            :user-info="userInfo"
            :profile-info="profileInfo"
            :selected-user-id="selectedUserid"
            @event-update-users="getAllUsers"
            @event-close-modal="viewEditModalIsOpen = false"
        />
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
                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-outline-warning btn-sm" title="Muuda kasutajakontot"
                          @click="navigateToUserAccountView(user.userId)">
                    <font-awesome-icon icon="pen-to-square"/>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

          <!-- + button -->
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-outline-success btn-sm" title="Lisa kasutaja"
                    @click="startAddUser">
              <font-awesome-icon icon="plus"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddUserModal from "@/components/modal/AddUserModal.vue";
import UserService from "@/services/UserService";
import Navigation from "@/navigations/Navigation";
import UserAccountEditModal from "@/components/account/UserAccountEditModal.vue";
import ProfileService from "@/services/ProfileService";
import UserProfileService from "@/services/UserProfileService";

export default {
  name: 'UsersView',
  components: {UserAccountEditModal, AddUserModal},
  data() {
    return {
      showAddUser: false,
      viewEditModalIsOpen: false,

      userId: Number(sessionStorage.getItem(('userId'))),
      roleName: sessionStorage.getItem('roleName'),

      selectedUserid: 0,
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
      },

      userInfo: [],
      profileInfo: [],
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

    executeGetUserInfo(selectedUserId) {
      UserService.sendGetUserInfoRequest(selectedUserId)
          .then(response => this.userInfo = response.data)
    },

    executeGetProfileInfo(selectedUserId) {
      ProfileService.sendGetUserProfileRequest(selectedUserId)
          .then(response => this.profileInfo = response.data)
    },

    navigateToUserAccountView(selectedUserId) {
      Promise.all([this.executeGetUserInfo(selectedUserId), this.executeGetProfileInfo(selectedUserId)])
          .then(() => {
            this.selectedUserid = selectedUserId
            this.viewEditModalIsOpen = true
          })
          .catch(error => Navigation.navigateToErrorView(error))
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