<template>
  <div class="container mt-5">
    <div class="card mx-auto p-4" style="max-width: 600px;">
      <!-- Profile Picture -->
      <div class="d-flex justify-content-center mb-3">
        <img
            :src="imageData || defaultImage"
            class="rounded-circle border"
            width="100"
            height="100"
            alt="Profile"
        />
      </div>
      <div class="text-center mb-3">
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

      <!-- Name -->
      <h4 class="text-center mb-3">{{ profiles.firstName }} {{ profiles.lastName }}</h4>

      <!-- Info -->
      <div class="mb-2"><strong>Ametikoht: </strong> {{ profiles.occupation }}</div>
      <div class="mb-2"><strong>Haigla: </strong> {{ profiles.hospitalName }}</div>
      <div class="mb-2"><strong>Isikukood: </strong> {{ profiles.nationalId }}</div>

      <hr />

      <!-- Editable Info -->
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

      <!-- Password Update Section -->
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

      <!-- Action Buttons -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-secondary" @click="toggleEditMode">
          {{ editMode ? 'Cancel' : 'Edit' }}
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
import ProfileService from "@/services/ProfileService";
import Navigation from "@/navigations/Navigation";
import response from "html2pdf.js";

export default {
  name: 'ProfileBox',
  data() {
    return {
      editMode: false,
      showPasswordUpdate: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      imageData: '',
      defaultImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
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
      this.showPasswordUpdate = false;
    },
    saveChanges() {
      const changedValues = {
        profileId: this.profiles.profileId,
        email: this.profiles.email,
        phoneNumber: this.profiles.phoneNumber,
        oldPassword: this.oldPassword || null,
        newPassword: this.newPassword || null,
        imageData: this.imageData !== this.defaultImage ? this.imageData : null
      };

      ProfileService.sendUpdateProfileRequest(changedValues)
          .then(() => {
            alert('Profiil edukalt uuendatud');
            this.toggleEditMode();
          })
          .catch((error) => {
            console.error('Update error:', error);
            alert('Profiili uuendamine ebaõnnestus');
          });
    },
    onImageSelected(imageSelected) {
      const userImage = imageSelected.target.files[0]
      if (userImage) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imageData = e.target.result
        };
        reader.readAsDataURL(userImage)
      }
    },
    getCurrentProfile() {
      const profileId = sessionStorage.getItem('profileId')
      if (!profileId) return
      ProfileService.sendGetCurrentProfileRequest()
          .then(response => {
            this.profiles = response.data
            this.imageData = response.data.imageData || this.defaultImage
          })
          .catch(() => Navigation.navigateToErrorView())

    },
  },
  beforeMount() {
    this.getCurrentProfile()
  }
}
</script>
