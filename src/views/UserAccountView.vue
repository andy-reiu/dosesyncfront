<template>
  <div>
    <h2>Kasutja info</h2>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <div class="row">Kasutjanimi:</div>
          <div class="row">Parool:</div>
          <div class="row">Roll:</div>
          <div class="row">Staatus:</div>
        </div>
        <div class="col">
          <div class="row"> {{ userinfo.username }}</div>
          <div class="row"> {{ userinfo.password }}</div>
          <div class="row"> {{ userinfo.roleName }}</div>
          <div class="row"> {{ userinfo.status }}</div>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-outline-success">Salvesta kasutaja info muudatused</button>
      </div>
    </div>
    <div>
      <h2>Profiili info</h2>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="row">Eesnimi:</div>
            <div class="row">Perekonnanimi:</div>
            <div class="row">Isikukood:</div>
            <div class="row">Amet:</div>
            <div class="row">Haigla:</div>
            <div class="row">E-post:</div>
            <div class="row">Telefoninumber:</div>
            <div class="row">Kasutaja loodud:</div>
            <div class="row">Kasutaja muudetud:</div>
            <div class="row">""</div>
            <div class="row"> LisaPilt:/vali pilt/KASTIKE LUUA</div>
          </div>
          <div class="col">
            <div class="row"> {{ profileInfo.firstName }}</div>
            <div class="row"> {{ profileInfo.lastName }}</div>
            <div class="row"> {{ profileInfo.nationalId }}</div>
            <div class="row"> {{ profileInfo.nationalId }}</div>
            <div class="row"> {{ profileInfo.hospitalName }}</div>
            <div class="row"> {{ profileInfo.email }}</div>
            <div class="row"> {{ profileInfo.phoneNumber }}</div>
            <div class="row"> {{ profileInfo.createdAt }}</div>
            <div class="row"> {{ profileInfo.updatedAt }}</div>
            <div class="row">""</div>
            <div class="row"> LisaPilt:/vali pilt/KASTIKE LUUA</div>
          </div>
          <div class="col">
            SIIA TULEB PILT
          </div>
          <div>
            <button type="button" class="btn btn-outline-success">Salvesta profiili info muudatused</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import ProfileService from "@/services/ProfileService";
import Navigation from "@/navigations/Navigation";

export default {
  name: "UserAccountView",
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      userInfo: {
        userId: 0,
        roleId: 0,
        roleName: '',
        username: '',
        password: '',
        status: ''
      },
      profileInfo: {
        profileId: 0,
        hospitalName: '',
        occupation: '',
        nationalId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        createdAt: '',
        updatedAt: ''
      },
    }
  },

  methods: {
    getUser() {
      UserService.sendGetUserRequest(this.userId)
          .then(response => this.userInfo = response.data)
          .catch(error => Navigation.navigateToErrorView(error))
    },

    getUserProfile() {
      ProfileService.sendGetUserProfileRequest(this.userId)
          .then(response => this.profileInfo = response.data)
          .catch(error => Navigation.navigateToErrorView(error))
    },
  },

  beforeMount() {
    this.getUser()
    this.getUserProfile()
  }

}
</script>
