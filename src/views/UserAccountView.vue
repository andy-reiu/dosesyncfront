
<template>

<!--  KASUTAJA INFO source tables: user, role-->
<div>
  <h1>Kasutja info</h1>



  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="row">Kasutjanimi:</div>
        <div class="row">Parool: </div>
        <div class="row">Roll: </div>
        <div class="row">Staatus:</div>
      </div>
      <div class="col">
        <div class="row">KASUTAJA1</div>
        <div class="row">12345</div>
        <div class="row">Planeerimine</div>
        <div class="row">A</div>
      </div>
    </div>
  </div>

  <div>NUPP muuda kasutaja infot</div>

</div>

  <!--  PROFIILI INFO source tables: profile, userImage, hospital-->

<div>
<h1>Profiili info</h1>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="row">Eesnimi:</div>
        <div class="row">Perekonnanimi</div>
        <div class="row">E-post:</div>
        <div class="row">Telefoninumber:</div>
        <div class="row">Amet:</div>
        <div class="row">Haigla:</div>
        <div class="row">Kasutaja loodud (või profiil?):</div>
        <div class="row">Kasutaja muudetud (või profiil?):</div>
        <div class="row">""</div>
        <div class="row"> LisaPilt:/vali pilt/</div>
      </div>
      <div class="col">
        <div class="row">Eesnimi:</div>
        <div class="row">Perekonnanimi</div>
        <div class="row">E-post:</div>
        <div class="row">Telefoninumber:</div>
        <div class="row">Amet:</div>
        <div class="row">Haigla:</div>
        <div class="row">Kasutaja loodud (või profiil?):</div>
        <div class="row">Kasutaja muudetud (või profiil?):</div>

      </div>
    </div>
      <div class="col">
        PILDI KOHT
      </div>
    </div>
  </div>



</template>


<script>
import UserService from "@/services/UserService";
import Navigation from "@/navigations/Navigation";
import UserProfileService from "@/services/UserProfileService";

export default {
  name: "UserAccountView"

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
//   methods: {
// getUser() {
// UserService.sendGetUserRequest()
//     .then(response => this.user = response.data)
//     .catch(() => Navigation.navigateToErrorView())
// },
//
// // getProfile() {
// //   UserProfileService.
// //       .then(response => this.user = response.data)
// //       .catch(() => Navigation.navigateToErrorView())
//
//
// }
//
//
//   }


  //   getAllUsers() {
  //     UserService.sendGetUsersRequest()
  //         .then(response => this.users = response.data)
  //         .catch(() => Navigation.navigateToErrorView())
  //   },
  //
  //   getAllProfiles() {
  //     UserProfileService.sendGetUsersProfilesRequest()
  //         .then(response => this.profiles = response.data)
  //         .catch(() => Navigation.navigateToErrorView())
  //   }
  // // },
  //
  // beforeMount() {
  //   this.getUser()
   }


</script>
