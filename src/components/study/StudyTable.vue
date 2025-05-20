<template>
  <div>
    <div>
      <NewStudyModal :modal-is-open="newStudyModalIsOpen"
                     @event-close-modal="closeStudyModal"
                     @event-execute-new-study="newStudyModal"
      />
    </div>
    <table class="table table-dark table table-striped-columns mt-4">
      <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Isotope</th>
        <th scope="col">Patients</th>
        <th scope="col">Start Time</th>
        <th scope="col">End Time</th>
        <th scope="col">Total Activity (MBq)</th>
        <th scope="col">Rinse Volume (mL)</th>
        <th scope="col">Rinse Activity (MBq)</th>
        <th scope="col">Study comment</th>
        <th scope="col">Vaata</th>
        <th v-if="isAdmin" scope="col"> Muuda</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="study in studies" :key="study.studyId">
        <td>{{ study.studyDate }}</td>
        <td>{{ study.isotopeName }}</td>
        <td>{{ study.studyNrPatients }}</td>
        <td>{{ study.studyStartTime }}</td>
        <td>{{ study.studyEndTime }}</td>
        <td>{{ study.studyTotalActivity }}</td>
        <td>{{ study.calculationMachineRinseVolume }}</td>
        <td>{{ study.calculationMachineRinseActivity }}</td>
        <td>{{ study.studyComment }}</td>
        <td>
          <div class="icon-cell" @click="viewStudyDetailedView(study.studyId)">
            <font-awesome-icon class="cursor-pointer"
                               :icon="['fas', 'expand']"/>
          </div>
        </td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="viewStudyEditView(study.studyId)">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen-to-square']"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="text-end">
      <button type="submit" @click="addNewStudyView()" class="btn btn-primary">Lisa uus plaan</button>
    </div>
  </div>
</template>
<script>
import RoleService from "@/services/RoleService";
import NewStudyModal from "@/components/modal/NewStudyModal.vue";

export default {
  name: "StudyTable",
  components: {NewStudyModal},
  props: {
    studies: {
      type: Array
    }
  },
  data() {
    return {
      viewStudyModalIsOpen: false,
      newStudyModalIsOpen: false,
      editStudyModalIsOpen: false,
      isAdmin: false,
      study: [
        {
          studyId: 0,
          studyDate: '',
          studyNrPatients: 0,
          studyStartTime: '',
          studyEndTime: '',
          studyTotalActivity: 0,
          studyComment: '',
          studyStatus: '',
          calculationMachineRinseVolume: null,
          calculationMachineRinseActivity: null,
          isotopeName: '',
        }
      ],
    }
  },

  methods: {

    addNewStudyView(){
      this.newStudyModalIsOpen = true;
    },

    closeStudyModal(){
      this.newStudyModalIsOpen = false;
    },

    newStudyModal(){
      this.newStudyModalIsOpen = false;
    }
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

