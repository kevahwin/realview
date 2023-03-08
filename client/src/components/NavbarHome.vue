<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">RealView</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/HomeView" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/CanvasView" class="nav-link" active-class="active">Portfolio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/TeamView" class="nav-link" active-class="active">Team</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/FAQView" class="nav-link" active-class="active">FAQ</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarComponent',
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
    color: #0B3954 !important;
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
  
    /* Added styles */
    .navbar-toggler {
      border: none;
      outline: none;
    }
  
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
  
    .navbar-collapse {
      background-color: #E8EBF1;
      border-top: 1px solid #ddd;
    }
  
    .navbar-nav .nav-item {
      border-bottom: 1px solid #ddd;
      margin: 0;
      width: 100%;
      text-align: center;
    }
  }
  </style>
  