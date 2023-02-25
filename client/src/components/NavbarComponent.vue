<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">RealView</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Portfolio</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/TeamView" class="nav-link" active-class="active">Team</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/LoginView" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SimpleNavbar',
}
</script>

<style>
.navbar {
  background-color: #E8EBF1;
  padding: 1rem;
}

.navbar-brand {
  color: #0B3954;
  font-weight: bold;
  margin-right: 2rem;
}

.nav-link {
  color: #0B3954;
  margin: 0 1rem;
}

.active {
  color: #fff;
  background-color: #0B3954 !important;
  border-color: #0B3954 !important;
}

@media (max-width: 767px) {
  .navbar-nav {
    margin-top: 1rem;
  }

  .navbar-brand {
    margin-right: 0;
  }

  .nav-link {
    margin: 0.5rem 0;
  }
}
</style>
