<!--<template>-->


<!--&lt;!&ndash;SEE ON HETKEL POOLIK&ndash;&gt;-->
<!--  <table class="table table-hover table-light table-striped-columns">-->
<!--    <thead class="table-dark">-->
<!--    <tr>-->
<!--      <th scope="col">#</th>-->
<!--      <th scope="col">Kasutajanimi</th>-->
<!--      <th scope="col">Parool</th>-->
<!--      <th scope="col">Roll</th>-->
<!--      <th scope="col">Staatus</th>-->
<!--      <th scope="col">""""</th>-->

<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody>-->

<!--    <tr v-for="user in users" :key="user.userId">-->
<!--      <td>{{ user.userId }}</td>-->
<!--      <td>{{ user.username }}</td>-->
<!--      <td>{{ user.password }}</td>-->
<!--      <td>{{ user.role }}</td>-->
<!--      <td>{{ user.status }}</td>-->

<!--      <td>-->

<!--        <font-awesome-icon-->
<!--            icon="pen-to-square"-->
<!--            class="text-warning me-2"-->
<!--            role="button"/>-->
<!--        &lt;!&ndash;@click="startEditUserAccount"&ndash;&gt;-->
<!--      </td>-->

<!--    </tr>-->
<!--    </tbody>-->
<!--  </table>-->

<!--</template>-->


<script>
export default {
name: "UsersTable"
<!--  props: {-->
<!--    userAccounts: {-->
<!--      type:Array-->
<!--    }-->
<!--  },-->

<!--  data() {-->
<!--    return{-->
<!--      users: [-->
<!--        {-->
<!--          userId: 0,-->
<!--          username: '',-->
<!--          password: '',-->
<!--          role: '',-->
<!--          status: ''-->
<!--        }-->
<!--      ],-->
<!--    }-->
<!--  },-->

<!--methods: {-->
<!--//   createUser(userData) {-->
<!--//     UserService.sendPostUserRequest(userData)-->
<!--//         //refresh list-->
<!--//         .then(() => this.getAllUsers())-->
<!--//         .catch(error => console.error(error))-->
<!--//-->
<!--//   },-->
<!--//-->
<!--//   getAllUsers() {-->
<!--//     UserService.sendGetUserRequest()-->
<!--//         .then(response => this.users = response.data)-->
<!--//         .catch(() => Navigation.navigateToErrorView())-->
<!--//   },-->
<!--//   //-->
<!--//   // getAllProfiles() {-->
<!--//   //   ProfileService.sindGetProfileRequest()-->
<!--//   //       .then(response => this.profiles =response.data())-->
<!--//   //       .catch(() => Navigation. navigateToErrorView())-->
<!--//   // }-->
<!--//-->
<!--// },-->
<!--//-->
<!--// beforeMount() {-->
<!--//   this.getAllUsers()-->
<!--// }-->
<!--//-->


<!--}-->
</script>
