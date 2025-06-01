<template>
  <div class="login-page">
    <div class="overlay d-flex align-items-center justify-content-center">
      <div class="card login-card shadow-lg p-4">
        <h3 class="text-center mb-4 text-dark">Logi sisse</h3>

        <AlertDanger :error-message="errorMessage" />

        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control" placeholder="Sisesta kasutajanimi" />
        </div>

        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control" placeholder="Sisesta parool" />
        </div>

        <button @click="login" type="submit" class="btn btn-success w-100">Logi sisse</button>

        <div class="text-center mt-3">
          <small class="text-muted">Unustasid parooli? Võta ühendust administraatoriga.</small>
        </div>
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
        roleName: '',
        profileId: ''
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
      sessionStorage.setItem('profileId', this.loginResponse.profileId)
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