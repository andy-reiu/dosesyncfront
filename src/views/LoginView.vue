<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-6">
        <AlertDanger :error-message="errorMessage"/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-6">
        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control">
          <small class="form-text text-muted"> Sisesta kasutajanimi</small>
        </div>
        <div class="mb-3">
          <label>Parool</label>
          <input v-model="password" type="password" class="form-control">
          <small class="form-text text-muted"> Sisesta parool or else</small>
        </div>
        <button @click="login" type="submit" class="btn btn-success">Logi sisse</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import ErrorCodes from "@/errors/ErrorCodes";
import Navigation from "@/navigations/Navigation";
import LoginService from "@/services/LoginService";
import {HttpStatusCode} from "axios";

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',

      errorResponse: {
        message: '',
        errorCode: 0
      },
      loginResponse: {
        userId: 0,
        roleName: ''
      }
    }
  },
  methods: {

    login() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
      }
    },

    allFieldsAreWithCorrectInput() {
      return this.username.length !== 0 && this.password.length !== 0
    },

    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginSuccessResponse(response))
          .catch(error => this.handleLoginErrorResponse(error))
    },

    handleLoginSuccessResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu')
      Navigation.navigateToHomeView()
    },

    handleLoginErrorResponse(error) {
      let httpStatusCode = error.response.status
      this.errorResponse = error.response.data
      this.handleIncorrectCredentials(httpStatusCode);
    },

    handleIncorrectCredentials(httpStatusCode) {
      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetErrorMessage, 4000)
      } else {
        Navigation.navigateToErrorView()
      }
    },

    isIncorrectCredentials(httpStatusCode) {
      return httpStatusCode === HttpStatusCode.Forbidden && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_CREDENTIALS;
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
  }
}
</script>