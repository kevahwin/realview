
<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <a class="navbar-brand" href="#">RealView</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Portfolio</a>
      </li>
      <div class="flex-grow"></div> <!-- Spacer element -->
      </ul>
      <div>
        <button class="btn btn-outline-success my-2 my-sm-0" style="color: #AE98BD; border-color: #AE98BD;">Login</button>
      </div>
  </div>
</nav>
</template>

<style>
.btn-outline-success {
  background-color: #AE98BD;
  color: #AE98BD;
  border-color: #AE98BD;
}

.btn-outline-success:hover {
  background-color: #efdefa !important;
  color: #fff;
  border-color: #AE98BD;
}
</style>