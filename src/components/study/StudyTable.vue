<template>
  <div class="">
    <h2 class="text-center mb-3">Uuringud</h2>
    <table class="table table-hover table-light table-striped-columns">
      <thead class="table-dark">
      <tr>
        <th>Kuupäev</th>
        <th>Isotoop</th>
        <th>Patsientide arv</th>
        <th>Uuringute alguse aeg</th>
        <th>Uuringute lõpu aeg</th>
        <th>Kalibratsiooni aktiivsus (MBq)</th>
        <th>Loputusmahl (mL)</th>
        <th>Jääk aktiivsus (MBq)</th>
        <th>Uuringu kommentaar</th>
        <th></th>
        <th v-if="isAdmin"></th>
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
          <font-awesome-icon class="text-primary" :icon="['fas', 'expand']" role="button"
                             @click="viewStudyDetails(study.studyId)"
          />
        </td>
        <td v-if="isAdmin">
          <div class="d-flex align-items-center">
            <font-awesome-icon icon="pen-to-square" class="text-warning me-2" role="button"
                               @click="editSelectedStudy(study.studyId, study.isotopeId)"
            />
            <font-awesome-icon icon="trash" class="text-danger" role="button"
                               @click="editSelectedStudy(study.studyId, study.isotopeId)"
            />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import RoleService from "@/services/RoleService";
import NewStudyModal from "@/components/modal/NewStudyModal.vue";
import Navigation from "@/navigations/Navigation";

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
          isotopeId: 0,
          isotopeName: '',
        }
      ],
    }
  },

  methods: {
    editSelectedStudy(studyId, isotopeId) {
      Navigation.navigateToStudyView(studyId, isotopeId)
    }
  },

  beforeMount() {
    this.isAdmin = RoleService.isAdmin()
  }
}
</script>

