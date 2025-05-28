
<template>

<!--  KASUTAJA INFO source tables: user, role-->
<div>
  <h1>Kasutja info</h1>



  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="row">Kasutjanimi:</div>
        <div class="row">Parool:</div>
        <div class="row">Roll:</div>
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
      <div class="col">
        PILDI KOHT
      </div>
    </div>
  </div>


</div>



</template>


<script>
export default {
  name: "UserAccountView"


//   olemasoleva kasutaja accoundi info vaatamine muutmine käib siitkaudu
// get ja update meetodid luua siia?


}
</script>
