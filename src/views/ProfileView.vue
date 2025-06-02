<template>
  <div class="container mt-5">
    <div class="card mx-auto p-4" style="max-width: 600px;">
      <div class="d-flex justify-content-center mb-3">
        <img
            :src="imageData || defaultImage"
            class="rounded-circle border"
            width="100"
            height="100"
            alt="Profile"
        />
      </div>
      <div class="text-center mb-3" v-if="editMode">
        <label for="imageUpload" class="btn btn-sm btn-outline-primary">
          <i class="fa fa-camera me-2"></i>Muuda profiilipilti
        </label>
        <input
            id="imageUpload"
            type="file"
            class="d-none"
            @change="onImageSelected"
        />
      </div>
      <h4 class="text-center mb-3">{{ profiles.firstName }} {{ profiles.lastName }}</h4>
      <div class="mb-2"><strong>Ametikoht: </strong> {{ profiles.occupation }}</div>
      <div class="mb-2"><strong>Haigla: </strong> {{ profiles.hospitalName }}</div>
      <div class="mb-2"><strong>Isikukood: </strong> {{ profiles.nationalId }}</div>
      <hr />
      <div class="mb-3">
        <label>Email</label>
        <input
            type="email"
            class="form-control"
            v-model="profiles.email"
            :readonly="!editMode"
        />
      </div>
      <div class="mb-3">
        <label>Telefoninumber</label>
        <input
            type="text"
            class="form-control"
            v-model="profiles.phoneNumber"
            :readonly="!editMode"
        />
      </div>
      <div v-if="editMode && showPasswordUpdate" class="mb-3">
        <label>Vana parool</label>
        <input
            type="password"
            class="form-control"
            v-model="oldPassword"
            placeholder="Vana parool"
        />
        <label class="mt-3">Uus parool</label>
        <input
            type="password"
            class="form-control"
            v-model="newPassword"
            placeholder="Uus parool"
        />
        <input
            type="password"
            class="form-control mt-2"
            v-model="confirmPassword"
            placeholder="Kinnita uus parool"
        />
        <div v-if="passwordMismatch" class="text-danger mt-1">
          Paroolid ei ühti
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-secondary" @click="toggleEditMode">
          {{ editMode ? 'Katkesta' : 'Muuda' }}
        </button>
        <div class="d-flex gap-2">
          <button
              class="btn btn-outline-primary"
              v-if="editMode && !showPasswordUpdate"
              @click="showPasswordUpdate = true"
          >
            Uuenda parooli
          </button>
          <button
              class="btn btn-primary"
              v-if="editMode"
              @click="saveChanges"
              :disabled="showPasswordUpdate && (passwordMismatch || !oldPassword)"
          >
            Salvesta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileService from "@/services/ProfileService"
import Navigation from "@/navigations/Navigation"

export default {
  name: 'ProfileBox',
  data() {
    return {
      editMode: false,
      showPasswordUpdate: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      defaultImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      imageData: '',

      profiles: {
        profileId: '',
        firstName: '',
        lastName: '',
        occupation: '',
        hospitalName: '',
        nationalId: '',
        email: '',
        phoneNumber: '',
      }
    }
  },
  computed: {
    passwordMismatch() {
      return this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword
    }
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode
      if (!this.editMode) {
        this.resetPasswordFields()
      }
    },
    resetPasswordFields() {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.showPasswordUpdate = false
    },
    saveChanges() {
      let changedValues = {
        profileId: this.profiles.profileId,
        email: this.profiles.email,
        phoneNumber: this.profiles.phoneNumber,
        oldPassword: this.oldPassword || null,
        newPassword: this.newPassword || null,
        imageData: null
      }
      if (this.imageData && this.imageData !== this.defaultImage) {
        const commaSeperator = this.imageData.indexOf(',')
        changedValues.imageData = this.imageData.substring(commaSeperator + 1)
      }

      ProfileService.sendUpdateProfileRequest(changedValues)
          .then(() => {
            alert('Profiil edukalt uuendatud');
            this.toggleEditMode();
          })
          .catch((error) => {
            console.error('Uuendamise viga:', error);
            alert('Profiili uuendamine ebaõnnestus');
          })
    },
    onImageSelected(imageSelected) {
      const userImage = imageSelected.target.files[0]
      if (userImage) {
        const imageReader = new FileReader()
        imageReader.onload = e => {
          this.imageData = e.target.result
        }
        imageReader.readAsDataURL(userImage)
      }
    },
    getCurrentProfile() {
      const profileId = sessionStorage.getItem('profileId')
      if (!profileId) return
      ProfileService.sendGetCurrentProfileRequest()
          .then(response => {
            this.profiles = response.data

            if (response.data.imageData) {

              this.imageData = 'data:image/png;base64,' + response.data.imageData
            } else {
              this.imageData = this.defaultImage
            }
          })
          .catch(() => Navigation.navigateToErrorView())
    },
  },
  beforeMount() {
    this.getCurrentProfile()
  }
}
</script>
