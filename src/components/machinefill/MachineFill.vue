<template>
  <div>
    <table class="table table-hover table-light table-striped-columns">
      <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Viaali aktiivsus enne (MBq)</th>
        <th>Viaali aktiivsus pärast (MBq)</th>
        <th>Süstitud kogus (mL)</th>
        <th>Jäägi kogus (mL)</th>
        <th v-if="isAdmin"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(machineFill, index) in machineFills" :key="machineFill.machineFillId">
        <td>{{ index + 1 }}</td>
        <td>{{ machineFill.vialActivityBeforeInjection }}</td>
        <td>{{ machineFill.vialActivityAfterInjection }}</td>
        <td>{{ machineFill.injectedVolume }}</td>
        <td>{{ machineFill.remainingVolume }}</td>
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


