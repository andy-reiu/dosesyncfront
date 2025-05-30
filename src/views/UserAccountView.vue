<template>




  <!--  KASUTAJA INFO source tables: user, role-->
  <!--  <div>-->

  <h2>Kasutja info</h2>

  <!--  näide pangast-->
  <!--          <LocationDetailsInput :atm-location="atmLocation"
                              @event-update-location-name="setAtmLocationLocationName"
                              @event-update-number-of-atms="setAtmLocationNumberOfAtms"
                              @event-update-transaction-type="updateTransactionTypeIsAvailable"
                              @event-new-image-selected="setAtmLocationImageData"


        <button @click="navigateToAtmsView" type="button" class="btn btn-outline-secondary me-4">Tagasi</button>
        <button v-if="isEdit" @click="updateAtmLocation" type="button" class="btn btn-outline-success">Salvesta</button>
        <button v-else @click="addAtmLocation" type="button" class="btn btn-outline-success">Lisa asukoht</button>
        />-->

  <!--        <UserDetailsInput :user="user"-->
  <!--                              @event-update-username="setUserUsername"-->
  <!--                              @event-update-password="setUserPassword"-->
  <!--                              @event-update-role="updateRole"-->
  <!--                              @event-update-user-status="updateUserStatus"-->
  <!--                              -->
  <!--                              -->
  <!--        <button @click="navigateToUsersView" type="button" class="btn btn-outline-secondary me-4">Tagasi</button>-->
  <!--        <button v-if="isEdit" @click="updateAtmLocation" type="button" class="btn btn-outline-success">Salvesta</button>-->
  <!--        <button v-else @click="addUser" type="button" class="btn btn-outline-success">Lisa kasutaja</button>-->
  <!--        />-->


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

      <div class="col">
      </div>
      <!--        <div class="col">-->
      <!--          <div class="row">KASUTAJA1</div>-->
      <!--          <div class="row">12345</div>-->
      <!--          <div class="row">Planeerimine</div>-->
      <!--          <div class="row">A</div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <div>
      <button type="button" class="btn btn-outline-success">Salvesta kasutaja info muudatused</button>
      <!--         @click="updateUserInfo" -->
    </div>

  </div>

  <!--  PROFIILI INFO source tables: profile, userImage, hospital-->

  <div>
    <h2>Profiili info</h2>

    <!--  näide pangast-->
    <!--          <LocationDetailsInput :atm-location="atmLocation"
                                @event-update-location-name="setAtmLocationLocationName"
                                @event-update-number-of-atms="setAtmLocationNumberOfAtms"
                                @event-update-transaction-type="updateTransactionTypeIsAvailable"
                                @event-new-image-selected="setAtmLocationImageData"


          <button @click="navigateToAtmsView" type="button" class="btn btn-outline-secondary me-4">Tagasi</button>
          <button v-if="isEdit" @click="updateAtmLocation" type="button" class="btn btn-outline-success">Salvesta</button>
          <button v-else @click="addAtmLocation" type="button" class="btn btn-outline-success">Lisa asukoht</button>
          />-->

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
          <!--         @click="updateProfileInfo" -->
        </div>

        <div class="col">


        </div>
      </div>
      <div class="col col-3">
        <!--        <UserImage :image-data="userProfile.userImage"/>  //kontollida üle, kus image asub-->
      </div>
    </div>
  </div>


</template>


<script>
import UserService from "@/services/UserService";
import ProfileService from "@/services/ProfileService";


export default {
  name: "UserAccountView",

  // components: {AlertSuccess, AlertDanger, UserImage, UserDetailsInput, RoleDropdown},
  // LOO USERSDETAILSINPUT!!!
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),

      userinfo: {
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


//   data() {
//     return {
//           userId: 0,
//           username: '',
//           password: '',
//           status: '',
//           roles: [
//             {
//               selectedRoleId: 0,
//               roleName:''
//             }
//           ]
//
//         }
//
//       // profile: [
//       //   {
//       //     profileId: 0,
//       //     occupation: '',
//       //     nationalId: '',
//       //     firstName: '',
//       //     lastName: '',
//       //     email: '',
//       //     phoneNumber: '',
//       //     createdAt: '',
//       //     updatedAt: '',
//       //
//       //   }
//       // ],
//
//       errorResponse: {
//         message: '',
//         errorCode: ''
//       }
//
//     },
//

  methods: {


    getUser() {
      UserService.sendGetUserRequest(this.userId)
          .then(response => this.handGetUserResponse(response))
          .catch(error => this.handleGetUserErrorResponse(error))
    },

    // navigateToUsersView() {
    //   Navigation.navigate
    //   this.navigateToUsersView()
    // },
    handGetUserResponse(response) {
      this.userinfo = response.data
    },
    //
    // handleGetUserErrorResponse(error) {
    //   this.someDataBlockErrorResponseObject = error.response.data
    // },

//Lsada: validateCorrectUserInput() vt pank LocationView r194


    getUserProfile() {
      ProfileService.sendGetUserProfileRequest(this.userId)
          .then(response => this.handleGetProfileResponse(response))
          .catch(error => this.handleGetProfileErrorResponse(error))
    },

    handleGetProfileResponse(response) {
      this.profileInfo = response.data
    }


  },
  beforeMount() {
    this.getUser()
    this.getUserProfile()
  }

}
</script>
