<template>
  <div>
    <table class="table table-dark table table-striped-columns mt-4">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Viaali aktiivsus enne (MBq)</th>
        <th scope="col">Viaali aktiivsus pärast (MBq)</th>
        <th scope="col">Süstitud kogus (mL)</th>
        <th scope="col">Jäägi kogus (mL)</th>
        <th v-if="isAdmin" scope="col">Muuda</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(machineFill, index) in machineFills" :key="machineFills.machineFillId">
        <td>{{ index + 1 }}</td>
        <td>{{machineFill.vialActivityBeforeInjection}}</td>
        <td>{{machineFill.vialActivityAfterInjection}}</td>
        <td>{{machineFill.injectedVolume}}</td>
        <td>{{machineFill.remainingVolume}}</td>
        <td v-if="isAdmin">
          <div class="icon-cell" @click="viewMachineFillEditView(machineFills.machineFillId)">
            <font-awesome-icon class="cursor-pointer" :icon="['fas', 'pen-to-square']"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "MachineFill",
  props: {
    machineFills: {
      type: Array
    },
  },
  data() {
    return {
      newCalculationProfileIsOpen: false,
      isAdmin: false,
      machineFill: [
        {
          machineFillId: 0,
          vialActivityBeforeInjection: 0,
          vialActivityAfterInjection: 0,
          injectedVolume: 0,
          remainingVolume: 0
        }
      ],
    }
  },
}
</script>


